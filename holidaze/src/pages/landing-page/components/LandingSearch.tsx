import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/venues?query=${query.trim()}`);
    } else {
      navigate("/venues");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-md border border-grey-200 bg-white px-4 py-3 transition-colors focus-within:border-navy-800"
    >
      <Search size={18} className="shrink-0 font-bold text-navy-800 stroke-3" />

      <label htmlFor="landing-search" className="sr-only">
        Search for a venue
      </label>
      <input
        id="landing-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a venue"
        className="w-full bg-transparent text-base text-navy-900 outline-none placeholder:text-sm placeholder:text-grey-600"
      />
      <Button
        type="submit"
        variant="secondary"
        aria-label="Search venues"
      >
        Search
      </Button>
    </form>
  );
}
