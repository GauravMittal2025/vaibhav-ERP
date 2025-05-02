import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  footer,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {(title || subtitle || icon) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-gray-500">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

export default Card;