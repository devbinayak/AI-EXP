import type React from 'react';

const TeengerLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="150"
    height="40"
    viewBox="0 0 150 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <style>
      {`
        @keyframes drawPath {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .draw-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawPath 2s ease-out forwards;
        }
        .fill-animation {
          opacity: 0;
          animation: fillIn 1s ease-out 1.5s forwards;
        }
        @keyframes fillIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}
    </style>
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      fontFamily="Poppins, sans-serif"
      fontSize="30"
      fontWeight="600"
      fill="url(#logoGradient)"
      x="0"
      y="30"
      className="fill-animation"
    >
      Teenger
    </text>
    <path
      d="M5 35 Q 75 30 145 35"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      fill="transparent"
      className="draw-animation"
      style={{ animationDelay: '0.5s' }}
    />
  </svg>
);

export default TeengerLogo;
