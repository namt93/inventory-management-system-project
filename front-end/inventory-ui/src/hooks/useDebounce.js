import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
