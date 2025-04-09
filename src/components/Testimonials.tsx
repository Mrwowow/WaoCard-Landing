import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  location: string;
  avatar: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: "WaoCard has completely changed how I manage my finances. I no longer carry multiple cards - everything is in one secure app!",
      author: "Ade Johnson",
      position: "Business Owner",
      location: "Lagos, Nigeria",
      avatar: "/testimonial-1.png"
    },
    {
      quote: "The offline functionality is a game-changer. I can still make payments even when network connectivity is poor in my area.",
      author: "Faith Mwangi",
      position: "Teacher",
      location: "Nairobi, Kenya",
      avatar: "/testimonial-2.png"
    },
    {
      quote: "As a business owner, WaoCard has simplified how I track expenses and accept payments. The business dashboard is incredibly useful.",
      author: "Samuel Osei",
      position: "Restaurant Owner",
      location: "Accra, Ghana",
      avatar: "/testimonial-3.png"
    },
    {
      quote: "Being able to store my digital IDs alongside my payment cards makes WaoCard essential for daily life in South Africa.",
      author: "Thandi Nkosi",
      position: "IT Professional",
      location: "Johannesburg, South Africa",
      avatar: "/testimonial-4.png"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="section-title text-white">
          What Our <span className="text-[#FF9500]">Users</span> Say
        </h2>
        <p className="section-subtitle text-gray-300">
          Join thousands of satisfied users across Africa
        </p>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-6">
                  <div className="text-center">
                    <div className="mb-6 text-xl italic">&ldquo;{testimonial.quote}&rdquo;</div>
                    
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    
                    <div className="font-bold text-lg">{testimonial.author}</div>
                    <div className="text-[#FF9500]">{testimonial.position}</div>
                    <div className="text-gray-400 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? 'bg-[#FF9500] w-6' : 'bg-gray-600'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}