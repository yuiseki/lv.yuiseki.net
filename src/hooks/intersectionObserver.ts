import { useCallback, useEffect, useRef } from 'react';


export const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLElement>,
  onIntersect?: () => void
) => {
  const callback: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (onIntersect) {
            onIntersect();
          }
          observer.unobserve(entry.target);
        }
      });
    },
    [onIntersect]
  );

  const observerRef = useRef(
    new IntersectionObserver(callback, {
      root: targetRef.current,
      rootMargin: '15px',
      threshold: 0.5,
    })
  );

  useEffect(() => {
    if (!targetRef.current || !observerRef.current) {
      return;
    }
    const observer = observerRef.current;
    const targetElement = targetRef.current;
    observer.observe(targetElement);
    return () => {
      observer.unobserve(targetElement);
    };
  }, [observerRef, targetRef]);
};
