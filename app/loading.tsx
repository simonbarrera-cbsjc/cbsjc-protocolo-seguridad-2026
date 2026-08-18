export default function RootLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[60vh] max-w-5xl mx-auto w-full space-y-8 animate-fade-in">
      
      {/* Top Badge Skeleton */}
      <div className="h-7 w-64 skeleton-shimmer rounded-full" />

      {/* Main Title Skeletons */}
      <div className="space-y-3 w-full flex flex-col items-center">
        <div className="h-10 sm:h-12 w-3/4 max-w-xl skeleton-shimmer rounded-2xl" />
        <div className="h-4 sm:h-5 w-5/6 max-w-lg skeleton-shimmer rounded-lg" />
        <div className="h-4 w-2/3 max-w-md skeleton-shimmer rounded-lg" />
      </div>

      {/* Center Card or 3D Placeholder Skeleton */}
      <div className="w-full max-w-2xl h-56 sm:h-72 skeleton-shimmer rounded-[32px] border border-slate-200 shadow-sm" />

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 skeleton-shimmer rounded-full" />
              <div className="h-5 w-16 skeleton-shimmer rounded-full" />
            </div>
            <div className="h-5 w-3/4 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-full skeleton-shimmer rounded-md" />
            <div className="h-4 w-4/5 skeleton-shimmer rounded-md" />
          </div>
        ))}
      </div>

    </div>
  );
}
