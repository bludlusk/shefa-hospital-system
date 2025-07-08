'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const userRole = localStorage.getItem('userRole');

      if (!isAuthenticated || !userRole) {
        router.push(redirectTo);
        return;
      }

      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
          case 'admin':
            router.push('/admin-dashboard');
            break;
          case 'doctor':
            router.push('/doctor-dashboard');
            break;
          case 'nurse':
            router.push('/nurse-dashboard');
            break;
          case 'patient':
            router.push('/patient');
            break;
          case 'technician':
            router.push('/technician-dashboard');
            break;
          default:
            router.push('/login');
        }
        return;
      }

      setIsAuthorized(true);
      setLoading(false);
    };

    checkAuth();
  }, [allowedRoles, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;
