
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  const uniqueId = React.useId();
  const gradientId = `gold-gradient-${uniqueId}`;
  const glowId = `glow-${uniqueId}`;

  return (
    <div className={`${className} select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Logo Kairós GC"
      >
        <defs>
          {/* Gradiente Dourado Metálico */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDB931" />
            <stop offset="20%" stopColor="#FFFFAC" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="80%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FDB931" />
          </linearGradient>
          
          {/* Sombra para efeito 3D */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
            <feFlood floodColor="black" floodOpacity="0.6" result="shadowColor" />
            <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadow" />
            <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grupo do ícone GC (Canto superior direito) - Sem o cubo */}
        <g transform="translate(200, 10) scale(0.65)">
             {/* Texto gc */}
             <text
               x="0"
               y="55"
               fontFamily="'Dancing Script', cursive"
               fontSize="70"
               fontWeight="700"
               fill={`url(#${gradientId})`}
               filter={`url(#${glowId})`}
             >
               gc
             </text>
        </g>

        {/* Texto Principal Kairós */}
        <text
          x="10"
          y="105"
          fontFamily="'Dancing Script', cursive"
          fontSize="100"
          fontWeight="700"
          fill={`url(#${gradientId})`}
          filter={`url(#${glowId})`}
          letterSpacing="-1"
        >
          Kairós
        </text>
      </svg>
    </div>
  );
};

export default Logo;
