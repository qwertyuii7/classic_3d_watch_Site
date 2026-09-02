'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const textureItems = [
  { src: '/assets/textures/steel.png', title: 'Surgical Grade Steel', desc: 'Hand-polished 316L stainless steel offering unparalleled corrosion resistance and a brilliant, lasting luster.' },
  { src: '/assets/textures/sapphire.png', title: 'Bespoke Leather', desc: 'Sourced from the finest Italian tanneries, our full-grain leather straps age beautifully, developing a unique patina.' },
  { src: '/assets/textures/leather.png', title: 'Sapphire Crystal', desc: 'Virtually scratch-proof synthetic sapphire, treated with seven layers of anti-reflective coating for perfect clarity.' },
];

export default function MaterialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageColRef = useRef<HTMLDivElement>(null);

  // Preload all 3 images on mount
  useEffect(() => {
    textureItems.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Main scroll handler: manually implements sticky behavior using
  // position:fixed, which works even when Lenis applies transform
  // to the html/body. Also picks which texture image is active.
  const onScroll = useCallback(() => {
    if (!sectionRef.current || !imageColRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const colWidth = imageColRef.current.offsetWidth;
    const vh = window.innerHeight;

    // --- Sticky logic via position switching ---
    if (sectionRect.top >= 0) {
      // Section hasn't reached top yet: image sits at top of section
      setImageStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        width: colWidth,
        height: vh,
      });
    } else if (sectionRect.bottom <= vh) {
      // Section has scrolled past: image sits at bottom of section
      setImageStyle({
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: colWidth,
        height: vh,
      });
    } else {
      // Section is in the middle: image is fixed to viewport
      setImageStyle({
        position: 'fixed',
        top: 0,
        left: sectionRect.left,
        width: colWidth,
        height: vh,
      });
    }

    // --- Active material: whichever panel center is closest to viewport center ---
    const viewportCenter = vh / 2;
    let closest = 0;
    let closestDist = Infinity;

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const dist = Math.abs(viewportCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(prev => (prev !== closest ? closest : prev));
  }, []);

  useEffect(() => {
    // Use rAF loop to poll — immune to Lenis transform issues
    let rafId: number;
    const tick = () => {
      onScroll();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onScroll]);

  return (
    <section ref={sectionRef} className="relative w-full bg-zinc-950">
      <div className="flex flex-col md:flex-row">
        {/* LEFT: Placeholder column to reserve space */}
        <div ref={imageColRef} className="hidden md:block md:w-1/2 flex-shrink-0" style={{ minHeight: '300vh' }} />

        {/* LEFT: The actual image panel (manually sticky via JS) */}
        <div
          className="hidden md:flex items-center justify-center bg-zinc-950 z-30"
          style={imageStyle}
        >
          <div className="relative w-[80%] max-w-[420px] aspect-square rounded overflow-hidden border border-white/10 shadow-2xl">
            {textureItems.map((item, idx) => (
              <img
                key={idx}
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: 'opacity 0.7s ease-in-out',
                }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Mobile: non-sticky image at top */}
        <div className="md:hidden w-full h-[50vh] flex items-center justify-center bg-zinc-950">
          <div className="relative w-[80%] max-w-[320px] aspect-square rounded overflow-hidden border border-white/10 shadow-2xl">
            {textureItems.map((item, idx) => (
              <img
                key={idx}
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: 'opacity 0.7s ease-in-out',
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Scrolling text panels */}
        <div className="w-full md:w-1/2">
          {textureItems.map((item, idx) => (
            <div
              key={idx}
              ref={el => { panelRefs.current[idx] = el; }}
              className="min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-28"
            >
              <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block font-light">
                0{idx + 1} // Material
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 font-light leading-tight">
                {item.title}
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-md">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
