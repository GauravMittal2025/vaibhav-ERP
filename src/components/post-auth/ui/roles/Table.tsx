import React from 'react';
import { cn } from '../../../../utils/roles/helpers';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div className="overflow-x-auto">
      <table 
        className={cn(
          'w-full text-sm text-left',
          className
        )} 
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <thead 
      className={cn(
        'bg-gray-50 text-gray-700',
        className
      )} 
      {...props}
    >
      {children}
    </thead>
  );
};

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <tbody 
      className={cn(
        'divide-y divide-gray-200',
        className
      )} 
      {...props}
    >
      {children}
    </tbody>
  );
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <tr 
      className={cn(
        'hover:bg-gray-50 transition-colors',
        className
      )} 
      {...props}
    >
      {children}
    </tr>
  );
};

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <th 
      className={cn(
        'px-4 py-3 font-medium',
        className
      )} 
      {...props}
    >
      {children}
    </th>
  );
};

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <td 
      className={cn(
        'px-4 py-3',
        className
      )} 
      {...props}
    >
      {children}
    </td>
  );
};

interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TablePagination: React.FC<TablePaginationProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};