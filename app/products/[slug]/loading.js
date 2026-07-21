export default function Loading() {
  return (
    <div className="flex-1 bg-white min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Memuat produk...</p>
      </div>
    </div>
  );
}
