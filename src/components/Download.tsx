import Image from 'next/image';
import Link from 'next/link';

export default function Download() {
  return (
    <section id="download" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[rgba(20,20,20,1)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,149,0,0.15),transparent_70%)] z-0"></div>
      <div className="grid-pattern opacity-20"></div>
      <div className="dot-pattern opacity-15"></div>
      
      {/* Glowing circles */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[rgba(255,149,0,0.05)] to-transparent blur-[100px]"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-to-tl from-[rgba(255,149,0,0.08)] to-transparent blur-[80px]"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Decorative accent line */}
            <div className="absolute -left-6 top-0 w-[1px] h-20 bg-gradient-to-b from-[rgba(255,149,0,0.7)] to-transparent"></div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              Join the WaoCard <span className="gradient-text">Revolution</span>
            </h2>
            <p className="text-[rgba(255,255,255,0.8)] text-lg md:text-xl mb-10 leading-relaxed">
              Experience the future of payments, identity, and access in Africa. Download WaoCard today and start your journey to financial freedom.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-12">
              <Link href="#google-play">
                <span className="glass-panel bg-[rgba(255,255,255,0.97)] text-[#FF9500] px-6 py-4 rounded-xl flex items-center gap-3 hover:bg-white transition-all group relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 20.5a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5l14 8a.5.5 0 010 .9l-14 8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-[rgba(0,0,0,0.6)]">GET IT ON</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </div>
                </span>
              </Link>
              
              <Link href="#business-download">
                <span className="glass-panel border border-[rgba(255,255,255,0.1)] text-white px-6 py-4 rounded-xl flex items-center gap-3 hover:border-[rgba(255,149,0,0.3)] transition-all duration-300 group">
                  <div className="text-3xl text-[#FF9500] group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 14h-6.5c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5H21c.83 0 1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-5 6.5v-5h5v5h-5zM10 3H3c-.83 0-1.5.67-1.5 1.5v14c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5v-14C11.5 3.67 10.83 3 10 3zm0 15.5H3v-14h7v14z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">DISCOVER</div>
                    <div className="font-bold group-hover:text-[#FF9500] transition-colors duration-300">For Business</div>
                  </div>
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-orange-500 ring-2 ring-black">
                  👨🏾
                </div>
                <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-orange-500 ring-2 ring-black">
                  👩🏾
                </div>
                <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-orange-500 ring-2 ring-black">
                  👩🏽
                </div>
                <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-orange-500 ring-2 ring-black">
                  👨🏿
                </div>
              </div>
              <div>
                <p className="font-medium text-[rgba(255,255,255,0.9)]">
                  Joined by <span className="text-[#FF9500] font-bold">1M+</span> users across Africa
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent mt-1"></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Tilted backdrop panels */}
            <div className="absolute inset-x-4 inset-y-8 bg-[rgba(255,255,255,0.02)] rounded-2xl transform rotate-6 border border-[rgba(255,255,255,0.05)]"></div>
            <div className="absolute inset-x-6 inset-y-6 bg-[rgba(255,255,255,0.03)] rounded-2xl transform -rotate-3 border border-[rgba(255,255,255,0.05)]"></div>
            
            {/* Main content card */}
            <div className="glass-panel p-8 relative">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-6 h-[1px] bg-gradient-to-r from-[#FF9500] to-transparent mr-3"></span>
                Download Now
              </h3>
              
              <div className="grid gap-6 mb-10">
                <div className="flex gap-4 items-center p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,149,0,0.2)] transition-colors group">
                  <div className="text-2xl text-[#FF9500] group-hover:scale-110 transition-transform duration-300">💳</div>
                  <div>
                    <div className="font-medium text-white">All cards in one place</div>
                    <div className="text-sm text-[rgba(255,255,255,0.6)]">Payment, loyalty, access & more</div>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,149,0,0.2)] transition-colors group">
                  <div className="text-2xl text-[#FF9500] group-hover:scale-110 transition-transform duration-300">🔐</div>
                  <div>
                    <div className="font-medium text-white">Bank-level security</div>
                    <div className="text-sm text-[rgba(255,255,255,0.6)]">Your data is always protected</div>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,149,0,0.2)] transition-colors group">
                  <div className="text-2xl text-[#FF9500] group-hover:scale-110 transition-transform duration-300">📶</div>
                  <div>
                    <div className="font-medium text-white">Works offline</div>
                    <div className="text-sm text-[rgba(255,255,255,0.6)]">No internet? No problem!</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,149,0,0.1)]">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-[#FF9500]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-[rgba(255,255,255,0.9)]">4.8/5 from <span className="text-[#FF9500]">10,000+</span> reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}