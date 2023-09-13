export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="w-fit">
        <div className="inline-flex items-center px-2 py-2 font-semibold text-lg shadow rounded-md transition ease-in-out duration-150  scale-125">
          <svg
            className="animate-spin h-5 w-5 text-secondary-foreground"
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
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
  