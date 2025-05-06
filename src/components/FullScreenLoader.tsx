'use client';

import { Loader2 } from 'lucide-react';

interface FullScreenLoaderProps {
  isLoading: boolean;
}

export function FullScreenLoader({ isLoading }: FullScreenLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" role='status'/>
        <p className="text-lg font-medium text-gray-200">Loading...</p>
      </div>
    </div>
  );
}
