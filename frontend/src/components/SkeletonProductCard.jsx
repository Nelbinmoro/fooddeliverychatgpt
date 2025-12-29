export default function SkeletonProductCard() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-48 bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />

        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-gray-200 rounded flex-1" />
          <div className="h-9 bg-gray-200 rounded flex-1" />
        </div>
      </div>
    </div>
  );
}
