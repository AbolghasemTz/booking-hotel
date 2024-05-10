import { useEffect } from "react";

export default function useOutSideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handelOutSideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exeptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handelOutSideClick);
    return () => {
      document.addEventListener("mousedown", handelOutSideClick);
    };
  }, [ref, cb]);
}
