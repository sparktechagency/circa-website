"use client";
import React, { useState } from "react";

import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../../button";

import { toast } from "sonner";
import { myFetch } from "../../../../../helpers/myFetch";

export function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await myFetch("/auth/reset-password", {
        method: "POST",
        token,
        body: {
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      });
      
      if (response?.success) {
        toast.success(response?.message || "Password reset successfully", {
          id: "reset-password",
        });
        router.replace("/login");
      } else {
        if (response?.error && Array.isArray(response.error)) {
          const firstMessage = response.error[0]?.message;
          setError(firstMessage || "Something went wrong!");
          response.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "reset-password" });
          });
        } else {
          const msg = response?.message || "Something went wrong!";
          setError(msg);
          toast.error(msg, { id: "reset-password" });
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage, { id: "reset-password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(145deg, #a89fe8, #7b6fd4)",
            boxShadow: "0 8px 24px rgba(123, 111, 212, 0.35)",
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

        <div className="text-center mb-8">
          <h1 className="text-4xl text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Set a new password for your account</p>
        </div>

        <div className="bg-[#111111] p-8 rounded-xl border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Minimum 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Re-enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}