// AnimatedLogo.tsx

interface AnimatedLogoProps {
  width?: number;
  height?: number;
}

const AnimatedLogo = ({ width = 35, height = 35 }: AnimatedLogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-logo"
      aria-labelledby="title desc"
      role="img"
    >
      <desc id="desc">
        A circular logo for SafePath with a green 'S' in the center and stylized text along the circular path.
      </desc>

      {/* Circular Background */}
      <circle cx="100" cy="100" r="100" fill="#20A164" />

      {/* Pathway Element (Circular Path) */}
      <path
        d="
          M 100,10
          A 90,90 0 1,1 99.99,10
          Z"
        fill="#20A164"
        className="pathway-circle"
      />

      {/* SafePath Text (Curved Along the Path) */}
      <defs>
        {/* Define a circular path for the text */}
        <path
          id="textPath"
          d="
            M 100,10
            A 90,90 0 1,1 99.99,10
          "
        />
      </defs>

      {/* Centered 'S' */}
      <text
        x="100"
        y="135"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="90"
        fontWeight="bold"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        className="center-s"
      >
        SP
      </text>
    </svg>
  );
};

export default AnimatedLogo;
