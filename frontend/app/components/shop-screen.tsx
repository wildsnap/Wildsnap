import { Coins, ShoppingCart } from 'lucide-react';

interface ShopItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: 'coin' | 'character' | 'pet';
  special?: boolean;
  bonus?: string;
}

interface ShopScreenProps {
  userCoins: number;
  onPurchase: (itemId: number) => void;
}

const shopItems: ShopItem[] = [
  { id: 1, name: 'Coin Pack', price: 100, emoji: '💰', category: 'coin', special: true, bonus: '10 + 1 FREE' },
  { id: 2, name: 'Mega Coins', price: 250, emoji: '💰', category: 'coin' },
  { id: 3, name: 'Luffy Hat', price: 150, emoji: '🎩', category: 'character' },
  { id: 4, name: 'Travel Case', price: 220, emoji: '🧳', category: 'character' },
  { id: 5, name: 'Red Shoes', price: 180, emoji: '👟', category: 'character' },
  { id: 6, name: 'Cool Hat', price: 140, emoji: '🎩', category: 'character' },
  { id: 7, name: 'Sunglasses', price: 250, emoji: '🕶️', category: 'character' },
  { id: 8, name: 'Gold Chain', price: 340, emoji: '📿', category: 'character' },
];

export function ShopScreen({ userCoins, onPurchase }: ShopScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#754F26] to-[#8B6332] pb-20">
      {/* Header */}
      <header className="bg-[#513418] border-b-4 border-[#2C2C2C] px-4 py-6 shadow-[0_4px_0_0_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-['Press_Start_2P'] text-xl text-[#FFC800] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            SHOP
          </h1>
          <div className="flex items-center gap-2 bg-[#FFC800] border-3 border-[#2C2C2C] rounded-full px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]">
            <Coins className="w-5 h-5 text-[#2C2C2C]" strokeWidth={3} />
            <span className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
              {userCoins}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[#FFC800] border-3 border-[#2C2C2C] rounded-lg py-2 shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]">
            <span className="font-['Nunito'] text-sm font-bold text-[#2C2C2C]">
              💰 Coin
            </span>
          </button>
          <button className="flex-1 bg-[#754F26] border-3 border-[#2C2C2C] rounded-lg py-2 hover:bg-[#8B6332] transition-colors">
            <span className="font-['Nunito'] text-sm font-bold text-white">
              👤 Character
            </span>
          </button>
          <button className="flex-1 bg-[#754F26] border-3 border-[#2C2C2C] rounded-lg py-2 hover:bg-[#8B6332] transition-colors">
            <span className="font-['Nunito'] text-sm font-bold text-white">
              🐾 Pet
            </span>
          </button>
        </div>
      </header>

      {/* Shop Items */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Special Offer */}
          {shopItems.filter(item => item.special).map(item => (
            <div key={item.id} className="relative">
              <div className="absolute -top-2 left-4 bg-[#FF4757] border-3 border-[#2C2C2C] rounded-full px-3 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] z-10">
                <span className="font-['Press_Start_2P'] text-xs text-white">
                  SPECIAL
                </span>
              </div>
              <div className="bg-gradient-to-r from-[#FFC800] to-[#FFD700] border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-['Nunito'] text-lg font-bold text-[#2C2C2C]">
                        {item.name}
                      </p>
                      <p className="font-['Press_Start_2P'] text-xs text-[#FF4757] mt-1">
                        {item.bonus}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onPurchase(item.id)}
                    className="
                      bg-white
                      border-3 border-[#2C2C2C]
                      rounded-xl
                      px-4 py-3
                      shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]
                      active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]
                      active:translate-x-0.5 active:translate-y-0.5
                      transition-all
                      hover:bg-[#FFF9E6]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-[#FFC800]" strokeWidth={3} />
                      <span className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
                        {item.price}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Items */}
          <div className="grid grid-cols-1 gap-3">
            {shopItems.filter(item => !item.special).slice(0, 1).map(item => (
              <div
                key={item.id}
                className="bg-white border-4 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">
                      {item.emoji}
                    </div>
                    <p className="font-['Nunito'] font-bold text-[#2C2C2C]">
                      {item.name}
                    </p>
                  </div>
                  <button
                    onClick={() => onPurchase(item.id)}
                    className="
                      bg-[#00D66F]
                      border-3 border-[#2C2C2C]
                      rounded-lg
                      px-3 py-2
                      shadow-[3px_3px_0_0_rgba(0,0,0,0.25)]
                      active:shadow-[1.5px_1.5px_0_0_rgba(0,0,0,0.25)]
                      active:translate-x-0.5 active:translate-y-0.5
                      transition-all
                      hover:bg-[#00F47F]
                    "
                  >
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-white" strokeWidth={3} />
                      <span className="font-['Press_Start_2P'] text-xs text-white">
                        {item.price}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grid Items */}
          <div className="grid grid-cols-3 gap-3">
            {shopItems.filter(item => !item.special).slice(1).map(item => {
              const canAfford = userCoins >= item.price;
              
              return (
                <button
                  key={item.id}
                  onClick={() => canAfford && onPurchase(item.id)}
                  disabled={!canAfford}
                  className={`
                    aspect-square rounded-xl border-4 border-[#2C2C2C]
                    flex flex-col items-center justify-between p-3
                    transition-all
                    ${canAfford
                      ? 'bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.25)] active:scale-95'
                      : 'bg-[#E0E0E0] opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="text-3xl">
                    {item.emoji}
                  </div>
                  <div className="text-center w-full">
                    <p className="font-['Nunito'] text-[10px] font-bold text-[#2C2C2C] mb-1 leading-tight">
                      {item.name}
                    </p>
                    <div className={`
                      flex items-center justify-center gap-1 
                      ${canAfford ? 'bg-[#00D66F]' : 'bg-[#9E9E9E]'}
                      border-2 border-[#2C2C2C] rounded-full px-2 py-1
                    `}>
                      <Coins className="w-3 h-3 text-white" strokeWidth={3} />
                      <span className="font-['Press_Start_2P'] text-[8px] text-white">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
