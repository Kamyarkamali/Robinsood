const BigBen = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="24"
      y="12"
      width="16"
      height="48"
      rx="1"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path d="M28 12L32 4L36 12" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="22" r="5" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M32 22V19M32 22L35 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 32H40M24 42H40M24 52H40"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default BigBen;
