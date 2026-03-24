'use client';

import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, UserRound, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Signup successful:', { fullName, email, phone });
      router.replace('/user-dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div
        className="w-full md:w-md rounded-3xl p-10 flex flex-col items-center"
        style={{ background: '#15151a' }}
      >
        {/* App Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: 'linear-gradient(145deg, #a89fe8, #7b6fd4)',
            boxShadow: '0 8px 24px rgba(123, 111, 212, 0.35)',
          }}
        >
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

        {/* Heading */}
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: '#a89fe8', fontFamily: "'DM Sans', sans-serif" }}
        >
          Create an Account
        </h1>
        <p className="text-sm mb-8" style={{ color: '#6b6b7b' }}>
          Get Started with Circa!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {/* Full Name */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3.5"
            style={{ background: '#1e1e27' }}
          >
            <UserRound className="w-5 h-5 flex-shrink-0" style={{ color: '#6b6b7b' }} />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              className="flex-1 bg-transparent text-white placeholder-[#6b6b7b] text-sm focus:outline-none"
            />
          </div>

          {/* Email */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3.5"
            style={{ background: '#1e1e27' }}
          >
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#6b6b7b' }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-1 bg-transparent text-white placeholder-[#6b6b7b] text-sm focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3.5"
            style={{ background: '#1e1e27' }}
          >
            <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#6b6b7b' }} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone No"
              required
              className="flex-1 bg-transparent text-white placeholder-[#6b6b7b] text-sm focus:outline-none"
            />
          </div>

          {/* Password */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3.5"
            style={{ background: '#1e1e27' }}
          >
            <Lock className="w-5 h-5 flex-shrink-0" style={{ color: '#6b6b7b' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="flex-1 bg-transparent text-white placeholder-[#6b6b7b] text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" style={{ color: '#6b6b7b' }} />
              ) : (
                <EyeOff className="w-5 h-5" style={{ color: '#6b6b7b' }} />
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #a89fe8, #7b6fd4)',
              boxShadow: '0 4px 20px rgba(123, 111, 212, 0.4)',
            }}
          >
            {isLoading ? 'Creating Account...' : 'Login'}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-xs" style={{ color: '#6b6b7b' }}>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium"
            style={{ color: '#a89fe8' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}