"use client";

import { useState } from "react";
import GetStarted from "./GetStarted";
import Vive from "./Vive";
import Verify from "./Verify";
import ApplicationSubmitted from "./ApplicationSubmitted";

type Step = "landing" | "vibe" | "verify" | "submitted";

interface VibeData {
    selectedCategories: string[];
    friendsMode: boolean;
    selectedSocialTags: string[];
}

interface VerifyData {
    username: string;
    dob: string;
    bio: string;
}

interface VerifyFiles {
    avatar: File | null;
    sampleContent: File | null;
}

export default function BecomeCreator() {
    const [step, setStep] = useState<Step>("landing");
    const [vibeData, setVibeData] = useState<VibeData | null>(null);

    const handleVibeComplete = (data: VibeData) => {
        setVibeData(data);
        setStep("verify");
    };

    const handleVerifyComplete = (data: VerifyData, files: VerifyFiles) => {
        // ── Separate files from form data ──
        const formData = {
            ...vibeData,
            ...data,
        };

        const fileData = {
            avatar: files.avatar
                ? { name: files.avatar.name, size: files.avatar.size, type: files.avatar.type }
                : null,
            sampleContent: files.sampleContent
                ? { name: files.sampleContent.name, size: files.sampleContent.size, type: files.sampleContent.type }
                : null,
        };

        console.log("📋 Submitted Form Data:", formData);
        console.log("📁 Submitted Files:", fileData);
        console.log("🗂️ Raw File Objects:", files);

        setStep("submitted");
    };

    return (
        <div className="min-h-screen flex items-center justify-center font-sans px-4 py-10">
            <div className="w-full md:max-w-2xl">

                {step === "landing" && (
                    <GetStarted onGetStarted={() => setStep("vibe")} />
                )}

                {step === "vibe" && (
                    <Vive onVibeComplete={handleVibeComplete} />
                )}

                {step === "verify" && (
                    <Verify onVerifyComplete={handleVerifyComplete} />
                )}

                {step === "submitted" && (
                    <ApplicationSubmitted />
                )}

            </div>
        </div>
    );
}