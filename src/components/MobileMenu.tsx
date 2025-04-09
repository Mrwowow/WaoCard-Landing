import { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xl bg-[rgba(0,0,0,0.9)] p-6 overflow-auto">
      {/* Grid background effect */}
      <div className="grid-pattern opacity-10"></div>
      
      {/* Glowing dot pattern */}
      <div className="dot-pattern opacity-10"></div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24">
        <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
        <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24">
        <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF9500] to-[#E08600] text-white font-bold flex items-center justify-center rounded-lg glow-effect">
              W
            </div>
            <span className="text-2xl font-bold gradient-text">WaoCard</span>
          </div>
          <button 
            onClick={onClose}
            className="text-2xl text-white p-2 hover:text-[#FF9500] transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex flex-col gap-8 mb-12">
          <Link href="#features" onClick={onClose}>
            <span className="text-xl font-medium block py-4 border-b border-[rgba(255,255,255,0.1)] text-white hover:text-[#FF9500] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#FF9500] rounded-full mr-3"></span>
              Features
            </span>
          </Link>
          <Link href="#cards" onClick={onClose}>
            <span className="text-xl font-medium block py-4 border-b border-[rgba(255,255,255,0.1)] text-white hover:text-[#FF9500] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#FF9500] rounded-full mr-3"></span>
              Cards
            </span>
          </Link>
          <Link href="#business" onClick={onClose}>
            <span className="text-xl font-medium block py-4 border-b border-[rgba(255,255,255,0.1)] text-white hover:text-[#FF9500] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#FF9500] rounded-full mr-3"></span>
              Business
            </span>
          </Link>
          <Link href="#markets" onClick={onClose}>
            <span className="text-xl font-medium block py-4 border-b border-[rgba(255,255,255,0.1)] text-white hover:text-[#FF9500] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#FF9500] rounded-full mr-3"></span>
              Markets
            </span>
          </Link>
        </nav>
        
        <div className="flex flex-col items-center">
          <Link href="#download" onClick={onClose}>
            <span className="btn btn-primary w-full text-center">Get Started</span>
          </Link>
          
          <div className="mt-12 text-center">
            <div className="text-[rgba(255,255,255,0.5)] text-sm mb-2">Join thousands of users across Africa</div>
            <div className="flex justify-center gap-6">
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,149,0,0.2)] hover:text-[#FF9500] transition-all">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,149,0,0.2)] hover:text-[#FF9500] transition-all">
                <span className="text-xs">TW</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,149,0,0.2)] hover:text-[#FF9500] transition-all">
                <span className="text-xs">IG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}