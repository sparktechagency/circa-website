import Image from "next/image";

const BrowseRightSide = () => {
    return (
        <div>
                <div className="space-y-6 border border-[#2D2D2D] p-4 rounded-xl  ">
        <div className="text-xl font-medium flex items-center gap-2 "> 
               <div className="w-10 h-10 rounded-full bg-primary/20 flex justify-center items-center">
                👤
              </div>  
              <p> My Creator </p>   
        </div>
        <div className="flex flex-col gap-5 ">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
          <div> 
            <Image src={"/user.png"} alt="" height={40} width={40} className="rounded-full" />
          </div>
              <div>
                <p className="font-semibold text-sm">Michel Lin</p>
                <p className="text-xs text-gray-400">Musician</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    );
};

export default BrowseRightSide;