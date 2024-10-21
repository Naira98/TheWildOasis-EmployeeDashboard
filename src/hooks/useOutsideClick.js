import { useEffect, useRef } from "react";

const useOutsideClick = (handler, capturingPhase = true) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("click", handleClick, capturingPhase);
    return () =>
      document.removeEventListener("click", handleClick, capturingPhase);
  }, [handler, capturingPhase]);
  return ref;
};

export default useOutsideClick;
