import { useEffect, useRef, useState } from 'react';

type PropsTypes = {
  backgroundPath: string;
  threshold?: number;
};

type ReturningTypes = {
  isBackgroundLoaded: boolean;
  observedElement: React.RefObject<HTMLDivElement>;
};

export default function useLazyLoadBackground({
  backgroundPath,
  threshold = 0.1,
}: PropsTypes): ReturningTypes {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const observedElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observedElement.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const backgroundImage = new Image();
          backgroundImage.src = backgroundPath;
          backgroundImage.onload = () => {
            setIsBackgroundLoaded(true);
            observer.observe(element);
          };
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [backgroundPath, threshold]);

  return { isBackgroundLoaded, observedElement };
}
