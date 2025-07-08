'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Users, Activity, BarChart, Database, Shield, LogOut, Bell, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { ToastContainer } from '@/components/ui/NotificationToast';
import useNotifications from '@/hooks/useNotifications';
import DataTable from '@/components/ui/DataTable';
import DashboardCharts from '@/components/charts/DashboardCharts';
import SystemMonitoring from '@/components/dashboard/SystemMonitoring';

// Define interfaces for type safety
interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  department: string;
  joinDate: string;
  phone: string;
}

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: string;
  icon: React.ReactNode;
}

const mockStaffData: StaffMember[] = [
  {
    id: "ST001",
    name: "Ahmed Hassan",
    role: "Doctor",
    email: "ahmed.hassan@shefa.ly",
    status: "Active",
    department: "Cardiology",
    joinDate: "2024-01-15",
    phone: "+218-91-234-5678"
  },
  {
    id: "ST002",
    name: "Fatima Ali",
    role: "Nurse",
    email: "fatima.ali@shefa.ly",
    status: "Active",
    department: "Emergency",
    joinDate: "2024-03-20",
    phone: "+218-91-234-5679"
  },
  {
    id: "ST003",
    name: "Omar Khaled",
    role: "Technician",
    email: "omar.khaled@shefa.ly",
    status: "Inactive",
    department: "Laboratory",
    joinDate: "2023-11-10",
    phone: "+218-91-234-5680"
  },
  {
    id: "ST004",
    name: "Layla Mohamed",
    role: "Admin",
    email: "layla.mohamed@shefa.ly",
    status: "Active",
    department: "Administration",
    joinDate: "2023-08-05",
    phone: "+218-91-234-5681"
  },
  {
    id: "ST005",
    name: "Yusuf Ibrahim",
    role: "Doctor",
    email: "yusuf.ibrahim@shefa.ly",
    status: "Active",
    department: "Pediatrics",
    joinDate: "2024-05-12",
    phone: "+218-91-234-5682"
  },
  {
    id: "ST006",
    name: "Sara Ahmed",
    role: "Nurse",
    email: "sara.ahmed@shefa.ly",
    status: "Active",
    department: "Surgery",
    joinDate: "2024-07-18",
    phone: "+218-91-234-5683"
  }
];

const recentActivities: Activity[] = [
  {
    id: 1,
    action: "New patient registered",
    user: "Dr. Ahmed Hassan",
    time: "2 minutes ago",
    type: "success",
    icon: <Users className="h-4 w-4" />
  },
  {
    id: 2,
    action: "System backup completed",
    user: "System",
    time: "15 minutes ago",
    type: "info",
    icon: <Database className="h-4 w-4" />
  },
  {
    id: 3,
    action: "Staff schedule updated",
    user: "Admin",
    time: "1 hour ago",
    type: "warning",
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: 4,
    action: "Security scan completed",
    user: "System",
    time: "2 hours ago",
    type: "success",
    icon: <Shield className="h-4 w-4" />
  },
  {
    id: 5,
    action: "Equipment maintenance scheduled",
    user: "Tech Team",
    time: "3 hours ago",
    type: "info",
    icon: <AlertCircle className="h-4 w-4" />
  }
];

export default function AdminDashboard() {
  const { notifications, removeNotification, showSuccess, showWarning, showInfo } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLogout = () => {
    showInfo('Logging out...', 'You will be redirected to login page');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/login';
      }
    }, 1500);
  };

  const handleManageUsers = () => {
    showSuccess('User Management', 'Opening user management panel...');
  };

  const handleSecuritySettings = () => {
    showWarning('Security Settings', 'This feature requires administrator privileges');
  };

  const handleDatabaseManagement = () => {
    showInfo('Database Status', 'All database connections are healthy');
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <LoadingSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard | لوحة تحكم المدير</h1>
                <p className="text-sm text-gray-600">Shefa Hospital Libya Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => showInfo('Notifications', 'No new notifications at this time')}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm opacity-90">Total Patients | إجمالي المرضى</div>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm opacity-90">Available Beds | الأسرة المتاحة</div>
              </div>
              <Database className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm opacity-90">Today&apos;s Appointments | مواعيد اليوم</div>
              </div>
              <Activity className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-90">Emergency Cases | حالات الطوارئ</div>
              </div>
              <AlertCircle className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">2.4M LYD</div>
                <div className="text-sm opacity-90">Monthly Revenue | الإيرادات الشهرية</div>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Staff | إجمالي الموظفين"
            value="156"
            icon={<Users className="h-8 w-8" />}
            trend={12}
            color="blue"
            subtitle="Active employees | الموظفون النشطون"
            onClick={() => showSuccess('Staff Overview', 'Total staff count updated successfully')}
          />
          
          <DashboardCard
            title="Active Users | المستخدمون النشطون"
            value="89"
            icon={<Activity className="h-8 w-8" />}
            trend={8}
            color="green"
            subtitle="Currently online | متصلون حالياً"
            onClick={() => showInfo('User Activity', 'Showing real-time active users')}
          />
          
          <DashboardCard
            title="System Usage | استخدام النظام"
            value="94%"
            icon={<BarChart className="h-8 w-8" />}
            trend={-2}
            color="purple"
            subtitle="Server performance | أداء الخادم"
            onClick={() => showWarning('System Load', 'System usage is approaching capacity')}
          />
          
          <DashboardCard
            title="Database Health | حالة قاعدة البيانات"
            value="Excellent"
            icon={<Database className="h-8 w-8" />}
            trend={5}
            color="orange"
            subtitle="All systems operational | جميع الأنظمة تعمل"
            onClick={() => showSuccess('Database Status', 'All database connections are healthy')}
          />
        </div>

        {/* Charts and Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Charts take 2 columns */}
          <div className="lg:col-span-2">
            <DashboardCharts />
          </div>
          
          {/* Recent Activity takes 1 column */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Activities | الأنشطة الحديثة</h3>
                <p className="text-sm text-gray-600">Latest hospital activities | أحدث أنشطة المستشفى</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full ${getActivityTypeColor(activity.type)}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => showInfo('Activity Log', 'Opening full activity history...')}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Activities → | عرض جميع الأنشطة
              </button>
            </div>
          </div>
        </div>

                {/* System Monitoring */}
        <SystemMonitoring />

        {/* Admin Functions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">System Administration | إدارة النظام</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={handleManageUsers}
              className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105 border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Manage hospital users and staff accounts"
            >
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <div className="font-medium text-gray-900 mb-1">Manage Users</div>
              <div className="text-sm text-gray-600">إدارة المستخدمين</div>
            </button>
            
            <button 
              onClick={handleSecuritySettings}
              className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 hover:scale-105 border border-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              aria-label="Configure security settings and permissions"
            >
              <Shield className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <div className="font-medium text-gray-900 mb-1">Security Settings</div>
              <div className="text-sm text-gray-600">إعدادات الأمان</div>
            </button>
            
            <button 
              onClick={handleDatabaseManagement}
              className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200 hover:scale-105 border border-purple-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              aria-label="Database management and monitoring"
            >
              <Database className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <div className="font-medium text-gray-900 mb-1">Database Management</div>
              <div className="text-sm text-gray-600">إدارة قاعدة البيانات</div>
            </button>
          </div>
        </div>

        {/* Staff Management Table */}
        <DataTable
          data={mockStaffData}
          title="Staff Management | إدارة الموظفين"
          columns={[
            { key: 'id', label: 'Staff ID | معرف الموظف' },
            { key: 'name', label: 'Name | الاسم' },
            { key: 'role', label: 'Role | المنصب' },
            { key: 'department', label: 'Department | القسم' },
            { key: 'email', label: 'Email | البريد الإلكتروني' },
            { 
              key: 'status', 
              label: 'Status | الحالة',
              render: (value: string) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  value === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {value}
                </span>
              )
            },
            { key: 'joinDate', label: 'Join Date | تاريخ الانضمام' }
          ]}
          searchable={true}
          filterOptions={[
            { key: 'status', value: 'Active', label: 'Active' },
            { key: 'status', value: 'Inactive', label: 'Inactive' }
          ]}
          onAdd={() => showInfo('Add Staff', 'Opening staff registration form...')}
          onEdit={(staff: StaffMember) => showInfo('Edit Staff', `Editing ${staff.name}'s information`)}
          onDelete={(staff: StaffMember) => showWarning('Delete Staff', `Are you sure you want to remove ${staff.name}?`)}
        />
      </div>

      {/* Toast Notifications */}
      <ToastContainer 
        notifications={notifications} 
        onDismiss={removeNotification} 
      />
    </div>
  );
}