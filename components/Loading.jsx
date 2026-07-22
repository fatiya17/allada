export default function Loading({ message = "Memuat data...", minHeight = "70vh" }) {
  return (
    <div 
      className="flex-1 bg-white flex items-center justify-center"
      style={{ minHeight }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">{message}</p>
      </div>
    </div>
  );
}
