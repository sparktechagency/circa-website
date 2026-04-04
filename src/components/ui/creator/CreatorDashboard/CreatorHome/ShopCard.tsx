import { Product } from "@/types";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";

const ShopCard = ({ shop }: { shop: Product }) => {
    return (
        <Link href={`/shop/${shop._id}`}>
            <div className="py-4 flex flex-row items-center gap-6 group hover:bg-white/3 px-2 rounded-2xl transition-all duration-300">
                {/* Product Image */}
                <div className="relative w-[110px] h-[90px] shrink-0 rounded-[22px] overflow-hidden">
                    <Image
                        src={getImageUrl(shop?.image)}
                        alt={shop?.name}
                        width={110}
                        height={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-auto"
                    />
                </div>

                {/* Product Metrics */}
                <div className="flex flex-col gap-0.5">
                    <div className="text-white text-base font-semibold leading-snug truncate">
                        {shop?.name}
                    </div>
                    <div className="text-[#FF8A71] text-2xl font-bold leading-tight tracking-tight">
                        ${shop?.price?.toFixed(2)}
                    </div>
                    <div className="text-[#A5B4FC] text-lg font-medium opacity-90">
                        {shop?.total_sold} sold
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ShopCard;
