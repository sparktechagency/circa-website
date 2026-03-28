"use client";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="w-full text-white pb-10">
            {/* Image */}
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden mb-8 border border-[#242424] bg-[#1c1c20]">
                <Image
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2600&auto=format&fit=crop" 
                    fill
                    className="object-cover"
                    alt="Limited Ed. Shirt"
                />
            </div>

            {/* Header Content */}
            <div className="flex justify-between items-start mb-7 gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[26px] md:text-3xl font-medium tracking-wide text-white">
                        Limited Ed. Shirt
                    </h1>
                    <p className="text-[#a78bfa] text-[15px] font-light tracking-wide">
                        Published: 12 Jun, 2025
                    </p>
                    <p className="text-[#FF9A85] text-xl font-medium tracking-wide mt-1">
                        $11.70
                    </p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-4 mt-1.5">
                    <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-[34px] h-[34px] rounded border border-[#3A3A40] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#5A5A60] transition-colors focus:outline-none"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="text-[20px] font-medium w-4 text-center">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-[34px] h-[34px] rounded border border-[#3A3A40] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#5A5A60] transition-colors focus:outline-none"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className="mb-10">
                <p className="text-[#D4D4D8] text-[16px] leading-[1.8] font-light tracking-wide">
                    This painting captures a quiet yet powerful moment through rich colors 
                    and expressive brushstrokes. The composition draws the eye toward the 
                    central subject, while subtle textures and layered tones add depth and 
                    emotion. Each detail reflects the artist's intention, blending light and 
                    shadow to create a balanced and immersive visual experience. The 
                    artwork invites viewers to pause, interpret, and connect with the story 
                    behind the canvas, making it a timeless piece suitable for both modern 
                    and classic spaces.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 py-3 rounded-xl bg-[#9EA4F9] text-white text-[15px] font-medium hover:bg-[#8e95f5] transition-colors tracking-wide">
                    Buy Now
                </button>
                <button className="flex-1 py-3 rounded-xl bg-[#131118] text-[#D4D4D8] text-[15px] font-medium hover:bg-[#1a1824] border border-[#2A2A30] transition-colors tracking-wide">
                    Add to Cart 
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;