import React, { useState, useEffect } from 'react';

interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onDismiss 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss(id);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "max-w-sm p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm";
    const typeStyles = {
      success: "bg-green-50 border-green-400 text-green-800",
      error: "bg-red-50 border-red-400 text-red-800",
      warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
      info: "bg-blue-50 border-blue-400 text-blue-800"
    };
    
    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = () => {
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
    };
    return icons[type];
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={getToastStyles()}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-lg">{getIcon()}</span>
            <div>
              <h4 className="font-medium text-sm">{title}</h4>
              <p className="text-sm opacity-90 mt-1">{message}</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 text-gray-400 hover:text-gray-600 text-lg font-bold transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  notifications: NotificationProps[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          {...notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default NotificationToast;
export { ToastContainer };
export type { NotificationProps };