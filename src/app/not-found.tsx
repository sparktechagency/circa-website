'use client'
import { ArrowLeft, Ghost, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Next.js 13+ Not Found Component (Dark Theme)
 * Optimized for app/not-found.js
 */
export default function App() {
  const [mounted, setMounted] = useState(false);

  // Handle mounting state for hydration consistency
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen  flex items-center justify-center p-6 font-sans text-slate-200">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Visual Illustration Area */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-blue-500 blur-3xl rounded-full opacity-10 transform -translate-y-8"></div>
          <div className="relative animate-bounce duration-[2000ms]">
            <Ghost size={120} className="text-blue-400 opacity-90" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error Messaging */}
        <div className="space-y-4">
          <h1 className="text-9xl font-black text-slate-800 tracking-tighter select-none bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-900">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Lost in the void?
          </h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            The page you're looking for has drifted out of orbit. Let's get you back to safety.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            Return Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}