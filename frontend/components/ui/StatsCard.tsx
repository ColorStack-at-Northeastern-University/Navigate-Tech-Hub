/**
 * [DEMO UI ENHANCEMENTS - Hero Redesign]
 * 
 * StatsCard Component
 * 
 * Displays platform statistics with animated count-up effect.
 * Used in the hero section to showcase value proposition.
 */

'use client';

import { useEffect, useState } from 'react';

interface Stat {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

interface StatsCardProps {
  stats: Stat[];
}

export default function StatsCard({ stats }: StatsCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 animate-scale-in animation-delay-300">
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <div className="text-3xl font-bold text-neu-red">
                {isVisible ? (
                  <CountUp end={stat.value} duration={1000 + index * 200} />
                ) : (
                  0
                )}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Simple count-up animation component
 */
function CountUp({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(startCount + (end - startCount) * easeOutQuad(progress));

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

