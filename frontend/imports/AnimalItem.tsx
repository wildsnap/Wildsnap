import svgPaths from "./svg-h1mwi5uxqn";
import img8BitGraphicsPixelsSceneWithForest from "../app/components/images/img8BitGraphicsPixelsSceneWithForest.png";
// import imgImage2 from "figma:asset/a0058aaf13a2611cb2cbb2666f3f6cc24219eb28.png";
// import imgImage3 from "figma:asset/03a350cf2ec7bb54455735e840e27be8c29278cb.png";
//  import imgImage4 from "figma:asset/38bc734d0a0caa502d4f462060f65024fdc66a0e.png";
import { imgBlurEvenly, imgBlurEvenly1 } from "./svg-e7i80";

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

function PixelarticonsCoin() {
  return (
    <div className="-translate-y-1/2 absolute left-[280px] size-[21px] top-[calc(50%-346.5px)]" data-name="pixelarticons:coin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="pixelarticons:coin">
          <path d={svgPaths.p33036700} fill="var(--fill-0, #005D0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[273px] top-[41px]">
      <div className="absolute bg-[#d9d9d9] border border-[#005d0f] border-solid h-[24px] left-[273px] rounded-[72px] top-[41px] w-[64px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[316.5px] not-italic text-[#009418] text-[15px] text-center top-[calc(50%-346px)] whitespace-nowrap">
        <p className="leading-[20px]">300</p>
      </div>
      <PixelarticonsCoin />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute right-[315px] size-[24px] top-[44px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p30c71900} fill="var(--fill-0, black)" id="Color" />
        </g>
      </svg>
    </div>
  );
}

export default function AnimalItem() {
  return (
    <div className="bg-white relative size-full" data-name="Animal Item">
      <div className="absolute h-[869px] left-[-550px] top-[-35px] w-[1304px]" data-name="8-bit-graphics-pixels-scene-with-forest 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8BitGraphicsPixelsSceneWithForest.src as string} />
      </div>
      <div className="-translate-x-1/2 absolute bg-white h-[740px] left-[calc(50%+0.5px)] top-[36px] w-[329px]" />
      <StatusBar />
      <NavigationBar />
      <Group />
      <div className="absolute h-[188px] left-[47px] top-[97px] w-[267px]" data-name="image 2">
        {/* <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} /> */}       
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[15px] text-black text-center top-[305px] whitespace-nowrap">
        <p className="leading-[20px]">Cap...............................1000 wild coin</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[calc(50%+1.5px)] not-italic text-[15px] text-black text-center top-[494px] whitespace-nowrap">
        <p className="leading-[20px]">Ticket discount 30 %......300 wild coin</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[15px] text-black text-center top-[730px] whitespace-nowrap">
        <p className="leading-[20px]">Pin zoo ................. 100 wild coin</p>
      </div>
      <div className="absolute h-[159px] left-[35px] top-[325px] w-[292px]" data-name="image 3">
        {/* <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} /> */}
      </div>
      <div className="absolute left-[86px] rounded-[126px] size-[187px] top-[521px]" data-name="image 4">
        {/* <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[126px] size-full" src={imgImage4} /> */}
      </div>
      <Icon />
    </div>
  );
}