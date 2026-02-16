import { Lock } from 'lucide-react';
import svgPaths from "../../imports/svg-h1mwi5uxqn";

interface Animal {
  id: number;
  name: string;
  locked: boolean;
  svg?: typeof svgPaths;
}

interface CollectionScreenProps {
  onAnimalClick: (id: number) => void;
}

// Pixel animal silhouettes (simplified)
const animals: Animal[] = [
  { id: 1, name: 'Bear', locked: false },
  { id: 2, name: 'Fox', locked: false },
  { id: 3, name: 'Rhino', locked: false },
  { id: 4, name: 'Deer', locked: false },
  { id: 5, name: 'Wolf', locked: false },
  { id: 6, name: 'Lion', locked: true },
  { id: 7, name: 'Tiger', locked: true },
  { id: 8, name: 'Elephant', locked: true },
  { id: 9, name: 'Giraffe', locked: true },
  { id: 10, name: 'Zebra', locked: true },
  { id: 11, name: 'Panda', locked: true },
  { id: 12, name: 'Koala', locked: true },
];

export function CollectionScreen({ onAnimalClick }: CollectionScreenProps) {
  const foundCount = animals.filter(a => !a.locked).length;
  const totalCount = animals.length;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F5F8F0] to-[#E8F5E9] pb-20">
      {/* Header */}
      <header className="bg-[#754F26] border-b-4 border-[#2C2C2C] px-4 py-6 shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
        <h1 className="font-['Press_Start_2P'] text-xl text-[#FFC800] text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
          ANIMAL DEX
        </h1>
        <div className="flex justify-center gap-2 mt-3">
          <div className="font-['Nunito'] text-white font-bold">
            {foundCount}/{totalCount} Found
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-4 bg-[#513418] border-3 border-[#2C2C2C] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00D66F] to-[#00F47F] transition-all duration-500"
            style={{ width: `${(foundCount / totalCount) * 100}%` }}
          />
        </div>
      </header>

      {/* Collection Grid */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => !animal.locked && onAnimalClick(animal.id)}
              disabled={animal.locked}
              className={`
                aspect-square rounded-xl border-4 border-[#2C2C2C]
                flex flex-col items-center justify-center gap-2 p-3
                transition-all duration-200
                ${animal.locked 
                  ? 'bg-[#9E9E9E] cursor-not-allowed shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]' 
                  : 'bg-white hover:bg-[#FFF9E6] active:scale-95 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]'
                }
              `}
            >
              {animal.locked ? (
                <>
                  <Lock className="w-8 h-8 text-[#616161]" strokeWidth={3} />
                  <div className="w-12 h-12 bg-[#757575] border-2 border-[#424242] rounded opacity-50" />
                </>
              ) : (
                <>
                  {/* Simplified pixel animal - using colored squares as placeholder */}
                  <div className="w-16 h-16 relative">
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                      <rect x="8" y="4" width="4" height="4" fill="#754F26" />
                      <rect x="20" y="4" width="4" height="4" fill="#754F26" />
                      <rect x="8" y="8" width="16" height="12" fill="#AA7A41" />
                      <rect x="8" y="20" width="4" height="8" fill="#754F26" />
                      <rect x="20" y="20" width="4" height="8" fill="#754F26" />
                      <rect x="10" y="10" width="2" height="2" fill="#2C2C2C" />
                      <rect x="20" y="10" width="2" height="2" fill="#2C2C2C" />
                    </svg>
                  </div>
                </>
              )}
              <div className="text-center">
                <span className="font-['Nunito'] text-xs font-bold text-[#2C2C2C] block">
                  #{animal.id.toString().padStart(3, '0')}
                </span>
                {!animal.locked && (
                  <span className="font-['Nunito'] text-[10px] text-[#754F26]">
                    {animal.name}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
