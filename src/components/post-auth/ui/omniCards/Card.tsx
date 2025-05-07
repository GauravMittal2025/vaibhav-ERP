import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-5 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-5 py-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-5 py-3 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;