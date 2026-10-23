import { useEffect, useState } from 'react';
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export default function useMediaQuery(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q), fn = e => setM(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [q]);
  return m;
}
