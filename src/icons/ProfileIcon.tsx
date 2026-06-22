import type { SVGProps } from "react";

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.4"
        d="M70.2669 28.6V51.3998C70.2669 55.1332 68.2669 58.6 65.0335 60.5L45.2335 71.9333C42.0002 73.7999 38.0002 73.7999 34.7335 71.9333L14.9335 60.5C11.7002 58.6333 9.7002 55.1665 9.7002 51.3998V28.6C9.7002 24.8666 11.7002 21.3998 14.9335 19.4998L34.7335 8.0665C37.9669 6.19984 41.9669 6.19984 45.2335 8.0665L65.0335 19.4998C68.2669 21.3998 70.2669 24.8333 70.2669 28.6Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M40.0001 40C44.2895 40 47.7667 36.5227 47.7667 32.2333C47.7667 27.9439 44.2895 24.4668 40.0001 24.4668C35.7107 24.4668 32.2334 27.9439 32.2334 32.2333C32.2334 36.5227 35.7107 40 40.0001 40Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M48.9335 55.5335C51.6335 55.5335 53.2002 52.5337 51.7002 50.3003C49.4335 46.9337 45.0335 44.667 40.0002 44.667C34.9669 44.667 30.5669 46.9337 28.3002 50.3003C26.8002 52.5337 28.3669 55.5335 31.0669 55.5335H48.9335Z"
        fill="url(#paint2_linear)"
      />

      <defs>
        <linearGradient
          id="paint0_linear"
          x1="39.9835"
          y1="6.6665"
          x2="39.9835"
          y2="73.3333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8777FF" />
          <stop offset="1" stopColor="#812DFF" />
        </linearGradient>

        <linearGradient
          id="paint1_linear"
          x1="40.0001"
          y1="24.4668"
          x2="40.0001"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8777FF" />
          <stop offset="1" stopColor="#812DFF" />
        </linearGradient>

        <linearGradient
          id="paint2_linear"
          x1="40.0002"
          y1="44.667"
          x2="40.0002"
          y2="55.5335"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8777FF" />
          <stop offset="1" stopColor="#812DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProfileIcon;
