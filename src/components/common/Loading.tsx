interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export function Loading({ fullScreen = false, message = 'Loading...' }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${fullScreen ? 'fixed inset-0 z-9999 bg-white/80 backdrop-blur-md dark:bg-gray-900/80' : 'p-8'}`}>
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-2xl border-4 border-accent/20 dark:border-accent-dark/20"></div>
        <div className="absolute inset-0 rounded-2xl border-4 border-accent border-t-transparent animate-spin shadow-lg shadow-accent/20 dark:shadow-none"></div>
      </div>
      <p className="text-xs font-extrabold text-gray-400 uppercase tracking-[0.4em] font-rubik animate-pulse dark:text-gray-500 pl-1">{message}</p>
    </div>
  );
}
