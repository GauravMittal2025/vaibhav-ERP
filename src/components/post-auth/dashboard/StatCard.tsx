import React, { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'teal';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
    purple: 'bg-purple-50 text-purple-700',
    teal: 'bg-teal-50 text-teal-700'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
        </div>
      </div>
      
      {typeof change !== 'undefined' && (
        <div className="mt-4 flex items-center">
          {change >= 0 ? (
            <ArrowUp size={16} className="text-green-500" />
          ) : (
            <ArrowDown size={16} className="text-red-500" />
          )}
          <span 
            className={`text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {Math.abs(change)}%
          </span>
          
          {changeLabel && (
            <span className="text-sm text-gray-500 ml-1.5">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;