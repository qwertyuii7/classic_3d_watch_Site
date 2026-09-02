'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WatchHero from './components/WatchHero';
import MechanicalScroll from './components/MechanicalScroll';
import MaterialsSection from './components/MaterialsSection';
import ThreeDHoverGallery from './components/lightswind/3d-hover-gallery';
import ThreeDSmokeyFrame from './components/lightswind/3d-smokey-frame';

const collectionItems = [
  { url: '/assets/collection/1.png', title: 'The Chronograph', category: 'Precision', description: 'Rose Gold & Alligator Strap' },
  { url: '/assets/collection/2.png', title: 'The Diver', category: 'Exploration', description: 'Stainless Steel & Rubber Strap' },
  { url: '/assets/collection/3.png', title: 'The Aviator', category: 'Heritage', description: 'Titanium & Leather Strap' },
  { url: '/assets/collection/4.png', title: 'The Dress Watch', category: 'Elegance', description: 'Platinum & Velvet Strap' },
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/10 py-6">
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-light tracking-wide">{question}</span>
        <span className="text-[#c9a876] text-2xl font-light">{isOpen ? '-' : '+'}</span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const faqs = [
  { q: "What is the warranty period?", a: "Every Aurum timepiece comes with a comprehensive 5-year international warranty covering all manufacturing defects." },
  { q: "How often should I service my watch?", a: "We recommend a full service every 4 to 5 years to ensure the mechanical movement maintains optimal precision." },
  { q: "Are the watches water-resistant?", a: "Yes, the Heritage Collection is water-resistant up to 100 meters (10 ATM), suitable for swimming and snorkeling." },
  { q: "Do you ship internationally?", a: "We offer complimentary secure shipping worldwide via our specialized luxury courier partners." },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Global reveal animation
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.gsap-reveal');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <main className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      <WatchHero />
      
      <div ref={containerRef}>
        {/* 1. COLLECTION SECTION */}
        <section className="py-32 px-6 md:px-12 gsap-reveal">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">The Collection</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-20 text-center font-light">Four Ways to Wear Time</h2>
            <div className="w-full">
              <ThreeDHoverGallery items={collectionItems} itemHeight={550} hoverScale={1.05} />
            </div>
          </div>
        </section>

        {/* 2. LIFESTYLE SECTION */}
        <section className="py-32 px-6 md:px-12 bg-zinc-950 gsap-reveal">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 h-[700px] w-full overflow-hidden rounded-sm">
              <img 
                src="/assets/handwithawatch/Gemini_Generated_Image_8avcmj8avcmj8avc.png" 
                alt="Watch on wrist" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 md:pl-12">
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">Lifestyle</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight font-light">Mastery in <br/>Every Moment.</h2>
              <p className="text-lg text-gray-400 leading-relaxed font-light mb-10 max-w-md">
                Designed for those who appreciate the finer details. Whether in the boardroom or the depths of the ocean, the Heritage Collection adapts to your lifestyle.
              </p>
              <button className="border-b border-[#c9a876] text-[#c9a876] pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs">
                Explore the Design
              </button>
            </div>
          </div>
        </section>

        {/* 3. MECHANICAL SCROLL (NEW) */}
        <MechanicalScroll />

        {/* 4. CRAFTSMANSHIP SECTION */}
        <section className="py-32 px-6 md:px-12 bg-black gsap-reveal">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">Craftsmanship</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 font-light">A Symphony of Gears</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light mb-12 max-w-md">
                Over 300 individual components are meticulously assembled by hand. The beating heart of our timepieces reveals an uncompromising dedication to horological excellence.
              </p>
            </div>
            <div className="h-[600px]">
              <ThreeDSmokeyFrame frameColor="#c9a876" frameWidth={0.1} intensity={0.5} radius="0px">
                <img src="/assets/craftsmanship.jpg" alt="Watch Craftsmanship" className="w-full h-full object-cover" />
              </ThreeDSmokeyFrame>
            </div>
          </div>
        </section>

        {/* 5. STICKY MATERIALS SECTION (Replaced Carousel) */}
        <MaterialsSection />

        {/* 6. QUOTE / DIVIDER SECTION */}
        <section className="relative py-48 flex items-center justify-center text-center px-6 bg-black gsap-reveal">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="w-px h-16 bg-[#c9a876] mx-auto mb-12" />
            <h3 className="text-4xl md:text-5xl font-serif leading-relaxed italic text-white font-light">
              "Time is the ultimate luxury. We merely give it a beautiful home."
            </h3>
            <div className="w-px h-16 bg-[#c9a876] mx-auto mt-12" />
          </div>
        </section>

        {/* 7. PACKAGING / CTA SECTION */}
        <section className="py-32 px-6 md:px-12 bg-zinc-950 gsap-reveal">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center w-full order-2 md:order-1 px-4 md:px-0">
              <img 
                src="/assets/watch_box/Gemini_Generated_Image_jqzvnjjqzvnjjqzv.png" 
                alt="Presentation Box" 
                className="w-full max-w-lg rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
            <div className="order-1 md:order-2 md:pl-16">
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">The Presentation</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 text-white font-light">Make It Yours</h2>
              <p className="text-lg text-gray-400 mb-12 font-light leading-relaxed max-w-md">
                Delivered in a bespoke presentation box carved from sustainable walnut, lined with midnight velvet. A true collector's piece.
              </p>
              <button className="bg-[#c9a876] text-black px-12 py-5 rounded-sm text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors">
                Reserve Now
              </button>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="py-32 px-6 md:px-12 bg-black gsap-reveal">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">Support</span>
              <h2 className="text-5xl font-serif font-light">Questions & Answers</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-white/10 pb-6">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-4 hover:text-[#c9a876] transition-colors"
                  >
                    <span className="font-serif text-2xl font-light">{faq.q}</span>
                    <span className="text-2xl font-light">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-400 font-light leading-relaxed pt-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. REQUEST A QUOTE */}
        <section className="py-32 px-6 md:px-12 bg-zinc-950 gsap-reveal">
          <div className="max-w-3xl mx-auto bg-black p-12 md:p-20 border border-white/5 rounded-sm shadow-2xl">
            <div className="text-center mb-12">
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-4 block">Concierge</span>
              <h2 className="text-4xl font-serif font-light mb-4">Request a Consultation</h2>
              <p className="text-gray-400 font-light">Speak with our advisors to configure your perfect timepiece.</p>
            </div>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#c9a876] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#c9a876] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#c9a876] transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Interested Model</label>
                <select className="w-full bg-black border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#c9a876] transition-colors appearance-none">
                  <option>The Chronograph</option>
                  <option>The Diver</option>
                  <option>The Aviator</option>
                  <option>The Dress Watch</option>
                </select>
              </div>
              <button className="w-full bg-white text-black py-5 mt-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#c9a876] transition-colors">
                Submit Request
              </button>
            </form>
          </div>
        </section>

        {/* 10. NEWSLETTER & FOOTER */}
        <footer className="bg-black pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Join the Inner Circle</h2>
            <p className="text-gray-400 font-light mb-10 max-w-md">
              Subscribe to receive exclusive news, private event invitations, and early access to new collections.
            </p>
            <div className="flex w-full max-w-md border-b border-white/30 pb-2 mb-24">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent flex-grow text-white outline-none placeholder-gray-600 font-light"
              />
              <button className="text-[#c9a876] uppercase tracking-widest text-xs hover:text-white transition-colors">
                Subscribe
              </button>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs tracking-widest uppercase">
              <p>&copy; 2026 Aurum Genève. All Rights Reserved.</p>
              <div className="flex space-x-8 mt-6 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Journal</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
