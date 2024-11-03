import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col p-6 w-screen h-screen space-y-16">
      <Skeleton className="h-12 w-3/4 rounded-lg mx-auto" />

      <div className="flex flex-1 space-x-8 px-4">
        <div className="flex flex-col w-1/2 space-y-6">
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-11/12 rounded-lg" />
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <Skeleton className="h-8 w-5/6 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-4/5 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-11/12 rounded-lg" />
          <Skeleton className="h-8 w-3/4 rounded-lg" />
        </div>

        <div className="flex flex-col w-1/2 space-y-6">
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-11/12 rounded-lg" />
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <Skeleton className="h-8 w-5/6 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-4/5 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-11/12 rounded-lg" />
          <Skeleton className="h-8 w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
