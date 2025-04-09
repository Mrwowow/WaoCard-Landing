import Link from 'next/link';
import Image from "next/image";

interface HeaderProps {
  scrolled: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ scrolled, toggleMobileMenu }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full py-5 px-6 md:px-12 lg:px-24 transition-all duration-500 ${
      scrolled ? 'glass-panel !bg-[rgba(0,0,0,0.8)] backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#000000] to-[#00000] text-white font-bold flex items-center justify-center rounded-lg glow-effect">
          <Image 
                    src="/logo.svg" 
                    alt="WaoBiz Logo" 
                    fill
                    className="object-contain"
                  />
          </div>
          <span className="text-2xl font-bold gradient-text">WaoCard</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features">
            <span className="font-medium text-white hover:text-[#FF9500] transition-colors duration-300 cursor-pointer opacity-90 hover:opacity-100">Features</span>
          </Link>
          <Link href="#cards">
            <span className="font-medium text-white hover:text-[#FF9500] transition-colors duration-300 cursor-pointer opacity-90 hover:opacity-100">Cards</span>
          </Link>
          <Link href="#business">
            <span className="font-medium text-white hover:text-[#FF9500] transition-colors duration-300 cursor-pointer opacity-90 hover:opacity-100">Business</span>
          </Link>
          <Link href="#markets">
            <span className="font-medium text-white hover:text-[#FF9500] transition-colors duration-300 cursor-pointer opacity-90 hover:opacity-100">Markets</span>
          </Link>
          <Link href="#download">
            <span className="btn btn-primary">Get Started</span>
          </Link>
        </nav>
        
        <button 
          className="md:hidden text-2xl text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        
        {/* Decorative dot pattern */}
        <div className="absolute -right-6 -bottom-20 w-32 h-32 dot-pattern opacity-30 rounded-full"></div>
      </div>
    </header>
  );
}