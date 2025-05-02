import React from 'react';

interface ActivityItemProps {
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  timestamp,
  icon,
  status = 'info'
}) => {
  const statusColors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="flex items-start pb-4 last:pb-0">
      {icon && (
        <div className={`p-2 rounded-full ${statusColors[status]} mr-3`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;