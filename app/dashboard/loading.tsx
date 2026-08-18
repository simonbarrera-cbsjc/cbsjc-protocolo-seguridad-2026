export default function DashboardLoading() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      
      {/* Top Welcome Banner Skeleton */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 skeleton-shimmer rounded-2xl shrink-0" />
            <div className="space-y-2">
              <div className="h-4 w-32 skeleton-shimmer rounded-full" />
              <div className="h-7 sm:h-8 w-64 sm:w-80 skeleton-shimmer rounded-xl" />
              <div className="h-4 w-48 skeleton-shimmer rounded-md" />
            </div>
          </div>
          <div className="h-10 w-44 skeleton-shimmer rounded-xl" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <div className="h-4 w-40 skeleton-shimmer rounded-md" />
            <div className="h-4 w-16 skeleton-shimmer rounded-md" />
          </div>
          <div className="h-3 w-full skeleton-shimmer rounded-full" />
        </div>
      </div>

      {/* Quick Tools Row Skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-48 skeleton-shimmer rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 skeleton-shimmer rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>

      {/* Modules Grid Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-6 w-56 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-72 skeleton-shimmer rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 skeleton-shimmer rounded-2xl" />
                  <div className="h-6 w-20 skeleton-shimmer rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-4/5 skeleton-shimmer rounded-lg" />
                  <div className="h-4 w-full skeleton-shimmer rounded-md" />
                  <div className="h-4 w-2/3 skeleton-shimmer rounded-md" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-4 w-24 skeleton-shimmer rounded-md" />
                <div className="h-10 w-28 skeleton-shimmer rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Certificate Banner Skeleton */}
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 skeleton-shimmer rounded-full shrink-0" />
          <div className="space-y-2">
            <div className="h-5 w-64 skeleton-shimmer rounded-md" />
            <div className="h-4 w-80 skeleton-shimmer rounded-md" />
          </div>
        </div>
        <div className="h-12 w-48 skeleton-shimmer rounded-xl shrink-0" />
      </div>

    </div>
  );
}
