'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/frames/frame_${String(i).padStart(3, '0')}.jpg`;

export default function WatchHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef({ frame: 1 });
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === FRAME_COUNT) setReady(true);
      };
      imgs.push(img);
    }
    images.current = imgs;
  }, []);

  // Lenis + GSAP setup
  useEffect(() => {
    if (!ready) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const render = () => {
      const img = images.current[Math.round(currentFrame.current.frame) - 1];
      if (!img?.complete) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      render();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const targetFrame = 1 + self.progress * (FRAME_COUNT - 1);
        gsap.to(currentFrame.current, {
          frame: targetFrame,
          duration: 0.3,
          overwrite: true,
          onUpdate: render,
        });
      },
    });

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      st.kill();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [ready]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full bg-black overflow-hidden">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <div className="text-[#c9a876] font-sans text-xs tracking-[0.3em] uppercase">
            Loading {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      {/* Clean, subtle gradient only at bottom for text readability, leaving center completely clear */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      
      {/* Brand name in top right corner */}
      <div className="absolute top-8 right-6 md:top-12 md:right-12 z-20 pointer-events-none flex flex-col items-end">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8d3a7] via-[#fff] to-[#c9a876] font-serif text-2xl md:text-4xl tracking-[0.3em] uppercase font-light drop-shadow-[0_0_15px_rgba(201,168,118,0.3)]">
          Aurum Genève
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c9a876]/50 to-transparent my-2" />
        <span className="text-[#c9a876]/80 font-sans text-[0.65rem] md:text-[0.7rem] tracking-[0.5em] uppercase font-medium">
          Maison Horlogère Since 1884
        </span>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 pointer-events-none">
        <p className="text-[#c9a876] font-sans text-xs tracking-[0.3em] uppercase mb-6">
          Timeless. Precise.
        </p>
        <h1 className="text-white font-serif text-6xl md:text-8xl leading-none tracking-tight">
          The Heritage <br /> Collection
        </h1>
      </div>
    </div>
  );
}
