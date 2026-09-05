'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center text-white font-sans px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-[#c9a876] text-xs uppercase tracking-[0.3em] mb-6 block">Unexpected Interruption</span>
        <h1 className="text-4xl md:text-5xl font-serif mb-8 font-light leading-tight">
          A Momentary Pause
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed font-light mb-12">
          We encountered an unexpected issue while assembling this page. Our artisans have been notified.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#c9a876] text-black px-12 py-5 rounded-sm text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
