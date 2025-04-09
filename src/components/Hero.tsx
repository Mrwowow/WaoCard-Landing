import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen hero-pattern flex items-center relative overflow-hidden">
      {/* Grid background effect */}
      <div className="grid-pattern"></div>
      
      {/* Glowing dot pattern */}
      <div className="dot-pattern"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Decorative glow element */}
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.2)] to-transparent blur-3xl"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              <span className="gradient-text">Wao</span> Your World
            </h1>
            
            <p className="text-[rgba(255,255,255,0.8)] text-lg md:text-xl mb-8 leading-relaxed">
              The leading digital wallet platform in Africa, enabling financial inclusion, 
              facilitating digital payments, and providing secure storage for payment 
              instruments, identification, and more.
            </p>
            
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                  💳
                </div>
                <span className="font-medium">Payment</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                  🪪
                </div>
                <span className="font-medium">Identity</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                  🔑
                </div>
                <span className="font-medium">Access</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-5">
              <Link href="#download">
                <span className="btn btn-primary flex items-center gap-2">
                  <span>Download App</span>
                </span>
              </Link>
              
              <Link href="#features">
                <span className="btn btn-secondary flex items-center gap-2">
                  <span>Learn More</span>
                  <span>→</span>
                </span>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative light circle */}
            <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.15)] to-transparent blur-3xl"></div>
            
            <div className="relative z-10 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[rgba(255,149,0,0.15)] to-transparent rounded-3xl blur-xl opacity-70"></div>
                <Image 
                  src="/phone-mockup.png" 
                  alt="WaoCard App"
                  width={300}
                  height={600}
                  className="max-w-[280px] drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
            
            <div className="absolute inset-0 z-0">
              {/* Floating Cards */}
              <div className="absolute top-[5%] -left-[10%] w-[200px] bg-gradient-to-br from-[#FF9500] to-[#FFB649] p-4 rounded-xl text-white floating-card floating-card-1 border border-[rgba(255,255,255,0.2)]">
                <div className="flex justify-between items-center mb-3">
                  <div className="w-8 h-5 bg-white/30 rounded"></div>
                  <span>WaoCard</span>
                </div>
                <div className="mb-3 text-sm tracking-wider">**** **** **** 9500</div>
                <div className="flex justify-between text-xs">
                  <span>J. Doe</span>
                  <span>04/28</span>
                </div>
              </div>
              
              <div className="absolute bottom-[15%] -left-[5%] w-[200px] glass-panel p-4 rounded-xl shadow-lg floating-card floating-card-2">
                <div className="flex justify-between items-center mb-3">
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <span className="text-blue-400 font-bold">VISA</span>
                </div>
                <div className="mb-3 text-sm tracking-wider">**** **** **** 1234</div>
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>J. Doe</span>
                  <span>09/26</span>
                </div>
              </div>
              
              <div className="absolute top-[25%] -right-[10%] w-[200px] glass-panel p-4 rounded-xl shadow-lg floating-card floating-card-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <span className="text-red-400 font-bold">MasterCard</span>
                </div>
                <div className="mb-3 text-sm tracking-wider">**** **** **** 5678</div>
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>J. Doe</span>
                  <span>12/27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative diagonal line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </section>
  );
}