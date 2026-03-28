"use client";
import { Post } from '@/types/post';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const MembershipRightSide = () => {
    const params = useSearchParams();
    const type = params.get("type");
    const postType: "free" | "premium" = type === "premium" ? "premium" : "free";
    const mockPost: Post = {
        id: "post-1",
        type: postType,
        title: "Just Finished a new watercolor piece! 🎨✨",
        description:
            "Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight!\n\nThis painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.",
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

                    <button className="w-full bg-[#D08BFF] hover:bg-[#b070de] text-black font-medium py-3 rounded-xl text-white text-sm transition-colors">
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipRightSide;