import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      viewBox="0 0 120 100" 
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GC Logo"
    >
      <text 
        x="50%" 
        y="60%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="'Dancing Script', cursive" 
        fontSize="75"
        fontWeight="700"
      >
        gc
      </text>
    </svg>
  );
};

export default Logo;