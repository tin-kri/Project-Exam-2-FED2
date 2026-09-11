import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 mt-12 rounded-md border border-grey-200 bg-white px-4 py-3 transition-colors focus-within:border-navy-800">
      <Search size={18} className="shrink-0 font-bold text-navy-800 stroke-3" />
      <label htmlFor="search-venues" className="sr-only">
        Search for a venue
      </label>
      <input
        id="search-venues"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a venue"
        className="w-full bg-transparent text-base text-navy-900 outline-none placeholder:text-grey-600 placeholder:text-sm "
      />
    </div>
  );
}
