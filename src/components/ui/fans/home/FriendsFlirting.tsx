import { FRIENDS_FLIRTING } from '@/constants/home-data'
import Image from 'next/image'
import React from 'react'

const FriendsFlirting = () => {
  return (
    <div className="bg-[#15131A] border border-gray-800/80 rounded-2xl p-5">
        <div className="mb-5 border-b border-[#2D2D2D] pb-4">
          <h3 className="flex items-center gap-2 text-base font-normal text-white">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#18C964]">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            Friends & Flirting
          </h3>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          {FRIENDS_FLIRTING.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full relative overflow-hidden shrink-0">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white">{user.name}</h4>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#252330] hover:bg-[#2F2C3D] text-gray-300 font-semibold py-2.5 rounded-xl text-xs transition-colors">
          View All
        </button>
      </div>
  )
}

export default FriendsFlirting