'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type StatCounterProps = {
  value: string;
  durationMs?: number;
  className?: string;
};

const numericPattern = /^(\D*?)(-?\d+(?:[.,]\d+)?)(.*)$/;

export function StatCounter({ value, durationMs = 1400, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    const match = numericPattern.exec(value);
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const number = parseFloat(match[2].replace(',', '.'));
    const suffix = match[3];

    setDisplay(`${prefix}0${suffix}`);

    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const start = performance.now();
            function tick(now: number) {
              const elapsed = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - elapsed, 3);
              const current = number * eased;
              const formatted = Number.isInteger(number)
                ? Math.round(current).toString()
                : current.toFixed(1).replace('.', ',');
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (elapsed < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(value);
              }
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
