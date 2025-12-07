import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const SIZE_MAP = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '', onClick, selected }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative inline-block rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${SIZE_MAP[size]} ${className} ${selected ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;