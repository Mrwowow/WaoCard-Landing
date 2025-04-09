import { motion } from 'framer-motion';

interface Market {
  code: string;
  flag: string;
  name: string;
}

export default function Markets() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  const primaryMarkets: Market[] = [
    { code: "NG", flag: "🇳🇬", name: "Nigeria" },
    { code: "KE", flag: "🇰🇪", name: "Kenya" },
    { code: "GH", flag: "🇬🇭", name: "Ghana" },
    { code: "ZA", flag: "🇿🇦", name: "South Africa" }
  ];
  
  const upcomingMarkets: Market[] = [
    { code: "EG", flag: "🇪🇬", name: "Egypt" },
    { code: "UG", flag: "🇺🇬", name: "Uganda" },
    { code: "TZ", flag: "🇹🇿", name: "Tanzania" },
    { code: "RW", flag: "🇷🇼", name: "Rwanda" },
    { code: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
    { code: "SN", flag: "🇸🇳", name: "Senegal" }
  ];

  return (
    <section id="markets" className="section relative overflow-hidden">
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="section-title">
          Available <span className="gradient-text">Markets</span>
        </h2>
        <p className="section-subtitle">
          WaoCard is expanding across Africa, bringing digital wallet solutions to new regions
        </p>
        
        <div className="mb-20">
          <h3 className="text-xl font-bold mb-10 text-center relative inline-flex items-center">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.7)] to-transparent mr-4"></span>
            Currently Available In
            <span className="w-12 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.7)] to-transparent ml-4"></span>
          </h3>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {primaryMarkets.map((market) => (
              <motion.div 
                key={market.code} 
                className="glass-panel p-6 rounded-xl flex items-center gap-4 group hover:border-[rgba(255,149,0,0.3)] transition-colors duration-300 relative"
                variants={itemVariants}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-[1px] h-4 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  <div className="absolute top-0 right-0 w-4 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                </div>
                
                <div className="text-3xl relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[rgba(255,149,0,0.2)] to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-700"></div>
                  <span className="relative z-10">{market.flag}</span>
                </div>
                <div>
                  <span className="font-medium text-white group-hover:text-[#FF9500] transition-colors duration-300">{market.name}</span>
                  <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#FF9500] to-transparent transition-all duration-500 mt-1"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-10 text-center relative inline-flex items-center">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.7)] to-transparent mr-4"></span>
            Coming Soon
            <span className="w-12 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.7)] to-transparent ml-4"></span>
          </h3>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {upcomingMarkets.map((market) => (
              <motion.div 
                key={market.code} 
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] p-6 rounded-xl flex items-center gap-4 group hover:border-[rgba(255,149,0,0.15)] transition-colors duration-300"
                variants={itemVariants}
              >
                <div className="text-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">{market.flag}</div>
                <div>
                  <span className="font-medium text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors duration-300">{market.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] animate-pulse"></span>
                    <span className="text-xs text-[rgba(255,255,255,0.5)]">Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* World map overlay (subtle background) */}
      <div className="absolute inset-0 bg-[url('/images/world-map-dots.png')] bg-no-repeat bg-center opacity-5 pointer-events-none"></div>
      
      {/* Decorative diagonal line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </section>
  );
}