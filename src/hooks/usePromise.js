import { useEffect, useMemo, useState } from "react";

export function usePromise(fx) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const promise = useMemo(() => fx(), [fx]);

  useEffect(() => {
    let canceled = false;

    setValue(null);
    setError(null);
    setIsLoading(true);

    promise
      .then((value) => {
        if (canceled) return;
        setValue(value);
      })
      .catch((error) => {
        if (canceled) return;
        setError(error);
      });

    return () => {
      canceled = true;
    };
  }, [promise]);

  return { value, error, isLoading };
}
