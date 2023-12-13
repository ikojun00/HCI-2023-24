interface ArrowProps{
    active: Boolean,
}

export default function Arrow({active}: ArrowProps) {
  return (
    <div className={`transition-all duration-500 ${active && "-rotate-180"}`}>
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 8"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
        />
      </svg>
    </div>
  );
}
