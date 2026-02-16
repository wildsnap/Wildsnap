import { X, Zap } from 'lucide-react';
import { useState } from 'react';

interface ScanScreenProps {
  onClose: () => void;
  onAnimalDetected: () => void;
}

export function ScanScreen({ onClose, onAnimalDetected }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      onAnimalDetected();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera View Simulation */}
      <div className="relative flex-1 bg-gradient-to-b from-[#4A5568] to-[#2D3748] overflow-hidden">
        {/* Camera feed placeholder */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        {/* Scanning Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[280px] h-[280px]">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#00D66F] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#00D66F] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#00D66F] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#00D66F] rounded-br-lg" />
            
            {/* Scanning line animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-[#00D66F] shadow-[0_0_10px_2px_rgba(0,214,111,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
            )}
            
            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#FFC800] -translate-y-1/2" />
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#FFC800] -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-12 h-12 bg-[#FF4757] border-3 border-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <X className="w-6 h-6 text-white" strokeWidth={3} />
            </button>
            
            <div className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              {isScanning ? 'SCANNING...' : 'READY'}
            </div>
          </div>
        </div>

        {/* Bottom Instructions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pb-32">
          <div className="text-center">
            <p className="font-['Nunito'] text-white text-lg font-bold mb-2">
              Point camera at an animal
            </p>
            <p className="font-['Nunito'] text-white/80 text-sm">
              Line up the animal in the frame
            </p>
          </div>
        </div>
      </div>

      {/* Scan Button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`
            w-20 h-20 rounded-full border-4 border-white
            flex items-center justify-center
            transition-all duration-200
            ${isScanning 
              ? 'bg-[#FFC800] animate-pulse' 
              : 'bg-[#00D66F] active:scale-90 shadow-[0_0_20px_4px_rgba(0,214,111,0.6)]'
            }
          `}
        >
          <Zap 
            className="w-10 h-10 text-white" 
            fill="white" 
            strokeWidth={3}
          />
        </button>
      </div>

      {/* Custom scan animation */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
      `}</style>
    </div>
  );
}
