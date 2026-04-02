import Image from "next/image";
import { useEffect, useState } from "react";
import { imageFormatter } from "../../../../../../helpers/imageFormatter";
import { myFetch } from "../../../../../../helpers/myFetch";

const BrowseRightSide = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const getCreators = async () => {
      const response = await myFetch(`/user/my-creator`);
      setCreators(response?.data);      
    };
    getCreators();
  }, []);

  return (
    <div>
      <div className="space-y-6 border border-[#2D2D2D] p-4 rounded-xl">
        <div className="text-xl font-medium flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex justify-center items-center">
            👤
          </div>
          <p>My Creator</p>
        </div>

        <div className="flex flex-col gap-5">
          {creators?.length > 0 ? (
            creators.slice(0, 5).map((creator: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <Image
                  src={imageFormatter(creator?.image)}
                  alt=""
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{creator?.name}</p>
                  <p className="text-xs text-gray-400">{creator?.nickname}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2D2D2D] flex items-center justify-center text-2xl">
                👤
              </div>
              <p className="text-sm font-medium text-gray-300">No creators yet</p>
              <p className="text-xs text-gray-500">
                Creators you follow will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseRightSide;