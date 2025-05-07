import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Notification } from '../../../types';

interface NotificationToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Fade in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    // Give time for fade-out animation before removing
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300);
  };
  
  const { type, message, id } = notification;
  
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };
  
  const borderColors = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
  };
  
  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${borderColors[type]} flex items-start max-w-md w-full`}>
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm text-gray-800">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150 ease-in-out"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;