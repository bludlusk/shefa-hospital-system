'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Activity, 
  Clock, 
  Search,
  Plus,
  Filter,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  Heart,
  Pill,
  ClipboardList,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DataTable from '@/components/ui/DataTable';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { ToastContainer } from '@/components/ui/NotificationToast';
import useNotifications from '@/hooks/useNotifications';

// Generate current dates for 2025
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getRandomFutureDate = (daysAhead: number) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * daysAhead) + 1;
  const date = new Date(today);
  date.setDate(today.getDate() + randomDays);
  return date.toISOString().split('T')[0];
};

const getRandomPastDate = (daysBack: number) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * daysBack) + 1;
  const date = new Date(today);
  date.setDate(today.getDate() - randomDays);
  return date.toISOString().split('T')[0];
};

// Mock patient data with updated dates
const mockPatients = [
  {
    id: "P001",
    name: "Ahmed Al-Mansouri",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
    lastVisit: getRandomPastDate(30),
    nextAppointment: getRandomFutureDate(14),
    status: "Stable",
    priority: "Medium",
    phone: "+218-91-123-4567",
    email: "ahmed.mansouri@email.com"
  },
  {
    id: "P002", 
    name: "Fatima Hassan",
    age: 32,
    gender: "Female",
    condition: "Diabetes Type 2",
    lastVisit: getRandomPastDate(30),
    nextAppointment: getRandomFutureDate(14),
    status: "Monitoring",
    priority: "High",
    phone: "+218-91-234-5678",
    email: "fatima.hassan@email.com"
  },
  {
    id: "P003",
    name: "Omar Khalil",
    age: 28,
    gender: "Male", 
    condition: "Asthma",
    lastVisit: getRandomPastDate(30),
    nextAppointment: getRandomFutureDate(14),
    status: "Improved",
    priority: "Low",
    phone: "+218-91-345-6789",
    email: "omar.khalil@email.com"
  },
  {
    id: "P004",
    name: "Layla Mohamed",
    age: 55,
    gender: "Female",
    condition: "Arthritis",
    lastVisit: getRandomPastDate(30),
    nextAppointment: getRandomFutureDate(14),
    status: "Stable",
    priority: "Medium",
    phone: "+218-91-456-7890",
    email: "layla.mohamed@email.com"
  },
  {
    id: "P005",
    name: "Yusuf Ibrahim",
    age: 38,
    gender: "Male",
    condition: "Migraine",
    lastVisit: getRandomPastDate(30),
    nextAppointment: getRandomFutureDate(14),
    status: "Treatment",
    priority: "Medium",
    phone: "+218-91-567-8901",
    email: "yusuf.ibrahim@email.com"
  }
];

const todayAppointments = [
  {
    time: "09:00 AM",
    patient: "Ahmed Al-Mansouri",
    type: "Follow-up",
    duration: "30 min",
    status: "Confirmed"
  },
  {
    time: "10:30 AM", 
    patient: "Sara Ahmed",
    type: "Consultation",
    duration: "45 min",
    status: "Confirmed"
  },
  {
    time: "02:00 PM",
    patient: "Khalil Mansour",
    type: "Check-up",
    duration: "30 min", 
    status: "Pending"
  },
  {
    time: "03:30 PM",
    patient: "Amina Hassan",
    type: "Follow-up",
    duration: "30 min",
    status: "Confirmed"
  }
];

const recentActivities = [
  {
    id: 1,
    action: "Prescribed medication for Ahmed Al-Mansouri",
    time: "10 minutes ago",
    type: "prescription"
  },
  {
    id: 2,
    action: "Updated treatment plan for Fatima Hassan", 
    time: "1 hour ago",
    type: "treatment"
  },
  {
    id: 3,
    action: "Reviewed lab results for Omar Khalil",
    time: "2 hours ago",
    type: "lab"
  },
  {
    id: 4,
    action: "Completed consultation with Layla Mohamed",
    time: "3 hours ago", 
    type: "consultation"
  }
];

export default function DoctorDashboard() {
  const { notifications, removeNotification, showSuccess, showError, showWarning, showInfo } = useNotifications();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [patientsLoading, setPatientsLoading] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const handleLogout = useCallback(() => {
    showInfo('Logging out...', 'You will be redirected to login page');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/login';
      }
    }, 1500);
  }, [showInfo]);

  const handlePatientSelect = useCallback((patient: any) => {
    setSelectedPatient(patient);
    showInfo('Patient Selected', `Viewing ${patient.name}'s medical records`);
  }, [showInfo]);

  const handlePrescription = useCallback((patient: any) => {
    showSuccess('Prescription', `Creating prescription for ${patient.name}`);
  }, [showSuccess]);

  const handleAppointment = useCallback((patient: any) => {
    showInfo('Appointment', `Scheduling appointment for ${patient.name}`);
  }, [showInfo]);

  const handleAddPatient = useCallback(() => {
    setPatientsLoading(true);
    showInfo('Add Patient', 'Opening patient registration form');
    setTimeout(() => setPatientsLoading(false), 1000);
  }, [showInfo]);

  const handleQuickPrescription = useCallback(() => {
    showSuccess('Prescription', 'Opening prescription management');
  }, [showSuccess]);

  const handleLabResults = useCallback(() => {
    showInfo('Lab Results', 'Accessing laboratory results');
  }, [showInfo]);

  const handleEmergencyConsult = useCallback(() => {
    showWarning('Emergency', 'Emergency consultation protocol activated');
  }, [showWarning]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      case 'treatment':
        return 'bg-blue-100 text-blue-800';
      case 'improved':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <LoadingSkeleton rows={6} />
        </div>
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
              <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard | لوحة تحكم الطبيب</h1>
                <p className="text-sm text-gray-600">Medical Practice Management System | نظام إدارة الممارسة الطبية</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => showInfo('Notifications', 'No new notifications at this time')}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                aria-label="Logout from system"
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
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Today's Patients | مرضى اليوم"
            value="12"
            icon={<Users className="h-8 w-8" />}
            trend={8}
            color="blue"
            subtitle="Scheduled appointments | المواعيد المحددة"
            onClick={() => showInfo('Today\'s Schedule', 'Viewing today\'s patient appointments')}
          />
          
          <DashboardCard
            title="Pending Reviews | المراجعات المعلقة"
            value="5"
            icon={<FileText className="h-8 w-8" />}
            trend={-15}
            color="orange"
            subtitle="Lab results & reports | نتائج المختبر والتقارير"
            onClick={() => showWarning('Pending Reviews', '5 lab results require your attention')}
          />
          
          <DashboardCard
            title="Active Treatments | العلاجات النشطة"
            value="28"
            icon={<Activity className="h-8 w-8" />}
            trend={12}
            color="green"
            subtitle="Ongoing patient care | رعاية المرضى المستمرة"
            onClick={() => showSuccess('Active Treatments', 'All treatments are progressing well')}
          />
          
          <DashboardCard
            title="Prescriptions | الوصفات الطبية"
            value="15"
            icon={<Pill className="h-8 w-8" />}
            trend={5}
            color="purple"
            subtitle="Issued today | المُصدرة اليوم"
            onClick={() => showInfo('Prescriptions', 'Today\'s prescription summary')}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Management */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patient List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Patient Management | إدارة المرضى</h3>
                  <button 
                    onClick={handleAddPatient}
                    disabled={patientsLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {patientsLoading ? 'Loading...' : 'Add Patient'}
                  </button>
                </div>
              </div>

              {patientsLoading ? (
                <div className="p-6">
                  <LoadingSkeleton rows={4} />
                </div>
              ) : (
                <DataTable
                  data={mockPatients}
                  title=""
                  columns={[
                    { key: 'id', label: 'Patient ID | معرف المريض' },
                    { key: 'name', label: 'Patient Name | اسم المريض' },
                    { key: 'age', label: 'Age | العمر' },
                    { key: 'condition', label: 'Condition | الحالة' },
                    { 
                      key: 'status', 
                      label: 'Status | الحالة',
                      render: (value: string) => (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                          {value}
                        </span>
                      )
                    },
                    { 
                      key: 'priority', 
                      label: 'Priority | الأولوية',
                      render: (value: string) => (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(value)}`}>
                          {value}
                        </span>
                      )
                    },
                    { key: 'nextAppointment', label: 'Next Visit | الزيارة القادمة' }
                  ]}
                  searchable={true}
                  filterOptions={[
                    { key: 'status', value: 'Stable', label: 'Stable' },
                    { key: 'status', value: 'Monitoring', label: 'Monitoring' },
                    { key: 'status', value: 'Treatment', label: 'Treatment' }
                  ]}
                  onAdd={handleAddPatient}
                  onEdit={handlePatientSelect}
                  onDelete={(patient: any) => showWarning('Patient Record', `Managing ${patient.name}'s medical record`)}
                />
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Medical Actions | الإجراءات الطبية السريعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={handleQuickPrescription}
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105 border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Write prescription for patient"
                >
                  <Pill className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 text-sm">Write Prescription</div>
                  <div className="text-xs text-gray-600">كتابة وصفة طبية</div>
                </button>
                
                <button 
                  onClick={handleLabResults}
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 hover:scale-105 border border-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-label="Review laboratory results"
                >
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 text-sm">Review Lab Results</div>
                  <div className="text-xs text-gray-600">مراجعة نتائج المختبر</div>
                </button>
                
                <button 
                  onClick={handleEmergencyConsult}
                  className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-105 border border-red-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  aria-label="Emergency consultation"
                >
                  <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 text-sm">Emergency Consult</div>
                  <div className="text-xs text-gray-600">استشارة طارئة</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Schedule & Activities */}
          <div className="space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Today's Schedule | جدول اليوم
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todayAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{appointment.patient}</div>
                          <div className="text-sm text-gray-600">{appointment.type} • {appointment.duration}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{appointment.time}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => showInfo('Schedule', 'Opening full calendar view')}
                  className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Full Schedule → | عرض الجدول الكامل
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activities | الأنشطة الحديثة
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'prescription' ? 'bg-purple-100' :
                        activity.type === 'treatment' ? 'bg-blue-100' :
                        activity.type === 'lab' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'prescription' && <Pill className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'treatment' && <Heart className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'lab' && <FileText className="h-4 w-4 text-green-600" />}
                        {activity.type === 'consultation' && <User className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Medical Statistics */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Medical Statistics | الإحصائيات الطبية
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Patient Satisfaction | رضا المرضى</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                    </div>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Treatment Success | نجاح العلاج</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-600 h-2 rounded-full w-5/6"></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Follow-up Rate | معدل المتابعة</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer 
        notifications={notifications} 
        onDismiss={removeNotification} 
      />
    </div>
  );
}
