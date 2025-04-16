import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CardTypes from '@/components/CardTypes';
import HowItWorks from '@/components/HowItWorks';
import Markets from '@/components/Markets';
import Business from '@/components/Business';
import Testimonials from '@/components/Testimonials';
import Download from '@/components/Download';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans">
      <Head>
        <title>WaoCard - Wao Your World</title>
        <meta name="description" content="The leading digital wallet platform in Africa, enabling financial inclusion, facilitating digital payments, and providing secure storage for payment instruments, identification, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header 
        scrolled={scrolled} 
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main>
        <Hero />
        <Features />
        <CardTypes />
        <HowItWorks />
        <Business />
        <Markets />
        <Testimonials />
        <Download />
      </main>

      <Footer />
    </div>
  );
}