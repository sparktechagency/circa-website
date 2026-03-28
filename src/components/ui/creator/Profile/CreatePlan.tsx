import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";

interface PlanItem {
    id: number;
    label: string;
    percentage?: string;
}

export default function CreatePlan() {
    const [planName, setPlanName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [category, setCategory] = useState("Select");
    const [duration, setDuration] = useState("Select");
    const [price, setPrice] = useState("");
    const [emoji, setEmoji] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("Select Plan");
    const [planPercentage, setPlanPercentage] = useState("0.00%");
    const [items, setItems] = useState<PlanItem[]>([
        { id: 1, label: "Distribution Platforms", percentage: "25%" },
        { id: 2, label: "Distribution Platforms" },
        { id: 3, label: "Distribution Platforms", percentage: "15%" },
        { id: 4, label: "Distribution Platforms" },
    ]);

    const removeItem = (id: number) => setItems(prev => prev.filter(item => item.id !== id));

    const addItem = () => {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems(prev => [...prev, { id: newId, label: "Distribution Platforms" }]);
    };

    const inputClass =
        "w-full bg-[#1c1e2e] rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all border-0";

    const selectClass =
        "w-full bg-[#1c1e2e] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 appearance-none cursor-pointer border-0";

    const labelClass = "text-[13px] text-gray-300 font-medium mb-1.5 block";

    return (
        <div className="space-y-4 bg-[#0d0e1a] min-h-screen p-5">
            {/* Plan Name */}
            <div>
                <label className={labelClass}>Plan Name</label>
                <input
                    type="text"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Subtitle */}
            <div>
                <label className={labelClass}>Subtitle</label>
                <input
                    type="text"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Select Categories */}
            <div>
                <label className={labelClass}>Select Categories</label>
                <div className="relative">
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className={selectClass}
                    >
                        {["Select", "Music", "Video", "Podcast", "Art"].map(o => (
                            <option key={o} value={o} className="bg-[#1c1e2e]">{o}</option>
                        ))}
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Duration */}
            <div>
                <label className={labelClass}>Duration</label>
                <div className="relative">
                    <select
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className={selectClass}
                    >
                        {["Select", "Monthly", "Quarterly", "Yearly"].map(o => (
                            <option key={o} value={o} className="bg-[#1c1e2e]">{o}</option>
                        ))}
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Price */}
            <div>
                <label className={labelClass}>Price</label>
                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="$0.00"
                    className={inputClass}
                />
            </div>

            {/* Choose Emoji */}
            <div>
                <label className={labelClass}>Choose Emoji</label>
                <input
                    type="text"
                    value={emoji}
                    onChange={e => setEmoji(e.target.value)}
                    placeholder="Select Emoji"
                    className={inputClass}
                />
            </div>

            {/* Plan Description */}
            <div>
                <label className={labelClass}>Plan Description</label>
                <div className="flex gap-2 mb-3">
                    {/* Select Plan dropdown */}
                    <div className="relative flex-1">
                        <select
                            value={selectedPlan}
                            onChange={e => setSelectedPlan(e.target.value)}
                            className="w-full bg-[#1c1e2e] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 appearance-none cursor-pointer border-0"
                        >
                            {["Select Plan", "Subscription list", "Feature list"].map(o => (
                                <option key={o} value={o} className="bg-[#1c1e2e]">{o}</option>
                            ))}
                        </select>
                        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                    {/* Percentage input */}
                    <input
                        type="text"
                        value={planPercentage}
                        onChange={e => setPlanPercentage(e.target.value)}
                        className="w-20 bg-[#1c1e2e] rounded-xl px-3 py-3.5 text-white text-sm text-center focus:outline-none focus:ring-1 focus:ring-indigo-500/40 border-0"
                    />
                    {/* Add button */}
                    <button
                        onClick={addItem}
                        className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 rounded-xl flex items-center justify-center text-white transition-colors flex-shrink-0"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {/* Plan items list */}
                <div className="space-y-2.5">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between px-4 py-3.5 bg-[#1c1e2e] rounded-xl"
                        >
                            <span className="text-gray-300 text-sm">
                                {idx + 1}. {item.label}
                                {item.percentage && (
                                    <span className="text-gray-400"> &nbsp;|&nbsp; {item.percentage}</span>
                                )}
                            </span>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-500 hover:text-gray-300 transition-colors ml-3"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create button */}
            <button className="w-full py-4 rounded-xl font-semibold text-sm text-white bg-indigo-400 hover:bg-indigo-500 transition-all mt-2">
                Create
            </button>
        </div>
    );
}