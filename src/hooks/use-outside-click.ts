import { useEffect, type RefObject } from "react";

/** Calls `callback` on a mouse or touch press outside `ref` (from Aceternity / Motion Primitives). */
export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T | null>, callback: (event: Event) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}
