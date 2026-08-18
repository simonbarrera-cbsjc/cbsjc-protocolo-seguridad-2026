export default function ModuloLoading() {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      
      {/* Top Header & Breadcrumb Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 skeleton-shimmer rounded-xl shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-28 skeleton-shimmer rounded-md" />
            <div className="h-6 sm:h-7 w-64 sm:w-80 skeleton-shimmer rounded-lg" />
          </div>
        </div>
        <div className="h-8 w-32 skeleton-shimmer rounded-full" />
      </div>

      {/* 3 Steps Stepper Skeleton */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-white border border-slate-200">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-11 sm:h-12 skeleton-shimmer rounded-xl" />
        ))}
      </div>

      {/* Main Interactive Stage Skeleton */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        
        {/* Stage Header */}
        <div className="space-y-3 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-36 skeleton-shimmer rounded-md" />
          </div>
          <div className="h-7 sm:h-8 w-3/4 skeleton-shimmer rounded-xl" />
          <div className="h-4 w-full skeleton-shimmer rounded-md" />
        </div>

        {/* Dynamic Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 skeleton-shimmer rounded-2xl border border-slate-100" />
          ))}
        </div>

      </div>

      {/* Bottom Navigation Actions Skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-11 w-32 skeleton-shimmer rounded-xl" />
        <div className="h-11 w-40 skeleton-shimmer rounded-xl" />
      </div>

    </div>
  );
}
