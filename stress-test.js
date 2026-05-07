import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// --- Custom Metrics ---
// Tracks HTTP 500 errors specifically so you can see when the backend starts failing
const http500Rate = new Rate('http_500_errors');
// Tracks response time for your specific endpoint (separate from k6's built-in http_req_duration)
const endpointLatency = new Trend('endpoint_latency', true);

// --- Load Profile ---
// Ramp up → hold → ramp down
export const options = {
  stages: [
    { duration: '30s', target: 50 }, // Ramp up to 50 VUs over 30 seconds
    { duration: '2m', target: 50  }, // Hold at peak load for 2 minutes
    { duration: '30s', target: 0  }, // Ramp down to 0 over 30 seconds
  ],

  // --- Thresholds ---
  // The test will be marked as FAILED if any of these are breached.
  thresholds: {
    // P95 response time must be under 1500ms, P99 under 3000ms
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],

    // Overall HTTP failure rate (non-2xx) must stay below 5%
    http_req_failed: ['rate<0.05'],

    // Your custom 500-error rate must stay below 2%
    http_500_errors: ['rate<0.02'],

    // Your endpoint-specific latency tracked separately
    endpoint_latency: ['p(95)<1500'],
  },
};

// --- Auth ---
// Read the JWT from an environment variable. Never hardcode tokens.
// Usage: k6 run -e API_TOKEN=your.jwt.token stress-test.js
const JWT_TOKEN = __ENV.API_TOKEN;

// --- Payload Generator ---
// Generates a randomized payload for each request to avoid Prisma unique-constraint
// violations when the same data gets inserted repeatedly across VUs.
function generatePayload() {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const timestamp = new Date().toISOString();

  return JSON.stringify({
    // Adjust fields to match your actual endpoint's expected schema.
    // These are illustrative examples — swap them for your real fields.
    name: `stress-test-user-${randomSuffix}`,
    email: `test-${randomSuffix}@example.com`,
    createdAt: timestamp,
    sessionId: `session-${randomSuffix}-${Date.now()}`,
  });
}

// --- Request Headers ---
function buildHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT_TOKEN}`,
  };
}

// --- Main VU Loop ---
export default function () {
  // Replace [INSERT_URL] with your actual endpoint URL.
  // Best practice: read it from an env var too.
  //   k6 run -e API_TOKEN=xxx -e BASE_URL=https://api.example.com stress-test.js
  const url = __ENV.BASE_URL
    ? `${__ENV.BASE_URL}/your-endpoint-path`
    : 'http://localhost:3000/your-endpoint-path';

  const payload = generatePayload();
  const headers = buildHeaders();

  const res = http.post(url, payload, { headers });

  // --- Record custom metrics ---
  endpointLatency.add(res.timings.duration);
  http500Rate.add(res.status === 500);

  // --- Checks (failures here count toward http_req_failed) ---
  check(res, {
    'status is 2xx':       (r) => r.status >= 200 && r.status < 300,
    'status is not 500':   (r) => r.status !== 500,
    'response has body':   (r) => r.body && r.body.length > 0,
    'response time < 2s':  (r) => r.timings.duration < 2000,
  });

  // Brief pause between iterations per VU to simulate realistic traffic.
  // Remove or lower this if you want purely synthetic maximum load.
  sleep(0.5);
}

// --- Summary Report Hook ---
// This runs once after the test completes and prints a focused performance summary.
export function handleSummary(data) {
  const dur = data.metrics.http_req_duration;
  const rps = data.metrics.http_reqs;
  const failed = data.metrics.http_req_failed;
  const errors500 = data.metrics.http_500_errors;

  const summary = {
    '=== PERFORMANCE REPORT SUMMARY ===': '',
    'Total Requests':    rps?.values?.count      ?? 'N/A',
    'RPS (avg)':         rps?.values?.rate?.toFixed(2) ?? 'N/A',
    'P50 Latency (ms)':  dur?.values?.['p(50)']?.toFixed(2) ?? 'N/A',
    'P95 Latency (ms)':  dur?.values?.['p(95)']?.toFixed(2) ?? 'N/A',
    'P99 Latency (ms)':  dur?.values?.['p(99)']?.toFixed(2) ?? 'N/A',
    'Avg Latency (ms)':  dur?.values?.avg?.toFixed(2)  ?? 'N/A',
    'Max Latency (ms)':  dur?.values?.max?.toFixed(2)  ?? 'N/A',
    'Failure Rate':      failed?.values?.rate != null
                           ? `${(failed.values.rate * 100).toFixed(2)}%`
                           : 'N/A',
    'HTTP 500 Rate':     errors500?.values?.rate != null
                           ? `${(errors500.values.rate * 100).toFixed(2)}%`
                           : 'N/A',
  };

  console.log('\n');
  for (const [key, val] of Object.entries(summary)) {
    if (val === '') {
      console.log(key);
    } else {
      console.log(`  ${key.padEnd(22)}: ${val}`);
    }
  }
  console.log('\n');

  // Return the default k6 summary too (stdout + optional JSON file)
  return {
    stdout: JSON.stringify(data, null, 2),
    'summary.json': JSON.stringify(data),
  };
}
