const StatueOfLiberty = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="22"
      y="50"
      width="20"
      height="10"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M32 14L36 8M32 14L28 18M32 14L26 12M32 14L38 12M32 14L32 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M28 24L32 14L36 22L40 48H24L28 24Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M36 26L44 22L46 30"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M28 20L22 14L20 8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export default StatueOfLiberty;
