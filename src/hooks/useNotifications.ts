import { useState, useCallback } from 'react';
import { NotificationProps } from '@/components/ui/NotificationToast';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationProps, 'id' | 'onDismiss'>) => {
    const id = Date.now() + Math.random().toString();
    const newNotification: NotificationProps = {
      id,
      type: 'info',
      title: 'Notification',
      message: '',
      ...notification,
      onDismiss: () => {}
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    return addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string) => {
    return addNotification({ type: 'error', title, message });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string) => {
    return addNotification({ type: 'warning', title, message });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string) => {
    return addNotification({ type: 'info', title, message });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default useNotifications;