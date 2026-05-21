export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <span className="loading loading-spinner loading-lg text-blue-600" />
        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
