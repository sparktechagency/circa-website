import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const shopData = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/7f/39/1c/7f391c3c13f41d3e92a096a9a18db8d0.jpg",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 5,
    image: "https://i.pinimg.com/1200x/58/93/4c/58934cf294e7d11dbfdf63398a37ce30.jpg",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200&auto=format&fit=crop",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
  {
    id: 9,
    image: "https://i.pinimg.com/736x/04/fd/a2/04fda205f26a89d90d5403ae6f36a711.jpg",
    title: "Limited Ed. Shirt",
    price: "$45",
    likes: "1.2k",
  },
];

const Shop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-4 pb-12">
      {shopData.map((item) => (
        <Link href={"/explore/creator-profile/product-details"} key={item.id} className="flex flex-col gap-3 group cursor-pointer">
          <div className="relative w-full rounded-[22px] overflow-hidden bg-[#1c1c20]"> 

            <Image
              src={item.image}
              width={500}
              height={300}
              className="object-cover h-[300px] transition-transform duration-500 group-hover:scale-105"
              alt={item.title}
            />

            {/* Likes Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Heart size={14} className="text-[#D4D4D8]" />
              <span className="text-white text-[13px] font-medium tracking-wide">
                {item.likes}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-start px-1 mt-0.5">
            <div>
              <h3 className="text-white font-medium text-[15px] truncate tracking-wide">
                {item.title}
              </h3>
              <p className="text-[#FF9A85] text-[15px] mt-0.5 font-medium tracking-wide">
                {item.price}
              </p>
            </div>
            
            <button className="w-[34px] h-[34px] rounded-full bg-[#181624] flex items-center justify-center text-[#9EA4F9] hover:bg-[#8e95f5] hover:text-white transition-colors shrink-0">
              <ShoppingCart size={16} className="-ml-0.5" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Shop;