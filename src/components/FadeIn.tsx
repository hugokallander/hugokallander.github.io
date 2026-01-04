import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  noVertical?: boolean;
  threshold?: number;
  onVisible?: () => void;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  className, 
  noVertical = false, 
  duration = 1000, 
  threshold = 0.2,
  onVisible 
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "-20% 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        !noVertical && (isVisible ? "translate-y-0" : "translate-y-10"),
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};
