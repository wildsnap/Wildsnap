import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// --- Custom Metrics ---
const http500Rate    = new Rate('http_500_errors');
const endpointLatency = new Trend('endpoint_latency', true);

// FIX 2: HTTP status breakdown counters
const count200 = new Counter('http_status_200');
const count400 = new Counter('http_status_400');
const count500 = new Counter('http_status_500');

const ITEM_IDS = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

export const options = {
  // FIX 1: capture p(50), p(90), p(95), p(99) in the summary JSON
  summaryTrendStats: ['p(50)', 'p(90)', 'p(95)', 'p(99)', 'avg', 'min', 'max'],

  stages: [
    { duration: '30s', target: 50  }, // Ramp-up
    { duration: '2m',  target: 50  }, // Hold peak
    { duration: '30s', target: 0   }, // Ramp-down
    // FIX 5: Spike stage — find breaking point
    { duration: '10s', target: 200 }, // Spike to 200 VUs
    { duration: '20s', target: 200 }, // Hold spike briefly
    { duration: '10s', target: 0   }, // Recover
  ],

  thresholds: {
    http_req_duration:  ['p(95)<1500', 'p(99)<3000'],
    http_500_errors:    ['rate<0.02'],
    endpoint_latency:   ['p(95)<1500'],
  },
};

function generatePayload() {
  const itemId  = ITEM_IDS[Math.floor(Math.random() * ITEM_IDS.length)];
  const clerkId = __ENV.CLERK_ID || 'user_39rBeEBrWaZUzmxSgcG1TkxmPOq';
  return JSON.stringify({ clerkId, itemId, isSpecialOffer: Math.random() > 0.5 });
}

export default function () {
  const url = `${__ENV.BASE_URL || 'http://localhost:3100'}/item/purchase`;
  const res = http.post(url, generatePayload(), {
    headers: { 'Content-Type': 'application/json' },
  });

  endpointLatency.add(res.timings.duration);
  http500Rate.add(res.status >= 500);

  // FIX 2: count each status bucket
  count200.add(res.status === 200 ? 1 : 0);
  count400.add(res.status === 400 ? 1 : 0);
  count500.add(res.status >= 500  ? 1 : 0);

  check(res, {
    'not a server error (5xx)': (r) => r.status < 500,
    'response time < 2s':       (r) => r.timings.duration < 2000,
    'has response body':        (r) => r.body && r.body.length > 0,
  });

  sleep(0.5);
}

export function handleSummary(data) {
  const dur   = data.metrics.http_req_duration?.values;
  const reqs  = data.metrics.http_reqs?.values;
  const e500  = data.metrics.http_500_errors?.values;
  const c200  = data.metrics.http_status_200?.values;
  const c400  = data.metrics.http_status_400?.values;
  const c500  = data.metrics.http_status_500?.values;
  const chk   = data.metrics.checks?.values;

  const lines = [
    '',
    '════════════════════════════════════════════════',
    '     WILDSNAP BACKEND — STRESS TEST v2          ',
    '     POST /item/purchase  +  Spike Test         ',
    '════════════════════════════════════════════════',
    `  Total Requests   : ${reqs?.count ?? 'N/A'}`,
    `  RPS (avg)        : ${reqs?.rate?.toFixed(2) ?? 'N/A'} req/s`,
    '  ──────────────────────────────────────────────',
    `  P50 Latency      : ${dur?.['p(50)']?.toFixed(2) ?? 'N/A'} ms`,
    `  P90 Latency      : ${dur?.['p(90)']?.toFixed(2) ?? 'N/A'} ms`,
    `  P95 Latency      : ${dur?.['p(95)']?.toFixed(2) ?? 'N/A'} ms`,
    `  P99 Latency      : ${dur?.['p(99)']?.toFixed(2) ?? 'N/A'} ms`,
    `  Avg Latency      : ${dur?.avg?.toFixed(2) ?? 'N/A'} ms`,
    `  Max Latency      : ${dur?.max?.toFixed(2) ?? 'N/A'} ms`,
    '  ──────────────────────────────────────────────',
    `  HTTP 200 OK      : ${c200?.count ?? 'N/A'} requests`,
    `  HTTP 400         : ${c400?.count ?? 'N/A'} requests (business logic rejection)`,
    `  HTTP 500+        : ${c500?.count ?? 'N/A'} requests (server errors)`,
    `  HTTP 500 Rate    : ${e500?.rate != null ? (e500.rate*100).toFixed(2)+'%' : 'N/A'}`,
    `  Checks passed    : ${chk?.passes ?? 0} / ${(chk?.passes??0)+(chk?.fails??0)}`,
    '════════════════════════════════════════════════',
    '',
  ];

  console.log(lines.join('\n'));

  return { 'summary.json': JSON.stringify(data, null, 2) };
}
