import svgPaths from "./svg-kmirvwsxu9";
import img8BitGraphicsPixelsSceneWithForest from "../app/components/images/img8BitGraphicsPixelsSceneWithForest.png";
import { imgBlurEvenly, imgBlurEvenly1 } from "./svg-ui3zk";

function Items() {
  return (
    <div className="absolute contents left-[1.16px] top-[3.76px]" data-name="Items">
      <div className="absolute backdrop-blur-[75px] bg-white inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.162px_3.757px] mask-size-[316.182px_13.38px] mix-blend-multiply" data-name="Blur Evenly" style={{ maskImage: `url('${imgBlurEvenly}')` }} />
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.162px_3.757px] mask-size-[316.182px_13.38px]" data-name="Auto Tint" style={{ maskImage: `url('${imgBlurEvenly}')` }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[red] inset-0 mix-blend-saturation" />
          <div className="absolute bg-white inset-0 mix-blend-difference" />
          <div className="absolute bg-white inset-0 mix-blend-saturation" />
          <div className="absolute bg-white inset-0 mix-blend-overlay" />
          <div className="absolute bg-black inset-0 mix-blend-overlay" />
          <div className="absolute bg-white inset-0 mix-blend-overlay" />
          <div className="absolute bg-black inset-0 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Content">
      <Items />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 px-[20px] py-[12px] top-0 w-[360px]" data-name="Status Bar">
      <Content />
    </div>
  );
}

function Items1() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[10px]" data-name="Items">
      <div className="-translate-x-1/2 absolute backdrop-blur-[75px] bg-white bottom-0 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_10px] mask-size-[108px_4px] mix-blend-multiply top-0 w-[108px]" data-name="Blur Evenly" style={{ maskImage: `url('${imgBlurEvenly1}')` }} />
      <div className="-translate-x-1/2 absolute bottom-0 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_10px] mask-size-[108px_4px] top-0 w-[108px]" data-name="Auto Tint" style={{ maskImage: `url('${imgBlurEvenly1}')` }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[red] inset-0 mix-blend-saturation" />
          <div className="absolute bg-white inset-0 mix-blend-difference" />
          <div className="absolute bg-white inset-0 mix-blend-saturation" />
          <div className="absolute bg-white inset-0 mix-blend-overlay" />
          <div className="absolute bg-black inset-0 mix-blend-overlay" />
          <div className="absolute bg-white inset-0 mix-blend-overlay" />
          <div className="absolute bg-black inset-0 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="absolute h-[24px] left-[-1px] top-[776px] w-[360px]" data-name="Navigation Bar">
      <Items1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f0ebce] text-[24px] text-center whitespace-nowrap">
        <p className="leading-[20px]">ACHIEVEMENTS</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#395144] content-stretch flex h-[27px] items-center justify-center left-1/2 p-[10px] rounded-[100px] shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(50%-299.5px)] w-[196px]">
      <Frame1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute right-[307px] size-[24px] top-[47px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p30c71900} fill="var(--fill-0, white)" id="Color" />
        </g>
      </svg>
    </div>
  );
}

function RiMedalFill() {
  return (
    <div className="absolute left-[11px] size-[72px] top-[26px]" data-name="ri:medal-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="ri:medal-fill">
          <path d={svgPaths.p2ebc500} fill="var(--fill-0, #CDB30C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Rectangle() {
  return (
    <div className="-translate-x-1/2 absolute h-[124px] left-1/2 top-[149px] w-[302px]">
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] bottom-0 left-1/2 rounded-[30px] shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[302px]" />
      <RiMedalFill />
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[104px] not-italic text-[20px] text-black top-[36px] whitespace-nowrap">
        <p className="leading-[20px]">Bear Type</p>
      </div>
      <div className="absolute bg-[#997c70] h-[22px] left-[106px] top-[62px] w-[172px]" />
      <div className="absolute bg-[#fdf7f4] h-[15px] left-[110px] top-[65px] w-[33px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[197.5px] not-italic text-[#4e342e] text-[20px] text-center top-[73px] whitespace-nowrap">
        <p className="leading-[20px]">1/5</p>
      </div>
    </div>
  );
}

function RiMedalFill1() {
  return (
    <div className="absolute left-[11px] size-[72px] top-[26px]" data-name="ri:medal-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="ri:medal-fill">
          <path d={svgPaths.p2ebc500} fill="var(--fill-0, #CDB30C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Rectangle1() {
  return (
    <div className="-translate-x-1/2 absolute h-[124px] left-[calc(50%+1px)] top-[288px] w-[302px]">
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] bottom-0 left-1/2 rounded-[30px] shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[302px]" />
      <RiMedalFill1 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[104px] not-italic text-[20px] text-black top-[36px] whitespace-nowrap">
        <p className="leading-[20px]">Monkey Type</p>
      </div>
      <div className="absolute bg-[#997c70] h-[22px] left-[106px] top-[62px] w-[172px]" />
      <div className="absolute bg-[#fdf7f4] h-[15px] left-[110px] top-[65px] w-[33px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[197.5px] not-italic text-[#4e342e] text-[20px] text-center top-[73px] whitespace-nowrap">
        <p className="leading-[20px]">2/8</p>
      </div>
    </div>
  );
}

function RiMedalFill2() {
  return (
    <div className="absolute left-[11px] size-[72px] top-[26px]" data-name="ri:medal-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="ri:medal-fill">
          <path d={svgPaths.p2ebc500} fill="var(--fill-0, #CDB30C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Rectangle2() {
  return (
    <div className="-translate-x-1/2 absolute h-[124px] left-[calc(50%+1px)] top-[427px] w-[302px]">
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] bottom-0 left-1/2 rounded-[30px] shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[302px]" />
      <RiMedalFill2 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[104px] not-italic text-[20px] text-black top-[36px] whitespace-nowrap">
        <p className="leading-[20px]">Savana</p>
      </div>
      <div className="absolute bg-[#997c70] h-[22px] left-[106px] top-[62px] w-[172px]" />
      <div className="absolute bg-[#fdf7f4] h-[15px] left-[110px] top-[65px] w-[33px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[197.5px] not-italic text-[#4e342e] text-[20px] text-center top-[73px] whitespace-nowrap">
        <p className="leading-[20px]">3/15</p>
      </div>
    </div>
  );
}

function RiMedalFill3() {
  return (
    <div className="absolute left-[11px] size-[72px] top-[26px]" data-name="ri:medal-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="ri:medal-fill">
          <path d={svgPaths.p2ebc500} fill="var(--fill-0, #CDB30C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Rectangle3() {
  return (
    <div className="-translate-x-1/2 absolute h-[124px] left-1/2 top-[566px] w-[302px]">
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] bottom-0 left-1/2 rounded-[30px] shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[302px]" />
      <RiMedalFill3 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[104px] not-italic text-[20px] text-black top-[36px] whitespace-nowrap">
        <p className="leading-[20px]">Omnivore</p>
      </div>
      <div className="absolute bg-[#997c70] h-[22px] left-[106px] top-[62px] w-[172px]" />
      <div className="absolute bg-[#fdf7f4] h-[15px] left-[110px] top-[65px] w-[33px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[197.5px] not-italic text-[#4e342e] text-[20px] text-center top-[73px] whitespace-nowrap">
        <p className="leading-[20px]">2/10</p>
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <div className="bg-white relative size-full" data-name="ACHIEVEMENTS">
      <div className="absolute h-[869px] left-[-550px] top-[-35px] w-[1304px]" data-name="8-bit-graphics-pixels-scene-with-forest 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8BitGraphicsPixelsSceneWithForest.src as string} />
      </div>
      <div className="-translate-x-1/2 absolute bg-[#513418] h-[740px] left-[calc(50%+0.5px)] top-[36px] w-[329px]" />
      <StatusBar />
      <NavigationBar />
      <div className="-translate-x-1/2 absolute bg-[#754f26] h-[686px] left-[calc(50%+0.5px)] top-[81px] w-[313px]" />
      <div className="absolute h-0 left-[24px] top-[130px] w-[313px]">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 313 3">
            <line id="Line 3" stroke="var(--stroke-0, #513418)" strokeWidth="3" x2="313" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
      <Frame />
      <Icon />
      <Rectangle />
      <Rectangle1 />
      <Rectangle2 />
      <Rectangle3 />
    </div>
  );
}