'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { myFetch } from '../../../../../helpers/myFetch'
import { imageFormatter } from '../../../../../helpers/imageFormatter';
import Link from 'next/link';

const TopCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const getCreators = async () => {
      try {
        const res = await myFetch('/user/creator');        
        setCreators(res?.data?.slice(0, 2) ?? []);
      } catch (err) {
        console.error('Failed to fetch creators:', err);
      }
    };

    getCreators();
  }, []); // ← empty array = runs once only
    
  return (
    <div className="bg-[#15131A] border border-[#2D2D2D] rounded-2xl p-5">
      <div className="mb-5 border-b border-[#2D2D2D] pb-4">
        <h3 className="flex items-center gap-2 text-base font-normal text-white mb-0.5">
          <span>🏵️</span> Top Creator
        </h3>
        <p className="text-gray-400 text-xs font-medium">
          Most supported this week
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-5">
        {creators?.map((creator: any) => (
          <div key={creator?._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full relative overflow-hidden">
                <Image
                  src={imageFormatter(creator?.image)}
                  alt={creator?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{creator?.name}</h4>
                <p className="text-xs text-gray-400">{creator?.gifts}</p>
              </div>
            </div>
            <button className="bg-[#3D2A42] p-2 rounded-lg flex items-center justify-center hover:bg-[#4d3553] transition-colors">
              <span className="text-sm">🎁</span>
            </button>
          </div>
        ))}
      </div>

      <Link href="/explore">
      <button className="w-full bg-[#5E699B33] hover:bg-[#2F2C3D] text-gray-300 font-medium py-2.5 rounded-xl text-xs transition-colors">
        View All
      </button>
      </Link>
    </div>
  );
};

export default TopCreators;