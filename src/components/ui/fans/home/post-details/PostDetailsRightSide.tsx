"use client";
import { Post } from '@/types/post';
import { CheckCircle2, Crown } from "lucide-react";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const PostDetailsRightSide = () => {
    const params = useSearchParams();
    const type = params.get("type");
    const postType: "free" | "premium" = type === "premium" ? "premium" : "free";
    const mockPost: Post = {
        id: "post-1",
        type: postType,
        title: "Just Finished a new watercolor piece! 🎨✨",
        description:
            "Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight!\n\nThis painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.",
        // Sample image depending on type to match screenshots roughly
        imageUrl: postType === "free" ? "/homeBanner.svg" : "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        likes: 1200,
        commentsCount: 1200,
        timeAgo: "2 hour ago",
        author: {
            name: "Michel Lin",
            avatarUrl: "https://i.pravatar.cc/150?u=michel",
            role: "Digital Artist",
            membershipPlan: "Sweety",
            membershipPrice: "$4.99"
        }
    };
    const isPremium = mockPost.type === "premium";
    return (
        <div>
            <div className="flex flex-col gap-4">
                {/* Profile Card */}
                <div className="bg-[#1C1A24] rounded-2xl p-6 border border-gray-800 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                        <Image
                            src={mockPost.author.avatarUrl}
                            alt={mockPost.author.name}
                            width={80}
                            height={80}
                        />
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {mockPost.author.role}
                    </p>
                    <h3 className="font-bold text-xl mb-3">{mockPost.author.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 px-2 leading-relaxed">
                        Welcome to my creative sanctuary. Sharing art, life, and everything in between. ✨
                    </p>
                    <div className="w-full flex gap-3">
                        <button className="flex-1 bg-[#D08BFF] hover:bg-[#b070de] text-black font-semibold py-2 rounded-xl text-sm transition-colors">
                            Message
                        </button>
                        <button className="flex-1 bg-transparent border border-gray-600 hover:border-gray-400 text-white font-semibold py-2 rounded-xl text-sm transition-colors">
                            {isPremium ? "Follow" : "Join"}
                        </button>
                    </div>
                </div>

                {/* Membership Card */}
                <div className="bg-[#1C1A24] rounded-2xl p-6 border border-gray-800">
                    <h3 className="flex items-center gap-2 font-bold mb-5">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        Membership
                    </h3>

                    <div className="bg-[#2A2B3D] rounded-xl p-5 border border-gray-700/50">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-[#FF8B94]">Sweety</h4>
                            <span className="text-lg">🍭</span>
                        </div>
                        <div className="mb-5">
                            <span className="font-bold text-lg text-white">$4.99</span>
                            <span className="text-gray-400 text-xs"> /monthly</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {[
                                "Follow to updates",
                                "See all post",
                                "New feature unlock",
                                "See all post",
                                "Follow to updates"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-[#7971FF] shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-[#7971FF] hover:bg-[#6c64e6] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailsRightSide;