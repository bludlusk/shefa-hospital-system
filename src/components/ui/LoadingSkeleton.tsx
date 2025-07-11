import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  rows = 3, 
  className = "" 
}) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;