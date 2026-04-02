import { Check, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const GENDER_FILTERS = ["Male", "Female"] as const;
const STATUS_FILTERS = ["Friendly", "Flirty", "Passionate"] as const;

type GenderFilter = (typeof GENDER_FILTERS)[number];
type StatusFilter = (typeof STATUS_FILTERS)[number];
type FilterKey = GenderFilter | StatusFilter;

const AGE_MIN = 18;
const AGE_MAX = 60;

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({
    Male: false,
    Female: false,
    Friendly: false,
    Flirty: false,
    Passionate: false,
  });
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 40]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  // Sync age range from URL on mount
  useEffect(() => {
    const minAge = searchParams.get("minAge");
    const maxAge = searchParams.get("maxAge");
    if (minAge && maxAge) {
      setAgeRange([Number(minAge), Number(maxAge)]);
    }
  }, []);

  const toggleFilter = (key: FilterKey) => {
    const isCurrentlyActive = filters[key];
    const params = new URLSearchParams(searchParams.toString());

    if (GENDER_FILTERS.includes(key as GenderFilter)) {
      const newGenderState = !isCurrentlyActive;
      setFilters((prev) => ({
        ...prev,
        Male: key === "Male" ? newGenderState : false,
        Female: key === "Female" ? newGenderState : false,
      }));
      if (newGenderState) {
        params.set("gender", key);
      } else {
        params.delete("gender");
      }
    } else {
      setFilters((prev) => ({ ...prev, [key]: !isCurrentlyActive }));
      const currentStatuses = params.get("status")
        ? params.get("status")!.split(",")
        : [];
      const updatedStatuses = isCurrentlyActive
        ? currentStatuses.filter((s) => s !== key)
        : [...currentStatuses, key];
      if (updatedStatuses.length > 0) {
        params.set("status", updatedStatuses.join(","));
      } else {
        params.delete("status");
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const pushAgeToURL = useCallback(
    (range: [number, number]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("minAge", String(range[0]));
      params.set("maxAge", String(range[1]));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const getPctFromEvent = (e: MouseEvent | TouchEvent): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const raw = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, raw));
  };

  const handleThumbPointerDown = (thumb: "min" | "max") => {
    dragging.current = thumb;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const pct = getPctFromEvent(e);
      const value = Math.round(AGE_MIN + pct * (AGE_MAX - AGE_MIN));
      setAgeRange((prev) => {
        if (thumb === "min") {
          const newMin = Math.min(value, prev[1] - 1);
          return [newMin, prev[1]];
        } else {
          const newMax = Math.max(value, prev[0] + 1);
          return [prev[0], newMax];
        }
      });
    };

    const onUp = (e: MouseEvent | TouchEvent) => {
      dragging.current = null;
      const pct = getPctFromEvent(e);
      const value = Math.round(AGE_MIN + pct * (AGE_MAX - AGE_MIN));
      setAgeRange((prev) => {
        let next: [number, number];
        if (thumb === "min") {
          next = [Math.min(value, prev[1] - 1), prev[1]];
        } else {
          next = [prev[0], Math.max(value, prev[0] + 1)];
        }
        pushAgeToURL(next);
        return next;
      });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
  };

  const toPercent = (val: number) =>
    ((val - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;

  const allKeys = [...GENDER_FILTERS, ...STATUS_FILTERS] as FilterKey[];

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
            {allKeys.map((key, index) => (
              <div key={key}>
                <label
                  className="flex items-center gap-3.5 cursor-pointer group py-3.5"
                  onClick={() => toggleFilter(key)}
                >
                  <div
                    className={`w-[20px] h-[20px] rounded-[4px] flex items-center justify-center border transition-colors ${
                      filters[key]
                        ? "bg-[#9EA4F9] border-[#9EA4F9]"
                        : "border-[#4C4C55] bg-transparent group-hover:border-[#9EA4F9]"
                    }`}
                  >
                    {filters[key] && (
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span className="text-[#F4F4F5] text-[15.5px] tracking-wide">
                    {key}
                  </span>
                </label>
                {index < allKeys.length - 1 && (
                  <div className="h-[1px] bg-[#2E2E36] w-full" />
                )}
              </div>
            ))}

            {/* Age Range Slider */}
            <div className="pt-5 pb-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#F4F4F5] text-[14.5px]">
                  Age Preference
                </span>
                <span className="text-[#9EA4F9] text-[13px] font-medium">
                  {ageRange[0]}–{ageRange[1]}
                </span>
              </div>

              {/* Track */}
              <div
                ref={trackRef}
                className="relative h-1 bg-[#3A3A40] rounded-full w-full select-none"
              >
                {/* Active fill between thumbs */}
                <div
                  className="absolute h-full bg-[#9EA4F9] rounded-full"
                  style={{
                    left: `${toPercent(ageRange[0])}%`,
                    width: `${toPercent(ageRange[1]) - toPercent(ageRange[0])}%`,
                  }}
                />

                {/* Min thumb */}
                <div
                  className="absolute -top-[7px] w-[16px] h-[16px] bg-[#9EA4F9] rounded-full cursor-grab active:cursor-grabbing border-2 border-[#1c1c20] transition-transform hover:scale-110"
                  style={{
                    left: `calc(${toPercent(ageRange[0])}% - 8px)`,
                  }}
                  onMouseDown={() => handleThumbPointerDown("min")}
                  onTouchStart={() => handleThumbPointerDown("min")}
                />

                {/* Max thumb */}
                <div
                  className="absolute -top-[7px] w-[16px] h-[16px] bg-[#9EA4F9] rounded-full cursor-grab active:cursor-grabbing border-2 border-[#1c1c20] transition-transform hover:scale-110"
                  style={{
                    left: `calc(${toPercent(ageRange[1])}% - 8px)`,
                  }}
                  onMouseDown={() => handleThumbPointerDown("max")}
                  onTouchStart={() => handleThumbPointerDown("max")}
                />
              </div>

              {/* Min/Max labels */}
              <div className="flex justify-between text-[11px] text-[#A1A1AA] mt-3">
                <span>{AGE_MIN}</span>
                <span>{AGE_MAX}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;