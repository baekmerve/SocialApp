export default function CommentSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex space-x-3 animate-pulse">
          {/* Avatar */}
          <div className="size-8 bg-gray-300 dark:bg-gray-700 rounded-full" />

          {/* Comment Content */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
