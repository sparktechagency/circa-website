'use client'
import {
    ArrowLeft,
    Calendar,
    Gift,
    Palette,
    Share2,
    Sparkles
} from 'lucide-react';
import React, { useState } from 'react';
import ShopEditModal from './ShopEditModal';

interface ProductData {
    id: string;
    title: string;
    price: string;
    soldCount: number;
    publishedDate: string;
    descriptionTitle: string;
    descriptionBody: string;
    imageUrl: string;
}

export const DEFAULT_Shop_DATA: any = {
    id: 'post_001',
    title: 'Just Finished a new watercolor piece!',
    description:
        'This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    visibility: 'everyone',
    engagement: 'only_me',
    nsfw: true,
};

const CreatorShopDetails: React.FC = () => {
    const product: ProductData = {
        id: "p1",
        title: "Limited Ed. Shirt",
        price: "$11.70",
        soldCount: 32,
        publishedDate: "12 Jun, 2025",
        descriptionTitle: "Just Finished a new watercolor piece!",
        descriptionBody: `Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight! 

This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.`,
        imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200"
    };
const [isModalOpen, setIsModalOpen] = useState(true);
    return (
        <div className="min-h-screen bg-cardBg text-white selection:bg-purple-500/30 font-sans">
            <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
                <div className="flex items-center justify-between mb-8">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-white/5">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-semibold text-sm">Back to Shop</span>
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 shadow-2xl group">
                    <img
                        src={product.imageUrl}
                        alt="Product Preview"
                        className="w-full aspect-[4/5] sm:aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Floating Send Gift Button */}
                    <button className="absolute top-6 right-6 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold shadow-xl transition-transform active:scale-95">
                        <Gift size={14} className="text-pink-500" />
                        Send Gift
                    </button>
                </div>

                {/* Product Information Section */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                                {product.title} <Palette className="text-purple-400" size={24} /> <Sparkles className="text-yellow-400" size={24} />
                            </h1>
                            <div className="flex items-center gap-2 mt-2 text-purple-400/80 text-xs font-semibold uppercase tracking-wider">
                                <Calendar size={12} />
                                Published: {product.publishedDate}
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm font-medium">
                            {product.soldCount} sold
                        </div>
                    </div>

                    <div className="text-2xl font-black text-white py-1">
                        {product.price}
                    </div>

                    <hr className="border-[#2a2a35]" />

                    {/* Detailed Description */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {product.descriptionTitle} <Palette size={20} className="text-purple-400" />
                        </h2>
                        <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line opacity-90">
                            {product.descriptionBody}
                        </div>
                    </div>
                </section>
            </main>
             <ShopEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={DEFAULT_Shop_DATA}   // optional, falls back to DEFAULT_POST_DATA
                onUpdate={(updated) => console.log(updated)}  // optional callback
            />
        </div>
    );
};

export default CreatorShopDetails;