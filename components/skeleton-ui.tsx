"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FileCardsSkeleton() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <Skeleton className="h-8 w-40 rounded mb-2" />
        <Skeleton className="h-10 w-32 rounded mb-2" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-primary/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-4 w-24 mt-4" />
                <Skeleton className="h-10 w-full mt-4 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountPageSkeleton() {
  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-56" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-56" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-56" />
              </div>

              <Skeleton className="h-6 w-full" />
            </CardContent>
          </Card>
        </section>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
