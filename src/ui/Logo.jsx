import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-1">
      <svg
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 511.987 511.987"
        xmlSpace="preserve"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          <g>
            <path
              style={{ fill: "#8D9094" }}
              d="M420.38,368.82l-32.437-51.561l-65.779-9.328l-8,182.213l132.902,0.516v-32.108l-11.983-15.843 c0,0-86.42-9.938-80.92-53.452C359.679,345.524,420.38,368.82,420.38,368.82z"
            />
            <polygon
              style={{ fill: "#8D9094" }}
              points="275.775,255.996 209.121,255.996 156.701,152.719 279.697,118.735 "
            />
          </g>
          <path
            style={{ opacity: "0.1", enableBackground: "new" }}
            d="M277.213,205.717c-39.264-9.563-88.997,9.093-88.997,9.093l3.734,7.344 l17.171,33.843h34.156l32.826-11.359L277.213,205.717z"
          />
          <path
            style={{ fill: "#D83436" }}
            d="M62.454,403.538l76.903-100.356c0,0,8.422-186.243,199.775-128.339L489.097,40.878 C-0.013-137.023-25.543,318.212,62.454,403.538z"
          />
          <path
            style={{ fill: "#C60003" }}
            d="M477.738,51.034l11.358-10.156c-489.109-177.9-514.64,277.334-426.643,362.66l3.281-4.297 C3.956,276.698,56.016-83.696,477.738,51.034z"
          />
          <path
            style={{ fill: "#ABADB1" }}
            d="M339.288,361.992c47.312-54.061,105.31,79.139,107.591,78.56 c2.25-0.577-16.249-124.714-16.249-124.714s-11.343-102.513-107.247-110.153c-176.51-14.078-175.604,127.636-175.604,127.636 v135.995h106.669l63.997,42.671h106.653l0.031-42.499l-15.187-16.827C409.943,452.661,292.416,415.554,339.288,361.992z"
          />
          <path
            style={{ opacity: "0.2", fill: "#FFFFFF", enableBackground: "new" }}
            d="M446.879,440.552c2.25-0.577-16.249-124.714-16.249-124.714 s-11.343-102.513-107.247-110.153c-88.887-7.094-132.776,25.326-154.464,59.264c0,0,93.029-69.014,189.682-19.75 C435.894,284.589,445.754,440.833,446.879,440.552z"
          />
        </g>
      </svg>
      <p className="font-heading dark:text-charcoal-100 text-[24px] font-bold 2xl:text-4xl">
        CipherArmor
      </p>
    </Link>
  );
}

export default Logo;
