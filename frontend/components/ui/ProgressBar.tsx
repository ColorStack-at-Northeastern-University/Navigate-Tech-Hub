/**
 * [MOCK FEATURE]
 * 
 * ProgressBar Component
 * 
 * Visual progress bar with percentage indicator.
 */

'use client';

interface ProgressBarProps {
  percentage: number;
  color?: 'teal' | 'orange' | 'red' | 'black';
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  teal: 'bg-colorstack-teal',
  orange: 'bg-colorstack-orange',
  red: 'bg-neu-red',
  black: 'bg-neu-black',
};

const heightClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export default function ProgressBar({
  percentage,
  color = 'teal',
  showLabel = true,
  height = 'md',
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[height]} overflow-hidden`}>
        <div
          className={`${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-sm text-gray-600 mt-1 font-medium">
          {percentage}% Complete
        </div>
      )}
    </div>
  );
}

