import { Plus, Star, X } from "lucide-react";
import { useState } from "react";

export default function MembershipPlan({ onCreate }: { onCreate: () => void }) {
  const [plans, setPlans] = useState([
    { name: "Lover",  price: "$4,332", period: "/mo",     color: "text-red-400",    desc: "Providing something valuable to others", subs: 12, star: false },
    { name: "Free",   price: "1002 tokens for public content", period: "", color: "text-yellow-300", desc: "", subs: 0, star: true },
    { name: "Hobby",  price: "$4.99",  period: "/month",  color: "text-red-400",    desc: "Providing something valuable to others", subs: 0, star: false },
  ]);

  const FEATURES = [
  "1% credit updates", "Pay", "Accounting updates",
  "2 credit updates", "Get 5 tips", "Subscription videos",
];
  return (
    <div className="space-y-4">      
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1b2e] hover:bg-[#1f2040] text-white text-sm rounded-lg transition-colors border border-white/8"
        >
          <Plus size={14} /> Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-[#1a1b2e] rounded-xl p-4 flex flex-col gap-3 relative">
            <button              
              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
            >
              <X size={10} />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${plan.color}`}>{plan.name}</span>
                {plan.star && <Star size={11} className="text-yellow-300 fill-yellow-300" />}
              </div>
              <p className="text-white font-bold text-sm mt-0.5 leading-snug pr-6">
                {plan.price}<span className="text-gray-500 text-xs font-normal">{plan.period}</span>
              </p>
              {plan.desc && <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">{plan.desc}</p>}
            </div>
            <div className="space-y-1.5 flex-1">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-gray-300 text-xs">{f}</span>
                </div>
              ))}
            </div>
            <div className="pt-1 space-y-1.5">
              {plan.subs > 0 && <p className="text-xs text-gray-500">{plan.subs} Subscribers</p>}
              <button className="w-full py-2 rounded-lg border border-indigo-400/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/10 transition-colors">
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}