'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Activity, BarChart3, PieChart } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const DashboardCharts: React.FC = () => {
  const [systemUsageData, setSystemUsageData] = useState<number[]>([]);
  const [staffActivityData, setStaffActivityData] = useState<ChartData[]>([]);

  useEffect(() => {
    const generateRealisticSystemUsage = () => {
      const baseUsage = [
        { day: 'Mon', usage: 85 },
        { day: 'Tue', usage: 92 },
        { day: 'Wed', usage: 88 },
        { day: 'Thu', usage: 95 },
        { day: 'Fri', usage: 90 },
        { day: 'Sat', usage: 75 },
        { day: 'Sun', usage: 68 }
      ];
      
      return baseUsage.map(item => 
        Math.min(100, Math.max(50, item.usage + (Math.random() * 6 - 3)))
      );
    };

    const generateStaffActivity = () => [
      { label: 'Doctors', value: 45, color: 'bg-blue-500' },
      { label: 'Nurses', value: 78, color: 'bg-green-500' },
      { label: 'Technicians', value: 23, color: 'bg-purple-500' },
      { label: 'Admin', value: 12, color: 'bg-orange-500' }
    ];

    setSystemUsageData(generateRealisticSystemUsage());
    setStaffActivityData(generateStaffActivity());

    const interval = setInterval(() => {
      setSystemUsageData(generateRealisticSystemUsage());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const maxUsage = Math.max(...systemUsageData);
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">System Usage</h3>
            <p className="text-sm text-gray-600">Weekly hospital system performance</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="space-y-4">
          {systemUsageData.map((usage, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 w-16">
                {weekDays[index].slice(0, 3)}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    usage >= 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    usage >= 80 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                  style={{ width: `${(usage / maxUsage) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-gray-900 w-12">
                {Math.round(usage)}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Stable performance</span>
          </div>
          <span className="text-gray-500">Updates every 30s</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Staff Activity</h3>
            <p className="text-sm text-gray-600">Current active staff by role</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg">
            <PieChart className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="space-y-4">
          {staffActivityData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-900">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / 100) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-900 w-8">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Active Staff</span>
            <span className="text-lg font-bold text-gray-900">
              {staffActivityData.reduce((sum, item) => sum + item.value, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
