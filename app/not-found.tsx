import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center text-white font-sans px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">Error 404</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-8 font-light leading-tight">
          Lost in Time
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed font-light mb-12">
          The page you are looking for has slipped out of our horological archives. 
          Please return to our collection to continue your journey.
        </p>
        <Link 
          href="/" 
          className="inline-block border-b border-[#c9a876] text-[#c9a876] pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
