import React from 'react';
import { getInitials } from '../../../utils/employee/helpers';
interface AvatarProps {
  src?: string;
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'active' | 'inactive' | 'on leave';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  firstName,
  lastName,
  size = 'md',
  status
}) => {
  const initials = getInitials(firstName, lastName);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };
  
  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    'on leave': 'bg-yellow-500',
  };
  
  return (
    <div className="relative">
      {src ? (
        <img
          src={src}
          alt={`${firstName} ${lastName}`}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium`}>
          {initials}
        </div>
      )}
      
      {status && (
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusColors[status]}`} />
      )}
    </div>
  );
};

export default Avatar;