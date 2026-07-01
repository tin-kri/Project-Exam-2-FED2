
import { useState, useEffect } from "react";
 
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounce, setDebounce] = useState<T>(value);
 
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
 
  return debounce;
}
