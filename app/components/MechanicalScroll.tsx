'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/frames_2/frame_${String(i).padStart(3, '0')}.jpg`;

export default function MechanicalScroll() {
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

  // GSAP setup
  useEffect(() => {
    if (!ready) return;

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
      
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-16 left-6 md:left-16 pointer-events-none z-20">
        <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-4 block">The Caliber</span>
        <h2 className="text-white font-serif text-5xl md:text-7xl font-light leading-tight">
          Microscopic <br/> Precision.
        </h2>
      </div>
    </div>
  );
}
