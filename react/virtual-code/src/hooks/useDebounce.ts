import { useEffect, useState } from 'react';


function useTriggerDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useDebounce<T, R>(
  value: T,
  executor: (value: T) => Promise<R>
): R | '-99999999' | undefined {
  const [result, setResult] = useState<R | '-99999999'>();
  const debouncedValue = useTriggerDebounce<T>(value);
  useEffect(() => {
    executor(debouncedValue)
      .then((result) => {
        setResult(result);
      })
      .catch((error) => {
        setResult(undefined);
      });
    return () => {
      // release
    };
  }, [debouncedValue, executor]);
  return result;
}

export default useDebounce;
