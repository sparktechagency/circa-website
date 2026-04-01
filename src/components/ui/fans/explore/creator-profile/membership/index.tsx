import { Check } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { membershipData } from "@/constants/explore-data";


const Membership = ({plans}:any) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">💎</span>
        <h3 className="text-xl font-semibold text-white mb-2">No Plans Available</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          There are no membership plans to display at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((tier:any) => (
        <div
          key={tier?._id}
          className="bg-[#15131A] rounded-xl p-8 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-0">
              <h3 className={`text-lg font-medium ${tier.title === "Free" ? "text-primary" : "text-[#F084A9]"}`}>{tier.title}</h3>
              <span className="text-2xl">{tier.icon}</span>
            </div>

            {tier.price && (
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-semibold text-white">
                  {tier.price}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {tier.frequency}
                </span>
              </div>
            )}

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {tier.description}
            </p>

            <div className="w-full h-[1px] bg-white/10 mb-8" />

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature:Record<string, any>, index:number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-primary size-5 rounded-full flex items-center justify-center shrink-0">
                    <Check className="text-white size-3 stroke-[4px]" />
                  </div>
                  <span className="text-[15px] text-gray-200">{feature?.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="default"
            className="w-full bg-[#99a0fd] hover:bg-[#8b91f0] text-white font-bold rounded-xl h-12 text-base transition-colors"
          >
            {tier.buttonText}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Membership;