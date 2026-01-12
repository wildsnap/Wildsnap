import { Home, Camera, ShoppingBag, User, Grid3x3 } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'collection', icon: Grid3x3, label: 'Collection' },
    { id: 'camera', icon: Camera, label: 'Scan' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isCameraButton = item.id === 'camera';

          if (isCameraButton) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center relative -top-4"
              >
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
