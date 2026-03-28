import { Check, Filter } from "lucide-react";
import { useState } from "react";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    Male: true,
    Female: false,
    Friendly: false,
    Flirty: false,
    Passionate: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#2B2B33] text-primary text-sm hover:bg-[#2A2A30] transition cursor-pointer"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[120%] w-[250px] bg-[#1c1c20] border border-[#2E2E36] rounded-2xl p-5 shadow-2xl">
          <div className="flex flex-col">
            {(Object.keys(filters) as Array<keyof typeof filters>).map((key, index) => (
              <div key={key}>
                <label className="flex items-center gap-3.5 cursor-pointer group py-3.5" onClick={() => toggleFilter(key)}>
                  <div className={`w-[20px] h-[20px] rounded-[4px] flex items-center justify-center border transition-colors ${filters[key] ? 'bg-[#9EA4F9] border-[#9EA4F9]' : 'border-[#4C4C55] bg-transparent group-hover:border-[#9EA4F9]'}`}>
                    {filters[key] && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-[#F4F4F5] text-[15.5px] tracking-wide">{key}</span>
                </label>
                {index < 4 && <div className="h-[1px] bg-[#2E2E36] w-full" />}
              </div>
            ))}
            
            <div className="pt-5 pb-1">
              <div className="text-[#F4F4F5] text-[14.5px] mb-4">Age Preference</div>
              <div className="relative flex items-center justify-between text-[11px] text-[#A1A1AA] mb-1.5 w-full">
                <span>18</span>
                <span>32</span>
              </div>
              <div className="relative h-1 bg-[#3A3A40] rounded-full w-full">
                <div className="absolute left-0 w-1/2 h-full bg-[#9EA4F9] rounded-full"></div>
                <div className="absolute left-1/2 -ml-2 -top-[5px] w-[14px] h-[14px] bg-[#9EA4F9] rounded-full shadow-md cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default FilterDropdown;