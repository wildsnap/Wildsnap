import svgPaths from "../../imports/svg-tsyapwpebk";

export function PixelAvatar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="block size-full drop-shadow-lg" fill="none" preserveAspectRatio="none" viewBox="0 0 206 155.186">
        <g filter="url(#filter0_d_avatar)" id="Group">
          <path d={svgPaths.p273d3e00} fill="var(--fill-0, #513418)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.pa0e7080} fill="var(--fill-0, #754F26)" id="Vector_2" />
          </g>
          <path d={svgPaths.p2c5c4700} fill="var(--fill-0, #AA7A41)" id="Vector_3" />
          <path d={svgPaths.p1c0df00} fill="var(--fill-0, #754F26)" id="Vector_4" />
          <path d={svgPaths.p34be3200} fill="var(--fill-0, #513418)" id="Vector_5" />
          <path d={svgPaths.p2cf4f280} fill="var(--fill-0, #754F26)" id="Vector_6" />
          <path d={svgPaths.p199e4480} fill="var(--fill-0, #382210)" id="Vector_7" />
          <path d={svgPaths.p9f20980} fill="var(--fill-0, #382210)" id="Vector_8" />
          <path d={svgPaths.p2f9f6f00} fill="var(--fill-0, #382210)" id="Vector_9" />
          <path d={svgPaths.pc4e5d80} fill="var(--fill-0, #AA7A41)" id="Vector_10" />
          <path d={svgPaths.pa4ae500} fill="var(--fill-0, #28211C)" id="Vector_11" />
          <path d={svgPaths.p30dc0800} fill="var(--fill-0, #28211C)" id="Vector_12" />
          <path d={svgPaths.pd86680} fill="var(--fill-0, #28211C)" id="Vector_13" />
          <path d={svgPaths.pad2a000} fill="var(--fill-0, #28211C)" id="Vector_14" />
          <path d={svgPaths.p285f6700} fill="var(--fill-0, #754F26)" id="Vector_15" />
          <path d={svgPaths.p3b149c00} fill="var(--fill-0, #513418)" id="Vector_16" />
          <path d={svgPaths.p1573c00} fill="var(--fill-0, #513418)" id="Vector_17" />
          <path d={svgPaths.pfd73b00} fill="var(--fill-0, #754F26)" id="Vector_18" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="155.186" id="filter0_d_avatar" width="206" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="4" dy="4" />
            <feGaussianBlur stdDeviation="3.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_avatar" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_avatar" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
