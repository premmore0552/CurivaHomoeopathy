import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-border rounded-lg ${className}`} />
);

export const SkeletonPost = () => (
  <div className="space-y-6">
    <Skeleton className="h-64 w-full rounded-3xl" />
    <div className="space-y-3 px-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-bg-secondary rounded-[2rem] border border-border p-6 shadow-sm overflow-hidden h-full">
    <Skeleton className="aspect-video w-full rounded-2xl mb-6" />
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-between pt-4">
        <Skeleton className="h-8 w-24 rounded-xl" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);
