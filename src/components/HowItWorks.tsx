interface Step {
  number: string;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Download",
      description: "Download the WaoCard app from your app store and install it on your device."
    },
    {
      number: "02",
      title: "Register",
      description: "Create your account with just your phone number and set up your secure PIN."
    },
    {
      number: "03",
      title: "Add Cards",
      description: "Add your payment cards, loyalty cards, tickets, and digital IDs to your wallet."
    },
    {
      number: "04",
      title: "Start Using",
      description: "Make payments, access locations, store tickets, and manage your digital life."
    }
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 left-20 w-60 h-60 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="section-title">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="section-subtitle">
          Get started with WaoCard in just a few simple steps
        </p>
        
        <div className="relative mt-20">
          {/* Connecting line with glow effect */}
          <div className="absolute hidden md:block top-24 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[rgba(255,149,0,0.5)] to-transparent z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                {/* Number circle with glow */}
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[rgba(255,149,0,0.2)] to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#E08600] text-white rounded-full flex items-center justify-center text-xl font-bold relative z-10">
                    {step.number}
                  </div>
                </div>
                
                {/* Step content with animated border */}
                <div className="glass-panel p-6 rounded-xl relative group-hover:border-[rgba(255,149,0,0.3)] transition-colors duration-300">
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-[1px] h-4 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                    <div className="absolute top-0 right-0 w-4 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[rgba(255,255,255,0.7)] max-w-xs">{step.description}</p>
                </div>
                
                {/* Connection dots for smaller screens */}
                {index < steps.length - 1 && (
                  <div className="md:hidden h-16 flex items-center justify-center my-4">
                    <div className="w-[2px] h-full bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative diagonal line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </section>
  );
}