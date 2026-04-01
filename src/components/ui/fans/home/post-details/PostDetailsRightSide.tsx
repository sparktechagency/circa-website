"use client";
import { Post } from '@/types/post';
import { CheckCircle2, Crown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { myFetch } from '../../../../../../helpers/myFetch';
import { useEffect, useState } from 'react';
import { imgUrl } from '../../../../../../helpers/imgUrl';

const PostDetailsRightSide = () => {
    const params = useSearchParams();
    const type = params.get("type");
    const id = params.get("id");

    const [postData, setPostData] = useState<any>(null);
    const [membershipPlan, setMembershipPlan] = useState<any>(null);

    // ✅ Fetch post
    const getPostData = async () => {
        try {
            const res = await myFetch(`/post/${id}`);
            setPostData(res?.data);
        } catch (error) {
            console.error("Post fetch error:", error);
        }
    };

    // ✅ Fetch membership AFTER postData is ready
    const getMemberShipPackage = async (userId: string) => {
        try {
            const res = await myFetch(`/plan/user/${userId}`);
            setMembershipPlan(res?.data[0]);
        } catch (error) {
            console.error("Membership fetch error:", error);
        }
    };

    // ✅ First load post
    useEffect(() => {
        if (id) {
            getPostData();
        }
    }, [id]);

    // ✅ Then load membership when postData is available
    useEffect(() => {
        if (postData?.user?._id) {
            getMemberShipPackage(postData.user._id);
        }
    }, [postData]);


    return (
        <div>
            <div className="flex flex-col gap-4">
                {/* Profile Card */}
                <div className="bg-[#1C1A24] rounded-2xl p-6 border border-gray-800 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                        <Image
                            src={
                                postData?.user?.image && postData?.user?.image.startsWith('http')
                                    ? postData?.user?.image
                                    : postData?.user?.image
                                        ? `${imgUrl}${postData?.user?.image}`
                                        : '/default-avatar.jpg'
                            }
                            alt="user image"
                            width={80}
                            height={80}
                        />
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {postData?.user?.nickname}
                    </p>
                    <h3 className="font-bold text-xl mb-3">{postData?.user?.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 px-2 leading-relaxed">
                        {postData?.user?.short_bio} ✨
                    </p>
                    <button className="w-full bg-[#D08BFF] hover:bg-[#b070de] text-black font-medium py-2 rounded-xl text-white text-sm transition-colors">
                        Message
                    </button>
                </div>

                {/* Membership Card */}
                <div className="bg-[#1C1A24] rounded-2xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="flex items-center gap-2 font-bold">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            Membership
                        </h3>
                        <Link href={`/explore/creator-profile/membership?creatorId=${postData?.user?._id}`}><button className='text-xs cursor-pointer'>View All</button></Link>
                    </div>

                    <div className="bg-[#2A2B3D] rounded-xl p-5 border border-gray-700/50">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-[#FF8B94]">{membershipPlan?.name}</h4>
                            <span className="text-lg">🍭</span>
                        </div>
                        <div className="mb-5">
                            <span className="font-bold text-lg text-white">${membershipPlan?.price}</span>
                            <span className="text-gray-400 text-xs"> /{membershipPlan?.category}</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {membershipPlan?.features?.map((feature: any, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-[#7971FF] shrink-0" />
                                    {feature?.name}
                                </li>
                            ))}
                        </ul>

                        <div className='w-full flex items-center justify-end'>
                            <Link href={`/explore/creator-profile/membership?creatorId=${postData?.user?._id}`} className={`w-full ${!membershipPlan?.isSubscribed && "cursor-not-allowed"} bg-[#7971FF] hover:bg-[#6c64e6] text-white font-semibold py-2.5 text-center rounded-xl text-sm transition-colors`}>
                                Join
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailsRightSide;