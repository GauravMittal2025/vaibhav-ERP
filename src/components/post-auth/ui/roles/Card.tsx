import React from 'react';
import { cn } from '../../../../utils/roles/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'bg-white border border-gray-200 rounded-lg shadow-sm',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'p-4 border-b border-gray-200',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <h3 
      className={cn(
        'text-lg font-semibold text-gray-900',
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <p 
      className={cn(
        'text-sm text-gray-500 mt-1',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'p-4',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'p-4 border-t border-gray-200',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};