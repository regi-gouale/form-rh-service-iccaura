export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <svg
        className="w-1/4 h-1/4 text-black dark:text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120 12H16c0 3.042-1.385 5.801-3.536 7.636l-2.828-2.828z"
        ></path>
      </svg>
    </div>
  );
}
