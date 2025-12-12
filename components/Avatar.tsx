
import React, { useState, useEffect } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-3xl',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '', onClick, selected }) => {
  const [imageError, setImageError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const hasImage = src && src.trim() !== '' && !imageError;

  return (
    <div 
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer select-none
        ${SIZE_MAP[size]} 
        ${className} 
        ${selected ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110' : 'border-gray-200 hover:border-gray-300'}
        ${!hasImage ? 'bg-indigo-700 text-white font-bold tracking-wider shadow-inner' : ''}
      `}
    >
      {hasImage ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{getInitials(alt)}</span>
      )}
    </div>
  );
};

export default Avatar;
