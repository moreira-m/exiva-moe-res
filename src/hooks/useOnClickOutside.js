import { useEffect } from 'react';

export default function useOnClickOutside(refs, handler, active = true) {
  useEffect(() => {
    if (!active) return;
    const refArray = Array.isArray(refs) ? refs : [refs];
    function listener(event) {
      if (refArray.some(ref => ref.current && ref.current.contains(event.target))) {
        return;
      }
      handler(event);
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler, active]);
}
