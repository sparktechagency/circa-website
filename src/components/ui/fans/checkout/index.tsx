"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Check,
  Home,
  Minus,
  Package,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import { Label } from "../../label";
import ItemList from "./ItemList";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

type Step = "cart" | "checkout" | "success";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_CART: CartItem[] = [
  { id: 1, name: "T Shirt", price: 200, qty: 1, image: "/placeholder-shirt.jpg" },
  { id: 2, name: "T Shirt", price: 200, qty: 1, image: "/placeholder-shirt.jpg" },
  { id: 3, name: "T Shirt", price: 200, qty: 1, image: "/placeholder-shirt.jpg" },
];

const TAXES = 5;
const OTHER_FEES = 0;
const DELIVERY_FEES = 10;



// ─── Cost Summary ─────────────────────────────────────────────────────────────

function CostSummary({ subtotal, total }: { subtotal: number; total: number }) {
  const rows = [
    { label: "Subtotal", value: subtotal },
    { label: "Taxes", value: TAXES },
    { label: "Other Fees", value: OTHER_FEES },
    { label: "Delivery Fees", value: DELIVERY_FEES },
  ];

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-white mb-3">Cost Summary</p>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between text-xs">
            <span className="text-white/50">{r.label}</span>
            <span className="text-white/70">${r.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <Separator className="my-3 bg-white/10" />
      <div className="flex justify-between text-sm font-bold">
        <span className="text-white">Total</span>
        <span className="text-white">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("cart");
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  // Address form state
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("New York");
  const [address, setAddress] = useState("House C17/A, B Block, Dhanmondi Dhaka");
  const [contact, setContact] = useState("United States");
  const [postal, setPostal] = useState("+2938 3048 3498");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + TAXES + OTHER_FEES + DELIVERY_FEES;


  return (
    <div className=" text-white flex flex-col">
      {/* ── Page Shell ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full ">

          {/* ════════════ STEP 1: CART ════════════ */}
          {step === "cart" && (
            <div className="grid grid-cols-1 md:grid-cols-5 items-start gap-4">
              {/* Left panel: item list */}
            <ItemList setCart={setCart} cart={cart}/>

              {/* Right panel: cost summary */}
              <div className="md:col-span-2 border border-white/[0.07] rounded-2xl p-5 flex flex-col justify-between">
                <CostSummary subtotal={subtotal} total={total} />

                <Button
                  onClick={() => setStep("checkout")}
                  disabled={cart.length === 0}
                  className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl h-11 transition-all disabled:opacity-40"
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}

          {/* ════════════ STEP 2: CHECKOUT ════════════ */}
          {step === "checkout" && (
            <div className="max-w-2xl mx-auto w-full bg-cardBg border border-white/[0.07] rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold">Add to Cart</h2>

              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Country */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white text-sm h-10 focus:ring-indigo-500/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e24] border-white/10 text-white">
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-sm h-10 focus-visible:ring-indigo-500/50"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-sm h-10 focus-visible:ring-indigo-500/50"
                  />
                </div>

                {/* Contact */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Contact</Label>
                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-sm h-10 focus-visible:ring-indigo-500/50"
                  />
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5 sm:col-span-1">
                  <Label className="text-xs text-white/50">Postal Code</Label>
                  <Input
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-sm h-10 focus-visible:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-[#1a1a20] border border-white/[0.07] rounded-xl p-4 mt-2">
                <p className="text-xs text-white/50 mb-3 font-medium">Payment Amount</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Total</span>
                  <span className="text-sm font-bold text-white">${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => setStep("success")}
                  className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl h-11 transition-all"
                >
                  Process to Pay
                </Button>
              </div>

              {/* Back */}
              <button
                onClick={() => setStep("cart")}
                className="mt-4 text-xs text-white/30 hover:text-white/60 transition-colors w-full text-center"
              >
                ← Back to cart
              </button>
            </div>
          )}

          {/* ════════════ STEP 3: SUCCESS ════════════ */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              {/* Animated checkmark circle */}
              <div className="relative mb-8">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                <div className="absolute -inset-3 rounded-full border border-indigo-500/20" />
                <div className="absolute -inset-6 rounded-full border border-indigo-500/10" />

                {/* Floating dots */}
                <span className="absolute -top-4 -right-2 w-2.5 h-2.5 rounded-full bg-indigo-400 opacity-70" />
                <span className="absolute top-2 -right-8 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-50" />
                <span className="absolute -bottom-3 -left-4 w-2 h-2 rounded-full bg-indigo-300 opacity-60" />
                <span className="absolute bottom-4 -right-6 w-1 h-1 rounded-full bg-white opacity-40" />

                {/* Circle */}
                <div className="relative w-24 h-24 rounded-full bg-indigo-500/30 border-2 border-indigo-400/60 flex items-center justify-center backdrop-blur-sm">
                  <Check className="w-10 h-10 text-indigo-300 stroke-[2.5]" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Thank You!
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Your Payment has been successfully done
              </p>

              <Button
                onClick={() => {
                  setStep("cart");
                  setCart(INITIAL_CART);
                }}
                className="bg-indigo-500/80 hover:bg-indigo-500 border border-indigo-400/40 text-white font-semibold rounded-xl px-8 h-11 flex items-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                Go to Home
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}