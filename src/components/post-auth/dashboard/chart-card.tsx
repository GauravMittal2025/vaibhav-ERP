import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  className,
  actions,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};