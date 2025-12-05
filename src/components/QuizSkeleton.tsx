import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const QuizSkeleton = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-3/4 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <div className="flex justify-between mt-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSkeleton;
