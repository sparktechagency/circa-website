"use client";

import { useState } from "react";
import GetStarted from "./GetStarted";
import Vive from "./Vive";
import Verify from "./Verify";
import ApplicationSubmitted from "./ApplicationSubmitted";

type Step = "landing" | "vibe" | "verify" | "submitted";



export default function BecomeCreator() {
  const [step, setStep] = useState<Step>("landing");




  return (
    <div className="min-h-screen  flex items-center justify-center font-sans px-4 py-10">


      <div className="w-full max-w-sm">

        {/* ── STEP 1: Landing ── */}
        {step === "landing" && (
          <GetStarted onGetStarted={() => setStep("vibe")} />
        )}

        {/* ── STEP 2: Vibe ── */}
        {step === "vibe" && (
          <Vive onVibeComplete={() => setStep("verify")} />
        )}

        {/* ── STEP 3: Verify ── */}
        {step === "verify" && (
          <Verify onVerifyComplete={() => setStep("submitted")} />
        )}

        {/* ── STEP 4: Submitted ── */}
        {step === "submitted" && (
          <ApplicationSubmitted />
        )}

      </div>
    </div>
  );
}