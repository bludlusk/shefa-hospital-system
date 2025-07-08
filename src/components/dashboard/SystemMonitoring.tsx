'use client';

import React, { useState, useEffect } from 'react';
import { Server, Database, Wifi, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  lastChecked: string;
  icon: React.ReactNode;
}

const SystemMonitoring: React.FC = () => {
  const [systemStatuses, setSystemStatuses] = useState<SystemStatus[]>([]);

  useEffect(() => {
    const generateStatuses = (): SystemStatus[] => [
      {
        name: 'Web Server',
        status: 'online',
        uptime: '99.9%',
        lastChecked: 'Just now',
        icon: <Server className="h-5 w-5" />
      },
      {
        name: 'Database',
        status: 'online',
        uptime: '99.8%',
        lastChecked: '1 min ago',
        icon: <Database className="h-5 w-5" />
      },
      {
        name: 'Network',
        status: Math.random() > 0.7 ? 'warning' : 'online',
        uptime: '98.5%',
        lastChecked: '2 min ago',
        icon: <Wifi className="h-5 w-5" />
      },
      {
        name: 'Security',
        status: 'online',
        uptime: '100%',
        lastChecked: 'Just now',
        icon: <Shield className="h-5 w-5" />
      }
    ];

    setSystemStatuses(generateStatuses());

    // Update every 10 seconds
    const interval = setInterval(() => {
      setSystemStatuses(generateStatuses());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'offline':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'offline':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">System Monitoring</h3>
          <p className="text-sm text-gray-600">Real-time system health status</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStatuses.map((system, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStatusColor(system.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {system.icon}
                <span className="font-medium text-sm">{system.name}</span>
              </div>
              {getStatusIcon(system.status)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Uptime</span>
                <span className="text-xs font-bold">{system.uptime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Status</span>
                <span className="text-xs font-bold capitalize">{system.status}</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Last checked: {system.lastChecked}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <div className="text-sm text-gray-600">Overall Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Monitoring</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;