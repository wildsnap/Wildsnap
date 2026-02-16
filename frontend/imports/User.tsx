import svgPaths from "./svg-xt5sz64o6h";
import img8BitGraphicsPixelsSceneWithForest from "../app/components/images/img8BitGraphicsPixelsSceneWithForest.png";
import { imgBlurEvenly, imgBlurEvenly1 } from "./svg-oddgc";

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

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute bg-[rgba(255,127,127,0.85)] h-[16px] left-[calc(50%+7.5px)] rounded-[100px] top-[733px] w-[65px]">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[10px] relative size-full">
          <div className="flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black text-center text-shadow-[2px_3px_4px_rgba(0,0,0,0.3)] whitespace-nowrap">
            <p className="leading-[20px]">Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spices() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Spices">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[24px] text-black text-center w-[86px]">
        <p className="leading-[20px] whitespace-pre-wrap">Human</p>
      </div>
    </div>
  );
}

function Age() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Age">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[0px] text-black text-center w-[94px]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[20px] text-[24px]">13</span>
          <span className="leading-[20px] text-[12px]">{` `}</span>
          <span className="leading-[20px] text-[#575757] text-[10px]">year</span>
        </p>
      </div>
    </div>
  );
}

function Age1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Age">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[0px] text-black text-center w-[75px]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[20px] text-[24px]">40</span>
          <span className="leading-[20px] text-[12px]">{` `}</span>
          <span className="leading-[20px] text-[#575757] text-[12px]">kg</span>
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-[calc(50%-4.5px)] top-[367px] w-[281px]">
      <Spices />
      <div className="flex h-[17px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[17px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 1">
                <line id="Line 1" stroke="var(--stroke-0, black)" x2="17" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Age />
      <div className="flex h-[17px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[17px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 1">
                <line id="Line 1" stroke="var(--stroke-0, black)" x2="17" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Age1 />
    </div>
  );
}

function Spices1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Spices">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[#575757] text-[10px] text-center w-[58px]">
        <p className="leading-[20px] whitespace-pre-wrap">Type</p>
      </div>
    </div>
  );
}

function Age2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Age">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[#575757] text-[10px] text-center w-[94px]">
        <p className="leading-[20px] whitespace-pre-wrap">Age</p>
      </div>
    </div>
  );
}

function Age3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Age">
      <div className="col-1 flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center ml-0 mt-0 not-italic relative row-1 text-[#575757] text-[10px] text-center w-[75px]">
        <p className="leading-[20px] whitespace-pre-wrap">Weight</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex h-[16px] items-center justify-between leading-[0] left-[calc(50%+1px)] top-[392px] w-[262px]">
      <Spices1 />
      <Age2 />
      <Age3 />
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-4.5px)] top-[367px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function MdiPencil() {
  return (
    <div className="absolute left-[221px] size-[13px] top-[325px]" data-name="mdi:pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="mdi:pencil">
          <path d={svgPaths.pf9b1570} fill="var(--fill-0, #575757)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[316px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-3px)] not-italic text-[32px] text-black text-center top-[324.5px] w-[100px]">
        <p className="leading-[20px] whitespace-pre-wrap">Bboss</p>
      </div>
      <MdiPencil />
    </div>
  );
}

function User1() {
  return (
    <div className="absolute inset-[6.13%_39.07%_65.11%_38.89%]" data-name="user">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.359 230.131">
        <g id="user">
          <path d={svgPaths.p24adbbf0} fill="var(--fill-0, #EF5350)" id="Vector" />
          <path d={svgPaths.p3b0eae00} fill="var(--fill-0, #EF5350)" id="Vector_2" />
          <path d={svgPaths.pa249400} fill="var(--fill-0, #EF5350)" id="Vector_3" />
          <path d={svgPaths.p28bb600} fill="var(--fill-0, #EF5350)" id="Vector_4" />
          <path d={svgPaths.p2b49df80} fill="var(--fill-0, #EF5350)" id="Vector_5" />
          <path d={svgPaths.p23c9f870} fill="var(--fill-0, #EF5350)" id="Vector_6" />
          <path d={svgPaths.pb3b9c00} fill="var(--fill-0, #EF5350)" id="Vector_7" />
          <path d={svgPaths.p2afb7400} fill="var(--fill-0, #EF5350)" id="Vector_8" />
          <path d={svgPaths.pe78e100} fill="var(--fill-0, #4E342E)" id="Vector_9" />
          <path d={svgPaths.p3f101700} fill="var(--fill-0, #4E342E)" id="Vector_10" />
          <path d={svgPaths.p7b28800} fill="var(--fill-0, #4E342E)" id="Vector_11" />
          <path d={svgPaths.p9c9ee00} fill="var(--fill-0, #4E342E)" id="Vector_12" />
          <path d={svgPaths.p217f6c00} fill="var(--fill-0, #4E342E)" id="Vector_13" />
          <path d={svgPaths.p570e800} fill="var(--fill-0, #4E342E)" id="Vector_14" />
          <path d={svgPaths.p1328b900} fill="var(--fill-0, #4E342E)" id="Vector_15" />
          <path d={svgPaths.p9134a00} fill="var(--fill-0, #4E342E)" id="Vector_16" />
          <path d={svgPaths.p417bb00} fill="var(--fill-0, #4E342E)" id="Vector_17" />
          <path d={svgPaths.p1344f300} fill="var(--fill-0, #4E342E)" id="Vector_18" />
          <path d={svgPaths.p121b4780} fill="var(--fill-0, #4E342E)" id="Vector_19" />
          <path d={svgPaths.p273d4780} fill="var(--fill-0, #4E342E)" id="Vector_20" />
          <path d={svgPaths.p174471f0} fill="var(--fill-0, #4E342E)" id="Vector_21" />
          <path d={svgPaths.p2019580} fill="var(--fill-0, #4E342E)" id="Vector_22" />
          <path d={svgPaths.pe1325c0} fill="var(--fill-0, #4E342E)" id="Vector_23" />
          <path d={svgPaths.p3e4ec600} fill="var(--fill-0, #4E342E)" id="Vector_24" />
          <path d={svgPaths.p1ed34900} fill="var(--fill-0, #4E342E)" id="Vector_25" />
          <path d={svgPaths.p1fd7e500} fill="var(--fill-0, #4E342E)" id="Vector_26" />
          <path d={svgPaths.p1e522580} fill="var(--fill-0, #4E342E)" id="Vector_27" />
          <path d={svgPaths.p36bb59f0} fill="var(--fill-0, #4E342E)" id="Vector_28" />
          <path d={svgPaths.p11191100} fill="var(--fill-0, #4E342E)" id="Vector_29" />
          <path d={svgPaths.p19b48300} fill="var(--fill-0, #4E342E)" id="Vector_30" />
          <path d={svgPaths.p350cb780} fill="var(--fill-0, #4E342E)" id="Vector_31" />
          <path d={svgPaths.p1ce54400} fill="var(--fill-0, #4E342E)" id="Vector_32" />
          <path d={svgPaths.p39e56680} fill="var(--fill-0, #4E342E)" id="Vector_33" />
          <path d={svgPaths.p561f00} fill="var(--fill-0, #4E342E)" id="Vector_34" />
          <path d={svgPaths.p30dbd000} fill="var(--fill-0, #4E342E)" id="Vector_35" />
          <path d={svgPaths.p26609400} fill="var(--fill-0, #4E342E)" id="Vector_36" />
          <path d={svgPaths.p1258e00} fill="var(--fill-0, #4E342E)" id="Vector_37" />
          <path d={svgPaths.p362e6580} fill="var(--fill-0, #4E342E)" id="Vector_38" />
          <path d={svgPaths.p79faaf1} fill="var(--fill-0, #4E342E)" id="Vector_39" />
          <path d={svgPaths.p64ea500} fill="var(--fill-0, #4E342E)" id="Vector_40" />
          <path d={svgPaths.p2c06d400} fill="var(--fill-0, #4E342E)" id="Vector_41" />
          <path d={svgPaths.p25863800} fill="var(--fill-0, #4E342E)" id="Vector_42" />
          <path d={svgPaths.p3983dc80} fill="var(--fill-0, #4E342E)" id="Vector_43" />
          <path d={svgPaths.p2ab5d800} fill="var(--fill-0, #4E342E)" id="Vector_44" />
          <path d={svgPaths.p12997d00} fill="var(--fill-0, #4E342E)" id="Vector_45" />
          <path d={svgPaths.p20930fc0} fill="var(--fill-0, #4E342E)" id="Vector_46" />
          <path d={svgPaths.p36de1480} fill="var(--fill-0, #4E342E)" id="Vector_47" />
          <path d={svgPaths.p24278d00} fill="var(--fill-0, #4E342E)" id="Vector_48" />
          <path d={svgPaths.p1da9d770} fill="var(--fill-0, #4E342E)" id="Vector_49" />
          <path d={svgPaths.p2fa3d600} fill="var(--fill-0, #4E342E)" id="Vector_50" />
          <path d={svgPaths.p1e52cf00} fill="var(--fill-0, #4E342E)" id="Vector_51" />
          <path d={svgPaths.p3e5470f0} fill="var(--fill-0, #4E342E)" id="Vector_52" />
          <path d={svgPaths.p18745e00} fill="var(--fill-0, #4E342E)" id="Vector_53" />
          <path d={svgPaths.p2ad52000} fill="var(--fill-0, #4E342E)" id="Vector_54" />
          <path d={svgPaths.p3cfb0a70} fill="var(--fill-0, #4E342E)" id="Vector_55" />
          <path d={svgPaths.p13f61a00} fill="var(--fill-0, #4E342E)" id="Vector_56" />
          <path d={svgPaths.pef09700} fill="var(--fill-0, #4E342E)" id="Vector_57" />
          <path d={svgPaths.p1f326ac0} fill="var(--fill-0, #4E342E)" id="Vector_58" />
          <path d={svgPaths.p2bbb3680} fill="var(--fill-0, #4E342E)" id="Vector_59" />
          <path d={svgPaths.p66d1680} fill="var(--fill-0, #4E342E)" id="Vector_60" />
          <path d={svgPaths.p3cd87080} fill="var(--fill-0, #4E342E)" id="Vector_61" />
          <path d={svgPaths.p2768ab00} fill="var(--fill-0, #4E342E)" id="Vector_62" />
          <path d={svgPaths.p389deec0} fill="var(--fill-0, #4E342E)" id="Vector_63" />
          <path d={svgPaths.p38619980} fill="var(--fill-0, #4E342E)" id="Vector_64" />
          <path d={svgPaths.p3bb080} fill="var(--fill-0, #8D6E63)" id="Vector_65" />
          <path d={svgPaths.p19236380} fill="var(--fill-0, #8D6E63)" id="Vector_66" />
          <path d={svgPaths.p16e08a00} fill="var(--fill-0, #8D6E63)" id="Vector_67" />
          <path d={svgPaths.p1dd69680} fill="var(--fill-0, #8D6E63)" id="Vector_68" />
          <path d={svgPaths.p3b25b400} fill="var(--fill-0, #8D6E63)" id="Vector_69" />
          <path d={svgPaths.p3f4a4e00} fill="var(--fill-0, #8D6E63)" id="Vector_70" />
          <path d={svgPaths.p1d855400} fill="var(--fill-0, #8D6E63)" id="Vector_71" />
          <path d={svgPaths.p31330f80} fill="var(--fill-0, #8D6E63)" id="Vector_72" />
          <path d={svgPaths.pca12d00} fill="var(--fill-0, #5D4037)" id="Vector_73" />
          <path d={svgPaths.p2aeffdc0} fill="var(--fill-0, #5D4037)" id="Vector_74" />
          <path d={svgPaths.p3ac85a80} fill="var(--fill-0, #5D4037)" id="Vector_75" />
          <path d={svgPaths.p3d850480} fill="var(--fill-0, #5D4037)" id="Vector_76" />
          <path d={svgPaths.p28bdc800} fill="var(--fill-0, #5D4037)" id="Vector_77" />
          <path d={svgPaths.p7532f80} fill="var(--fill-0, #5D4037)" id="Vector_78" />
          <path d={svgPaths.p8a93d80} fill="var(--fill-0, #5D4037)" id="Vector_79" />
          <path d={svgPaths.pf211a80} fill="var(--fill-0, #5D4037)" id="Vector_80" />
          <path d={svgPaths.p1dc93980} fill="var(--fill-0, #FFE0B2)" id="Vector_81" />
          <path d={svgPaths.p20375d00} fill="var(--fill-0, #FFE0B2)" id="Vector_82" />
          <path d={svgPaths.p354d5400} fill="var(--fill-0, #5D4037)" id="Vector_83" />
          <path d={svgPaths.p33e60280} fill="var(--fill-0, #5D4037)" id="Vector_84" />
          <path d={svgPaths.p3f99df00} fill="var(--fill-0, #8D6E63)" id="Vector_85" />
          <path d={svgPaths.p2834e000} fill="var(--fill-0, #5D4037)" id="Vector_86" />
          <path d={svgPaths.p15ca6f80} fill="var(--fill-0, #5D4037)" id="Vector_87" />
          <path d={svgPaths.p188d5100} fill="var(--fill-0, #80CBC4)" id="Vector_88" />
          <path d={svgPaths.p3417b9f0} fill="var(--fill-0, #8D6E63)" id="Vector_89" />
          <path d={svgPaths.p21896450} fill="var(--fill-0, #5D4037)" id="Vector_90" />
          <path d={svgPaths.pafe0440} fill="var(--fill-0, #80CBC4)" id="Vector_91" />
          <path d={svgPaths.p9d07700} fill="var(--fill-0, #EF5350)" id="Vector_92" />
          <path d={svgPaths.p25c5f800} fill="var(--fill-0, #80CBC4)" id="Vector_93" />
          <path d={svgPaths.pb582100} fill="var(--fill-0, #5D4037)" id="Vector_94" />
          <path d={svgPaths.p36ae6280} fill="var(--fill-0, #5D4037)" id="Vector_95" />
          <path d={svgPaths.p3ad4880} fill="var(--fill-0, #5D4037)" id="Vector_96" />
          <path d={svgPaths.p8a2a400} fill="var(--fill-0, #5D4037)" id="Vector_97" />
          <path d={svgPaths.p396e6500} fill="var(--fill-0, #8D6E63)" id="Vector_98" />
          <path d={svgPaths.p2fc40a00} fill="var(--fill-0, #5D4037)" id="Vector_99" />
          <path d={svgPaths.p269e8b80} fill="var(--fill-0, #5D4037)" id="Vector_100" />
          <path d={svgPaths.p1787ee00} fill="var(--fill-0, #5D4037)" id="Vector_101" />
          <path d={svgPaths.p145e7b00} fill="var(--fill-0, #5D4037)" id="Vector_102" />
          <path d={svgPaths.p31672b00} fill="var(--fill-0, #8D6E63)" id="Vector_103" />
          <path d={svgPaths.p34e3ea1} fill="var(--fill-0, #8D6E63)" id="Vector_104" />
          <path d={svgPaths.pce4d180} fill="var(--fill-0, #8D6E63)" id="Vector_105" />
          <path d={svgPaths.p26321300} fill="var(--fill-0, #8D6E63)" id="Vector_106" />
          <path d={svgPaths.p3b4abd00} fill="var(--fill-0, #5D4037)" id="Vector_107" />
          <path d={svgPaths.p3ea6a00} fill="var(--fill-0, #5D4037)" id="Vector_108" />
          <path d={svgPaths.p1a453480} fill="var(--fill-0, #5D4037)" id="Vector_109" />
          <path d={svgPaths.p2031f100} fill="var(--fill-0, #5D4037)" id="Vector_110" />
          <path d={svgPaths.p1572e980} fill="var(--fill-0, #8D6E63)" id="Vector_111" />
          <path d={svgPaths.p15840c00} fill="var(--fill-0, #5D4037)" id="Vector_112" />
          <path d={svgPaths.p4a41e80} fill="var(--fill-0, #5D4037)" id="Vector_113" />
          <path d={svgPaths.p3987ec00} fill="var(--fill-0, #5D4037)" id="Vector_114" />
          <path d={svgPaths.p1fa53d00} fill="var(--fill-0, #5D4037)" id="Vector_115" />
          <path d={svgPaths.p1f341900} fill="var(--fill-0, #5D4037)" id="Vector_116" />
          <path d={svgPaths.p317c0980} fill="var(--fill-0, #5D4037)" id="Vector_117" />
          <path d={svgPaths.p2b928c00} fill="var(--fill-0, #8D6E63)" id="Vector_118" />
          <path d={svgPaths.p227f5400} fill="var(--fill-0, #8D6E63)" id="Vector_119" />
          <path d={svgPaths.p15e23a60} fill="var(--fill-0, #8D6E63)" id="Vector_120" />
          <path d={svgPaths.p1a862100} fill="var(--fill-0, #8D6E63)" id="Vector_121" />
          <path d={svgPaths.p3e6fa800} fill="var(--fill-0, #EF5350)" id="Vector_122" />
          <path d={svgPaths.p3891d580} fill="var(--fill-0, #8D6E63)" id="Vector_123" />
          <path d={svgPaths.p2a387e00} fill="var(--fill-0, #8D6E63)" id="Vector_124" />
          <path d={svgPaths.p3065100} fill="var(--fill-0, #EF5350)" id="Vector_125" />
          <path d={svgPaths.p307d5480} fill="var(--fill-0, #EF5350)" id="Vector_126" />
          <path d={svgPaths.p9c6c200} fill="var(--fill-0, #80CBC4)" id="Vector_127" />
          <path d={svgPaths.p2d25ed80} fill="var(--fill-0, #8D6E63)" id="Vector_128" />
          <path d={svgPaths.p24fa4400} fill="var(--fill-0, #8D6E63)" id="Vector_129" />
          <path d={svgPaths.p8a44800} fill="var(--fill-0, #80CBC4)" id="Vector_130" />
          <path d={svgPaths.pd56ce80} fill="var(--fill-0, #80CBC4)" id="Vector_131" />
          <path d={svgPaths.p36921900} fill="var(--fill-0, #5D4037)" id="Vector_132" />
          <path d={svgPaths.p286c3100} fill="var(--fill-0, #5D4037)" id="Vector_133" />
          <path d={svgPaths.p3c437d80} fill="var(--fill-0, #5D4037)" id="Vector_134" />
          <path d={svgPaths.p66af880} fill="var(--fill-0, #5D4037)" id="Vector_135" />
          <path d={svgPaths.p3be1d700} fill="var(--fill-0, #5D4037)" id="Vector_136" />
          <path d={svgPaths.p2cee8000} fill="var(--fill-0, #5D4037)" id="Vector_137" />
          <path d={svgPaths.p12a9fb80} fill="var(--fill-0, #5D4037)" id="Vector_138" />
          <path d={svgPaths.p2d121280} fill="var(--fill-0, #5D4037)" id="Vector_139" />
          <path d={svgPaths.p10116580} fill="var(--fill-0, #5D4037)" id="Vector_140" />
          <path d={svgPaths.p1d4c6bc0} fill="var(--fill-0, #5D4037)" id="Vector_141" />
          <path d={svgPaths.p1f7dcd80} fill="var(--fill-0, #5D4037)" id="Vector_142" />
          <path d={svgPaths.p27f90000} fill="var(--fill-0, #5D4037)" id="Vector_143" />
          <path d={svgPaths.pcaff472} fill="var(--fill-0, #5D4037)" id="Vector_144" />
          <path d={svgPaths.p27800980} fill="var(--fill-0, #5D4037)" id="Vector_145" />
          <path d={svgPaths.p36979480} fill="var(--fill-0, #5D4037)" id="Vector_146" />
          <path d={svgPaths.p1fbb2d80} fill="var(--fill-0, #5D4037)" id="Vector_147" />
          <path d={svgPaths.p3696ed00} fill="var(--fill-0, #5D4037)" id="Vector_148" />
          <path d={svgPaths.p1a853100} fill="var(--fill-0, #5D4037)" id="Vector_149" />
          <path d={svgPaths.p12370d00} fill="var(--fill-0, #5D4037)" id="Vector_150" />
          <path d={svgPaths.p12e6fb00} fill="var(--fill-0, #5D4037)" id="Vector_151" />
          <path d={svgPaths.p1089e580} fill="var(--fill-0, #5D4037)" id="Vector_152" />
          <path d={svgPaths.p22117880} fill="var(--fill-0, #5D4037)" id="Vector_153" />
          <path d={svgPaths.p268d0600} fill="var(--fill-0, #5D4037)" id="Vector_154" />
          <path d={svgPaths.p15b12700} fill="var(--fill-0, #5D4037)" id="Vector_155" />
          <path d={svgPaths.p390ae400} fill="var(--fill-0, #5D4037)" id="Vector_156" />
          <path d={svgPaths.p13a24200} fill="var(--fill-0, #8D6E63)" id="Vector_157" />
          <path d={svgPaths.p14ad4af0} fill="var(--fill-0, #80CBC4)" id="Vector_158" />
          <path d={svgPaths.p2f47c680} fill="var(--fill-0, #8D6E63)" id="Vector_159" />
          <path d={svgPaths.p18a16180} fill="var(--fill-0, #8D6E63)" id="Vector_160" />
          <path d={svgPaths.p12440300} fill="var(--fill-0, #80CBC4)" id="Vector_161" />
          <path d={svgPaths.p32eba200} fill="var(--fill-0, #EF5350)" id="Vector_162" />
          <path d={svgPaths.p18481180} fill="var(--fill-0, #EF5350)" id="Vector_163" />
          <path d={svgPaths.p1726b280} fill="var(--fill-0, #5D4037)" id="Vector_164" />
          <path d={svgPaths.p1e8f7840} fill="var(--fill-0, #8D6E63)" id="Vector_165" />
          <path d={svgPaths.p3bd81600} fill="var(--fill-0, #5D4037)" id="Vector_166" />
          <path d={svgPaths.p8830c00} fill="var(--fill-0, #FFE0B2)" id="Vector_167" />
          <path d={svgPaths.p2633c100} fill="var(--fill-0, #FFE0B2)" id="Vector_168" />
          <path d={svgPaths.p566f040} fill="var(--fill-0, #424242)" id="Vector_169" />
          <path d={svgPaths.p2411ce00} fill="var(--fill-0, #424242)" id="Vector_170" />
          <path d={svgPaths.p3929b200} fill="var(--fill-0, #424242)" id="Vector_171" />
          <path d={svgPaths.p247e5000} fill="var(--fill-0, #424242)" id="Vector_172" />
          <path d={svgPaths.p3014d180} fill="var(--fill-0, #424242)" id="Vector_173" />
          <path d={svgPaths.p28b1d100} fill="var(--fill-0, #424242)" id="Vector_174" />
          <path d={svgPaths.p186cf400} fill="var(--fill-0, #424242)" id="Vector_175" />
          <path d={svgPaths.p22a4ca00} fill="var(--fill-0, #424242)" id="Vector_176" />
          <path d={svgPaths.pee50e00} fill="var(--fill-0, #424242)" id="Vector_177" />
          <path d={svgPaths.p3d22ad60} fill="var(--fill-0, #424242)" id="Vector_178" />
          <path d={svgPaths.p3fd9a00} fill="var(--fill-0, #424242)" id="Vector_179" />
          <path d={svgPaths.p21741c00} fill="var(--fill-0, #424242)" id="Vector_180" />
          <path d={svgPaths.p1217fc40} fill="var(--fill-0, #424242)" id="Vector_181" />
          <path d={svgPaths.p2c63e600} fill="var(--fill-0, #424242)" id="Vector_182" />
          <path d={svgPaths.p25d90800} fill="var(--fill-0, #424242)" id="Vector_183" />
          <path d={svgPaths.p18984b40} fill="var(--fill-0, #424242)" id="Vector_184" />
          <path d={svgPaths.p1d96c400} fill="var(--fill-0, #424242)" id="Vector_185" />
          <path d={svgPaths.p1a2b1200} fill="var(--fill-0, #424242)" id="Vector_186" />
          <path d={svgPaths.p2ff86300} fill="var(--fill-0, #FFE0B2)" id="Vector_187" />
          <path d={svgPaths.p17807600} fill="var(--fill-0, #FFE0B2)" id="Vector_188" />
          <path d={svgPaths.p2e890e80} fill="var(--fill-0, white)" id="Vector_189" />
          <path d={svgPaths.p1475140} fill="var(--fill-0, #FFE0B2)" id="Vector_190" />
          <path d={svgPaths.p2538a900} fill="var(--fill-0, #FFE0B2)" id="Vector_191" />
          <path d={svgPaths.p27954100} fill="var(--fill-0, #FFE0B2)" id="Vector_192" />
          <path d={svgPaths.p1a8b4700} fill="var(--fill-0, #FFE0B2)" id="Vector_193" />
          <path d={svgPaths.pc025480} fill="var(--fill-0, #FFE0B2)" id="Vector_194" />
          <path d={svgPaths.p43a8700} fill="var(--fill-0, #FFE0B2)" id="Vector_195" />
          <path d={svgPaths.p2c776740} fill="var(--fill-0, #FFE0B2)" id="Vector_196" />
          <path d={svgPaths.p27932a00} fill="var(--fill-0, #FFE0B2)" id="Vector_197" />
          <path d={svgPaths.p33405a80} fill="var(--fill-0, #FFE0B2)" id="Vector_198" />
          <path d={svgPaths.pc8cbdc0} fill="var(--fill-0, #FFE0B2)" id="Vector_199" />
          <path d={svgPaths.p2405c300} fill="var(--fill-0, #FFE0B2)" id="Vector_200" />
          <path d={svgPaths.p3d06fc00} fill="var(--fill-0, #424242)" id="Vector_201" />
          <path d={svgPaths.p2ec44100} fill="var(--fill-0, #FFE0B2)" id="Vector_202" />
          <path d={svgPaths.pbe1f900} fill="var(--fill-0, #FFE0B2)" id="Vector_203" />
          <path d={svgPaths.p35e8400} fill="var(--fill-0, #FFE0B2)" id="Vector_204" />
          <path d={svgPaths.pd48ea00} fill="var(--fill-0, #FFE0B2)" id="Vector_205" />
          <path d={svgPaths.p37c6a200} fill="var(--fill-0, #FFE0B2)" id="Vector_206" />
          <path d={svgPaths.p312d3200} fill="var(--fill-0, #FFE0B2)" id="Vector_207" />
          <path d={svgPaths.p20a2cb32} fill="var(--fill-0, #FFE0B2)" id="Vector_208" />
          <path d={svgPaths.p4fc00} fill="var(--fill-0, #FFE0B2)" id="Vector_209" />
          <path d={svgPaths.p86bba00} fill="var(--fill-0, #FFE0B2)" id="Vector_210" />
          <path d={svgPaths.p16496c00} fill="var(--fill-0, #FFE0B2)" id="Vector_211" />
          <path d={svgPaths.p3b679e00} fill="var(--fill-0, #424242)" id="Vector_212" />
          <path d={svgPaths.pccaf800} fill="var(--fill-0, #FFE0B2)" id="Vector_213" />
          <path d={svgPaths.p1b35df00} fill="var(--fill-0, white)" id="Vector_214" />
          <path d={svgPaths.p1b5bf00} fill="var(--fill-0, #FFE0B2)" id="Vector_215" />
          <path d={svgPaths.p8fc9300} fill="var(--fill-0, #FFE0B2)" id="Vector_216" />
          <path d={svgPaths.p2736d370} fill="var(--fill-0, #FFE0B2)" id="Vector_217" />
          <path d={svgPaths.pd1f3e00} fill="var(--fill-0, #FFE0B2)" id="Vector_218" />
          <path d={svgPaths.p210c2bf0} fill="var(--fill-0, #FFE0B2)" id="Vector_219" />
          <path d={svgPaths.pa72cff2} fill="var(--fill-0, white)" id="Vector_220" />
          <path d={svgPaths.p29839500} fill="var(--fill-0, #FFE0B2)" id="Vector_221" />
          <path d={svgPaths.p33d9ea00} fill="var(--fill-0, #FFE0B2)" id="Vector_222" />
          <path d={svgPaths.p2b2f7a00} fill="var(--fill-0, #FFE0B2)" id="Vector_223" />
          <path d={svgPaths.p1a782100} fill="var(--fill-0, #FFE0B2)" id="Vector_224" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute right-[321px] size-[24px] top-[49px]" data-name="Icon">
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

export default function User() {
  return (
    <div className="bg-white relative size-full" data-name="User">
      <div className="absolute h-[869px] left-[-584px] top-[-41px] w-[1304px]" data-name="8-bit-graphics-pixels-scene-with-forest 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8BitGraphicsPixelsSceneWithForest.src as string} />
      </div>
      <div className="-translate-x-1/2 absolute bg-white h-[568px] left-[calc(50%-0.5px)] top-[208px] w-[329px]" />
      <StatusBar />
      <NavigationBar />
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-151px)] not-italic text-[20px] text-black top-[445.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">User information</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-151px)] not-italic text-[20px] text-black top-[584.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">General</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-147px)] not-italic text-[14px] text-black top-[614.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">language</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-147px)] not-italic text-[14px] text-black top-[646.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">Theme</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-147px)] not-italic text-[14px] text-black top-[676.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sound</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[17px] justify-center leading-[0] left-[calc(50%-147px)] not-italic text-[14px] text-black top-[708.5px] w-[159px]">
        <p className="leading-[20px] whitespace-pre-wrap">privacy</p>
      </div>
      <Frame2 />
      <div className="-translate-x-1/2 absolute h-[36px] left-[calc(50%+0.5px)] top-[263px] w-[107px]">
        <div className="absolute inset-[-38.89%_-13.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135 64">
            <g filter="url(#filter0_f_1_2715)" id="Ellipse 80">
              <ellipse cx="67.5" cy="32" fill="var(--fill-0, black)" fillOpacity="0.35" rx="53.5" ry="18" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="64" id="filter0_f_1_2715" width="135" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_2715" stdDeviation="7" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Group />
      <Group1 />
      <User1 />
      <div className="-translate-x-1/2 absolute h-[95px] left-[calc(50%-3.5px)] top-[461px] w-[295px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 295 95">
          <path d="M0 0H295V95H0V0Z" fill="var(--fill-0, #D9D9D9)" id="Rectangle 2783" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['ABeeZee:Regular',sans-serif] h-[57px] justify-center leading-[0] left-[calc(50%-67px)] not-italic text-[16px] text-black top-[503.5px] w-[128px]">
        <p className="leading-[20px] whitespace-pre-wrap">User information</p>
      </div>
      <Icon />
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[569px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[601px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-[calc(50%+1px)] top-[695px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-[calc(50%-2px)] top-[631px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-[calc(50%-1px)] top-[725px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-[calc(50%-1px)] top-[663px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[757px] w-[326px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 1">
            <line id="Line 304" stroke="var(--stroke-0, #555555)" strokeOpacity="0.1" x2="326" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}