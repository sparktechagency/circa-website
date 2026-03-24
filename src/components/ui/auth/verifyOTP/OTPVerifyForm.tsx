'use client'
import { useState, useEffect, useRef, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

export default function OTPVerifyForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');

    if (pasteData.length > 0) {
      const newOtp = [...otp];
      pasteData.forEach((char: string, i: number) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);

      const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete verification code.');
      return;
    }

    setIsLoading(true);
    setError('');
    router.push("new-password")
    try {
      // Api call here

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(180);
    setIsExpired(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setIsLoading(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-[#0F0F0F] to-black text-white font-sans">
      <div className="w-full max-w-md">
        <div
          className="w-16 h-16  mx-auto rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: 'linear-gradient(145deg, #a89fe8, #7b6fd4)',
            boxShadow: '0 8px 24px rgba(123, 111, 212, 0.35)',
          }}
        >
          {/* Refresh / C icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M27 16c0 6.075-4.925 11-11 11S5 22.075 5 16 9.925 5 16 5c3.3 0 6.263 1.452 8.3 3.75"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M22 3.5L24.5 8.5L19.5 9"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

 <div className="text-center mb-8">
          {/* <Logo className="justify-center mb-8" /> */}
          <h1 className="text-4xl font-serif text-white mb-2">Verify OTP</h1>
          <p className="text-gray-400">Enter the code sent to your email (check Inbox or Spam)</p>
        </div>

        <div className="bg-[#141414] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-center text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Enter Verification Code
              </label>

              <div className="flex justify-between gap-2 md:gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el: any) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    disabled={isExpired || isLoading}
                    maxLength={1}
                    className={`w-full h-14 md:h-16 text-center text-2xl font-bold ${isExpired ? 'opacity-50' : ''
                      }`}
                  />
                ))}
              </div>
            </div>

            {isExpired ? (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>This code has expired</AlertDescription>
                </Alert>
                <Button variant="outline" onClick={handleResend} className="w-full">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Resend New Code
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otp.includes('')}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center text-gray-500">
                    Code expires in:
                    <span className={`ml-2 font-mono font-bold ${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-primary'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResend}
                    disabled={timeLeft > 120}
                    className="text-primary hover:text-[#E4C77D] text-xs md:text-sm p-0 h-auto"
                  >
                    Resend
                  </Button>
                </div>
              </div>
            )}

            {error && !isExpired && (
              <div className="text-xs text-red-500 text-center animate-shake">
                {error}
              </div>
            )}
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Sign In
            </button>
          </div>
        </div>
       
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
