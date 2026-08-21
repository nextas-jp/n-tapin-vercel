export function Logo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      overflow="visible"
      preserveAspectRatio="none"
      viewBox="0 0 78 78"
      {...props}
    >
      { props.title ? <title>{props.title}</title> : null }
      <path
        fill="url(#a)"
        stroke="#3f3f46"
        strokeWidth={0.725}
        d="M60.296.363H17.763c-9.61 0-17.4 7.79-17.4 17.4v42.533c0 9.61 7.79 17.4 17.4 17.4h42.533c9.61 0 17.4-7.79 17.4-17.4V17.763c0-9.61-7.79-17.4-17.4-17.4Z"
      />
      <path
        fill="url(#b)"
        d="M39.03 65.613c14.68 0 26.582-11.902 26.582-26.584 0-14.681-11.901-26.583-26.583-26.583S12.446 24.348 12.446 39.029c0 14.682 11.902 26.583 26.583 26.583"
        opacity={0.85}
      />
      <path
        stroke="#fdf4ff"
        strokeWidth={0.967}
        d="M39.03 60.78c12.011 0 21.75-9.739 21.75-21.75 0-12.013-9.739-21.75-21.75-21.75-12.013 0-21.75 9.737-21.75 21.75 0 12.011 9.737 21.75 21.75 21.75Z"
        opacity={0.9}
      />
      <path
        stroke="#f0abfc"
        strokeWidth={1.933}
        d="M39.03 52.563c7.473 0 13.532-6.06 13.532-13.534S46.504 25.496 39.03 25.496s-13.533 6.059-13.533 13.533 6.059 13.533 13.533 13.533Z"
        opacity={0.9}
      />
      <foreignObject width={0} height={0} x={0} y={0}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backdropFilter: "blur(0)",
            clipPath: "url(#c)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        fill="#fff"
        d="M39.03 45.796a6.767 6.767 0 1 0 0-13.533 6.767 6.767 0 0 0 0 13.533"
        data-figma-bg-blur-radius={0}
      />
      <defs>
        <radialGradient
          id="b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="translate(39.03 39.03)scale(26.5833)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d946ef" />
          <stop offset={0.5} stopColor="#a855f7" stopOpacity={0.8} />
          <stop offset={1} stopColor="#7e22ce" stopOpacity={0} />
        </radialGradient>
        <linearGradient
          id="a"
          x1={0.362}
          x2={77.696}
          y1={0.362}
          y2={77.696}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2a2a35" />
          <stop offset={1} stopColor="#14141a" />
        </linearGradient>
        <clipPath id="c">
          <path d="M39.03 45.796a6.767 6.767 0 1 0 0-13.533 6.767 6.767 0 0 0 0 13.533" />
        </clipPath>
      </defs>
    </svg>
  );
}