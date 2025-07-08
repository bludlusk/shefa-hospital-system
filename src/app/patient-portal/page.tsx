'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  FileText, 
  Activity, 
  Clock, 
  Heart, 
  Pill, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Bell, 
  Settings, 
  LogOut, 
  Plus, 
  Eye, 
  RefreshCw, 
  Shield,
  Loader
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { ToastContainer } from '@/components/ui/NotificationToast';
import useNotifications from '@/hooks/useNotifications';

// Helper functions for current dates
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

// Mock patient data with updated dates and Libya-specific content
const mockPatientData = {
  id: "PAT-2025-001",
  name: "Ahmed Al-Mansouri",
  age: 45,
  gender: "Male",
  bloodType: "O+",
  phone: "+218-91-123-4567",
  email: "ahmed.mansouri@email.com",
  address: "Tripoli, Libya | طرابلس، ليبيا",
  emergencyContact: "Fatima Al-Mansouri (+218-91-987-6543)",
  registrationDate: "2024-03-15",
  lastVisit: getRandomPastDate(30)
};

const upcomingAppointments = [
  {
    id: 1,
    date: getRandomFutureDate(14),
    time: "10:00 AM",
    doctor: "Dr. Sarah Ahmed",
    department: "Cardiology | أمراض القلب",
    type: "Follow-up | متابعة",
    status: "Confirmed | مؤكد",
    location: "Building A, Floor 2, Room 205"
  },
  {
    id: 2,
    date: getRandomFutureDate(21),
    time: "02:30 PM", 
    doctor: "Dr. Omar Khalil",
    department: "General Medicine | الطب العام",
    type: "Check-up | فحص عام",
    status: "Pending | معلق",
    location: "Building B, Floor 1, Room 103"
  },
  {
    id: 3,
    date: getRandomFutureDate(28),
    time: "09:15 AM",
    doctor: "Dr. Layla Hassan",
    department: "Laboratory | المختبر",
    type: "Lab Tests | فحوصات مخبرية",
    status: "Confirmed | مؤكد",
    location: "Laboratory Building, Ground Floor"
  }
];

const medicalHistory = [
  {
    id: 1,
    date: getRandomPastDate(90),
    diagnosis: "Hypertension | ارتفاع ضغط الدم",
    doctor: "Dr. Ahmed Hassan",
    treatment: "Lifestyle changes and medication | تغييرات نمط الحياة والأدوية",
    status: "Ongoing | مستمر"
  },
  {
    id: 2,
    date: getRandomPastDate(180),
    diagnosis: "Annual Health Check | الفحص الصحي السنوي",
    doctor: "Dr. Fatima Ali",
    treatment: "Routine screening completed | تم إكمال الفحص الروتيني",
    status: "Completed | مكتمل"
  },
  {
    id: 3,
    date: getRandomPastDate(365),
    diagnosis: "Preventive Care | الرعاية الوقائية",
    doctor: "Dr. Omar Benali",
    treatment: "Vaccination and health counseling | التطعيم والاستشارة الصحية",
    status: "Completed | مكتمل"
  }
];

const labResults = [
  {
    id: 1,
    test: "Blood Chemistry Panel | فحص كيمياء الدم",
    date: getRandomPastDate(14),
    result: "Normal | طبيعي",
    range: "Within normal limits | ضمن الحدود الطبيعية",
    status: "Final | نهائي"
  },
  {
    id: 2,
    test: "Complete Blood Count | تعداد الدم الكامل",
    date: getRandomPastDate(14),
    result: "Normal | طبيعي", 
    range: "All parameters normal | جميع المؤشرات طبيعية",
    status: "Final | نهائي"
  },
  {
    id: 3,
    test: "Lipid Profile | فحص الدهون",
    date: getRandomPastDate(30),
    result: "Borderline High | حدود عليا",
    range: "Cholesterol: 210 mg/dL | الكوليسترول: ٢١٠ ملغ/دل",
    status: "Final | نهائي"
  }
];

const currentPrescriptions = [
  {
    id: 1,
    medication: "Lisinopril 10mg | ليسينوبريل ١٠ ملغ",
    dosage: "Once daily | مرة واحدة يومياً",
    prescribedBy: "Dr. Ahmed Hassan",
    startDate: getRandomPastDate(60),
    endDate: getRandomFutureDate(30),
    refills: "2 remaining | ٢ متبقية"
  },
  {
    id: 2,
    medication: "Metformin 500mg | ميتفورمين ٥٠٠ ملغ",
    dosage: "Twice daily with meals | مرتين يومياً مع الوجبات",
    prescribedBy: "Dr. Sarah Ahmed",
    startDate: getRandomPastDate(90),
    endDate: getRandomFutureDate(60),
    refills: "3 remaining | ٣ متبقية"
  }
];

const vitalSigns = [
  {
    date: getRandomPastDate(7),
    bloodPressure: "128/82 mmHg",
    heartRate: "72 bpm",
    temperature: "36.8°C",
    weight: "78 kg",
    height: "175 cm"
  },
  {
    date: getRandomPastDate(14),
    bloodPressure: "132/85 mmHg", 
    heartRate: "75 bpm",
    temperature: "37.0°C",
    weight: "78.5 kg",
    height: "175 cm"
  }
];

export default function PatientPortal() {
  const { notifications, removeNotification, showSuccess, showError, showWarning, showInfo } = useNotifications();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [labLoading, setLabLoading] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const handleLogout = useCallback(() => {
    showInfo('Logging out...', 'You will be redirected to login page');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/patient-login';
      }
    }, 1500);
  }, [showInfo]);

  const handleBookAppointment = useCallback(() => {
    setAppointmentLoading(true);
    showInfo('Book Appointment', 'Opening appointment booking system...');
    setTimeout(() => {
      setAppointmentLoading(false);
      showSuccess('Appointment Request', 'Your appointment request has been submitted');
    }, 2000);
  }, [showInfo, showSuccess]);

  const handleDownloadReport = useCallback((reportType: string) => {
    showInfo('Download Report', `Preparing ${reportType} for download...`);
    setTimeout(() => {
      showSuccess('Download Complete', `${reportType} has been downloaded successfully`);
    }, 1500);
  }, [showInfo, showSuccess]);

  const handleViewLabResults = useCallback(() => {
    setLabLoading(true);
    showInfo('Lab Results', 'Loading laboratory results...');
    setTimeout(() => {
      setLabLoading(false);
      setActiveTab('lab-results');
    }, 1000);
  }, [showInfo]);

  const handleRefreshData = useCallback(() => {
    setIsLoading(true);
    showInfo('Refreshing Data', 'Updating your medical information...');
    setTimeout(() => {
      setIsLoading(false);
      showSuccess('Data Updated', 'Your medical information has been refreshed');
    }, 1500);
  }, [showInfo, showSuccess]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'مؤكد':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'معلق':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'مكتمل':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
      case 'مستمر':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'Africa/Tripoli'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <LoadingSkeleton rows={8} />
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
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Portal | بوابة المريض</h1>
                <p className="text-sm text-gray-600">Shefa Hospital Libya - Personal Health Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefreshData}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Refresh medical data"
              >
                <RefreshCw className="h-6 w-6" />
              </button>
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
                aria-label="Logout from portal"
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
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{mockPatientData.name}</h2>
                <p className="text-sm text-gray-600">Patient ID: {mockPatientData.id}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>Age: {mockPatientData.age} | العمر: {mockPatientData.age}</span>
                  <span>Blood Type: {mockPatientData.bloodType} | فصيلة الدم: {mockPatientData.bloodType}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col lg:items-end space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {mockPatientData.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {mockPatientData.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {mockPatientData.address}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Next Appointment | الموعد القادم"
            value={upcomingAppointments.length.toString()}
            icon={<Calendar className="h-8 w-8" />}
            trend={null}
            color="blue"
            subtitle="Scheduled appointments | المواعيد المحددة"
            onClick={() => setActiveTab('appointments')}
          />
          
          <DashboardCard
            title="Lab Results | نتائج المختبر"
            value={labResults.length.toString()}
            icon={<FileText className="h-8 w-8" />}
            trend={null}
            color="green"
            subtitle="Available reports | التقارير المتوفرة"
            onClick={handleViewLabResults}
          />
          
          <DashboardCard
            title="Active Prescriptions | الوصفات النشطة"
            value={currentPrescriptions.length.toString()}
            icon={<Pill className="h-8 w-8" />}
            trend={null}
            color="purple"
            subtitle="Current medications | الأدوية الحالية"
            onClick={() => setActiveTab('prescriptions')}
          />
          
          <DashboardCard
            title="Health Score | النتيجة الصحية"
            value="8.5/10"
            icon={<TrendingUp className="h-8 w-8" />}
            trend={5}
            color="orange"
            subtitle="Overall health status | الحالة الصحية العامة"
            onClick={() => setActiveTab('health-tracking')}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Patient portal navigation">
              {[
                { id: 'overview', label: 'Overview | نظرة عامة', icon: <Activity className="h-5 w-5" /> },
                { id: 'appointments', label: 'Appointments | المواعيد', icon: <Calendar className="h-5 w-5" /> },
                { id: 'lab-results', label: 'Lab Results | نتائج المختبر', icon: <FileText className="h-5 w-5" /> },
                { id: 'prescriptions', label: 'Prescriptions | الوصفات', icon: <Pill className="h-5 w-5" /> },
                { id: 'health-tracking', label: 'Health Tracking | تتبع الصحة', icon: <TrendingUp className="h-5 w-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Appointments */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity | النشاط الحديث</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">Lab Results Available</p>
                              <p className="text-sm text-gray-600">Blood Chemistry Panel completed</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(getRandomPastDate(3))}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">Appointment Scheduled</p>
                              <p className="text-sm text-gray-600">Follow-up with Dr. Sarah Ahmed</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(getRandomPastDate(7))}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Pill className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="font-medium text-gray-900">Prescription Refilled</p>
                              <p className="text-sm text-gray-600">Lisinopril 10mg renewed</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(getRandomPastDate(10))}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vital Signs */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Vital Signs | العلامات الحيوية الأخيرة</h3>
                    <div className="space-y-4">
                      {vitalSigns[0] && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-900">Most Recent Reading</h4>
                            <span className="text-sm text-gray-500">{formatDate(vitalSigns[0].date)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Blood Pressure:</span>
                              <p className="font-medium">{vitalSigns[0].bloodPressure}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Heart Rate:</span>
                              <p className="font-medium">{vitalSigns[0].heartRate}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Temperature:</span>
                              <p className="font-medium">{vitalSigns[0].temperature}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Weight:</span>
                              <p className="font-medium">{vitalSigns[0].weight}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions | الإجراءات السريعة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      onClick={handleBookAppointment}
                      disabled={appointmentLoading}
                      className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105 border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                      aria-label="Book new appointment"
                    >
                      {appointmentLoading ? (
                        <Loader className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
                      ) : (
                        <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      )}
                      <div className="font-medium text-gray-900 text-sm">Book Appointment</div>
                      <div className="text-xs text-gray-600">حجز موعد</div>
                    </button>
                    
                    <button 
                      onClick={() => handleDownloadReport('Medical Records')}
                      className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 hover:scale-105 border border-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      aria-label="Download medical records"
                    >
                      <Download className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="font-medium text-gray-900 text-sm">Download Records</div>
                      <div className="text-xs text-gray-600">تحميل السجلات</div>
                    </button>
                    
                    <button 
                      onClick={() => showInfo('Telemedicine', 'Opening virtual consultation portal...')}
                      className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200 hover:scale-105 border border-purple-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      aria-label="Start telemedicine consultation"
                    >
                      <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium text-gray-900 text-sm">Telemedicine</div>
                      <div className="text-xs text-gray-600">الطب عن بُعد</div>
                    </button>
                    
                    <button 
                      onClick={() => showInfo('Emergency', 'Emergency contact information displayed')}
                      className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-105 border border-red-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      aria-label="Emergency contact"
                    >
                      <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <div className="font-medium text-gray-900 text-sm">Emergency</div>
                      <div className="text-xs text-gray-600">الطوارئ</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments | المواعيد القادمة</h3>
                  <button 
                    onClick={handleBookAppointment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book New | حجز جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                            <p className="text-sm text-gray-600">{appointment.department}</p>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {formatDate(appointment.date)} at {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Reschedule | إعادة جدولة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'lab-results' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Laboratory Results | نتائج المختبر</h3>
                  <button 
                    onClick={() => handleDownloadReport('All Lab Results')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All | تحميل الكل
                  </button>
                </div>

                {labLoading ? (
                  <LoadingSkeleton rows={4} />
                ) : (
                  <div className="space-y-4">
                    {labResults.map((result) => (
                      <div key={result.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{result.test}</h4>
                              <p className="text-sm text-gray-600">Date: {formatDate(result.date)}</p>
                              <p className="text-sm text-gray-600">Result: {result.result}</p>
                              <p className="text-sm text-gray-500">{result.range}</p>
                            </div>
                          </div>
                          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                            <button 
                              onClick={() => handleDownloadReport(result.test)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Current Prescriptions | الوصفات الحالية</h3>
                
                <div className="space-y-4">
                  {currentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Pill className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                            <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                            <p className="text-sm text-gray-600">Prescribed by: {prescription.prescribedBy}</p>
                            <p className="text-sm text-gray-500">
                              Period: {formatDate(prescription.startDate)} - {formatDate(prescription.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex flex-col items-end space-y-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {prescription.refills}
                          </span>
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                            Request Refill | طلب تجديد
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'health-tracking' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Health Tracking | تتبع الصحة</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Vital Signs History | تاريخ العلامات الحيوية</h4>
                    <div className="space-y-3">
                      {vitalSigns.map((vital, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-900">{formatDate(vital.date)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div>BP: {vital.bloodPressure}</div>
                            <div>HR: {vital.heartRate}</div>
                            <div>Temp: {vital.temperature}</div>
                            <div>Weight: {vital.weight}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Health Goals | الأهداف الصحية</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-700">Blood Pressure Control</span>
                          <span className="text-sm font-medium text-green-600">On Track</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-700">Weight Management</span>
                          <span className="text-sm font-medium text-blue-600">Improving</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/5"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-700">Medication Adherence</span>
                          <span className="text-sm font-medium text-green-600">Excellent</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
