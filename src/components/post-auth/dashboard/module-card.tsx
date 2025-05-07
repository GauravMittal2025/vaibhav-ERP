import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  badge?: {
    text: string | number;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  href,
  color = 'primary',
  badge,
  className,
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-500 hover:bg-primary-100',
    secondary: 'bg-secondary-50 text-secondary-500 hover:bg-secondary-100',
    accent: 'bg-accent-50 text-accent-500 hover:bg-accent-100',
    success: 'bg-success-50 text-success-500 hover:bg-success-100',
    warning: 'bg-warning-50 text-warning-500 hover:bg-warning-100',
    error: 'bg-error-50 text-error-500 hover:bg-error-100',
  };

  return (
    <Link to={href}>
      <Card className={cn('h-full transition-all duration-300 hover:shadow-lg', className)}>
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className={cn('rounded-lg p-3', colorClasses[color])}>
              {icon}
            </div>
            {badge && (
              <Badge variant={badge.variant || 'primary'} size="sm">
                {badge.text}
              </Badge>
            )}
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
          <p className="mb-4 flex-1 text-sm text-gray-500">{description}</p>
          <div className="mt-auto flex items-center text-sm font-medium text-primary-600">
            View module
            <ArrowRight size={16} className="ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};