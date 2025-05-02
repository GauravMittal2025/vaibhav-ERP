import React, { ReactNode } from 'react';
import Card from '../ui/Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  children, 
  icon, 
  className = '' 
}) => {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      icon={icon}
      className={`h-full ${className}`}
    >
      <div className="h-72">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;