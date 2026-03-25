'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // redirect to home
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-full bg-[#0b0616] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        
        {/* Logo Box */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#cfd3ff] to-[#7f89ff] flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">↻</span>
        </div>

        {/* App Name */}
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Circa
        </h1>
      </div>
    </div>
  );
};

export default SplashPage;