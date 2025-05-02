import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
            {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-success-600' : 'text-error-600'
                  )}
                >
                  {trend.isPositive ? (
                    <TrendingUp size={14} className="inline mr-1" />
                  ) : (
                    <TrendingDown size={14} className="inline mr-1" />
                  )}
                  {trend.value}%
                </span>
                <span className="text-xs text-gray-500">since last month</span>
              </div>
            )}
          </div>
          <div className="rounded-lg bg-primary-50 p-3 text-primary-500">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};