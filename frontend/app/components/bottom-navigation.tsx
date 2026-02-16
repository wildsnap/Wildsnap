import { Camera, Grid3x3, User, ShoppingBag } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'scan' | 'collection' | 'avatar' | 'shop';
  onTabChange: (tab: 'scan' | 'collection' | 'avatar' | 'shop') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'scan' as const, icon: Camera, label: 'Scan' },
    { id: 'collection' as const, icon: Grid3x3, label: 'Dex' },
    { id: 'avatar' as const, icon: User, label: 'Avatar' },
    { id: 'shop' as const, icon: ShoppingBag, label: 'Shop' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#754F26] border-t-4 border-[#2C2C2C] shadow-[0_-4px_0_0_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex-1 flex flex-col items-center gap-1 py-2 min-h-[64px] justify-center
                  transition-all duration-200 active:scale-95
                  ${isActive 
                    ? 'bg-[#FFC800] text-[#2C2C2C] shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)]' 
                    : 'text-white hover:bg-[#8B6332]'
                  }
                  border-4 border-[#2C2C2C] rounded-lg
                `}
              >
                <Icon 
                  className={`w-6 h-6 ${isActive ? 'animate-[bounce_0.6s_ease-in-out]' : ''}`} 
                  strokeWidth={3}
                />
                <span className="font-['Nunito'] text-xs font-bold tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}