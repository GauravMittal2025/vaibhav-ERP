import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'card',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('border-b border-gray-200 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn('text-lg font-medium', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm text-gray-500', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('border-t border-gray-200 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};