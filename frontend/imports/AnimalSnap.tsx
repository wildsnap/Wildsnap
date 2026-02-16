import svgPaths from "./svg-6suqhmdmrz";
import img8BitGraphicsPixelsSceneWithForest from "../app/components/images/img8BitGraphicsPixelsSceneWithForest.png";
// import imgImage from "figma:asset/2b22c019fb6b79eddeea0d7691a5026138c45330.png";
import { imgBlurEvenly } from "./svg-znj9b";

function Frame() {
  return (
    <div className="absolute content-stretch flex h-[639px] items-center left-[14px] pointer-events-none py-[5px] rounded-[40px] top-[41px]">
      <div aria-hidden="true" className="absolute border-3 border-solid border-white inset-[-3px] rounded-[43px]" />
      <div className="blur-[0.75px] h-[638px] relative rounded-[40px] shrink-0 w-[332px]" data-name="image">
        {/* <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[40px] size-full" src={imgImage} /> */}
        <div aria-hidden="true" className="absolute border-5 border-[#005d0f] border-solid inset-0 rounded-[40px]" />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute right-[304px] size-[24px] top-[60px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <g id="Color">
            <mask fill="black" height="22" id="path-1-outside-1_1_2707" maskUnits="userSpaceOnUse" width="21" x="1" y="1">
              <rect fill="white" height="22" width="21" x="1" y="1" />
              <path d={svgPaths.p30c71900} />
            </mask>
            <path d={svgPaths.p30c71900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p33dd7880} fill="var(--stroke-0, black)" mask="url(#path-1-outside-1_1_2707)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

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

export default function AnimalSnap() {
  return (
    <div className="bg-white relative size-full" data-name="Animal Snap">
      <div className="absolute h-[869px] left-[-550px] top-[-35px] w-[1304px]" data-name="8-bit-graphics-pixels-scene-with-forest 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8BitGraphicsPixelsSceneWithForest.src as string} />
      </div>
      <Frame />
      <Icon />
      <div className="absolute left-[145px] size-[69px] top-[705px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69 69">
          <circle cx="34.5" cy="34.5" fill="var(--fill-0, #005D0F)" id="Ellipse 81" r="32" stroke="var(--stroke-0, white)" strokeWidth="5" />
        </svg>
      </div>
      <div className="absolute h-[600px] left-[-163px] top-[60px] w-[800px]" data-name="image 1" />
      <StatusBar />
    </div>
  );
}