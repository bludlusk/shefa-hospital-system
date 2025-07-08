'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Heart, 
  Users, 
  Activity, 
  AlertCircle, 
  Clock, 
  LogOut, 
  Bell,
  Pill,
  Thermometer,
  Stethoscope,
  ClipboardList,
  UserCheck,
  RefreshCw,
  Plus,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  Loader,
  Phone,
  MessageCircle,
  Calendar,
  TrendingUp
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

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const getRandomTime = (hoursBack: number) => {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * hoursBack * 60);
  const time = new Date(now.getTime() - randomMinutes * 60000);
  return time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// Mock patient data for nursing care
const assignedPatients = [
  {
    id: "P001",
    name: "Ahmed Al-Mansouri",
    age: 45,
    room: "A-205",
    condition: "Post-operative care",
    conditionAr: "رعاية ما بعد العملية",
    priority: "High",
    priorityAr: "عالية",
    status: "Stable",
    statusAr: "مستقر",
    lastVitals: "2 hours ago",
    nextMedication: "14:30",
    alerts: 1
  },
  {
    id: "P002", 
    name: "Fatima Hassan",
    age: 32,
    room: "A-208",
    condition: "Diabetes monitoring",
    conditionAr: "مراقبة السكري",
    priority: "Medium",
    priorityAr: "متوسطة",
    status: "Improving",
    statusAr: "يتحسن",
    lastVitals: "1 hour ago",
    nextMedication: "15:00",
    alerts: 0
  },
  {
    id: "P003",
    name: "Omar Khalil",
    age: 28,
    room: "A-212",
    condition: "Respiratory therapy",
    conditionAr: "علاج تنفسي",
    priority: "High",
    priorityAr: "عالية",
    status: "Monitoring",
    statusAr: "تحت المراقبة",
    lastVitals: "30 minutes ago",
    nextMedication: "14:00",
    alerts: 2
  },
  {
    id: "P004",
    name: "Layla Mohamed",
    age: 55,
    room: "A-215",
    condition: "Cardiac observation",
    conditionAr: "مراقبة القلب",
    priority: "Medium",
    priorityAr: "متوسطة",
    status: "Stable",
    statusAr: "مستقر",
    lastVitals: "45 minutes ago",
    nextMedication: "16:00",
    alerts: 0
  }
];

const vitalSigns = [
  {
    patientId: "P001",
    patientName: "Ahmed Al-Mansouri",
    time: getRandomTime(2),
    bloodPressure: "142/88",
    heartRate: "78",
    temperature: "37.2°C",
    oxygenSat: "96%",
    status: "attention"
  },
  {
    patientId: "P002",
    patientName: "Fatima Hassan", 
    time: getRandomTime(1),
    bloodPressure: "118/75",
    heartRate: "72",
    temperature: "36.8°C",
    oxygenSat: "98%",
    status: "normal"
  },
  {
    patientId: "P003",
    patientName: "Omar Khalil",
    time: getRandomTime(1),
    bloodPressure: "135/82",
    heartRate: "85",
    temperature: "37.5°C",
    oxygenSat: "94%",
    status: "concerning"
  }
];

const medicationSchedule = [
  {
    id: 1,
    patientName: "Ahmed Al-Mansouri",
    room: "A-205",
    medication: "Morphine 5mg",
    medicationAr: "مورفين ٥ ملغ",
    time: "14:30",
    status: "Pending",
    statusAr: "معلق",
    route: "IV",
    notes: "Post-operative pain management"
  },
  {
    id: 2,
    patientName: "Omar Khalil", 
    room: "A-212",
    medication: "Albuterol Inhaler",
    medicationAr: "بخاخ البوتيرول",
    time: "14:00",
    status: "Due Now",
    statusAr: "مستحق الآن",
    route: "Inhalation",
    notes: "Respiratory therapy"
  },
  {
    id: 3,
    patientName: "Fatima Hassan",
    room: "A-208", 
    medication: "Insulin 10 units",
    medicationAr: "أنسولين ١٠ وحدات",
    time: "15:00",
    status: "Scheduled",
    statusAr: "مجدول",
    route: "SC",
    notes: "Pre-meal diabetes management"
  }
];

const shiftReports = [
  {
    id: 1,
    time: "06:00 - 14:00",
    timeAr: "٦:٠٠ - ١٤:٠٠",
    nurse: "Nurse Sarah Ahmed",
    nurseAr: "الممرضة سارة أحمد",
    summary: "Patient in A-205 post-op recovery progressing well. Vital signs stable.",
    summaryAr: "المريض في A-205 يتعافى جيداً بعد العملية. العلامات الحيوية مستقرة.",
    priority: "Normal"
  },
  {
    id: 2,
    time: "14:00 - 22:00",
    timeAr: "١٤:٠٠ - ٢٢:٠٠",
    nurse: "Current Shift",
    nurseAr: "الوردية الحالية",
    summary: "Monitoring respiratory patient in A-212. Oxygen levels fluctuating.",
    summaryAr: "مراقبة مريض التنفس في A-212. مستويات الأكسجين متذبذبة.",
    priority: "Attention"
  }
];

export default function NurseDashboard() {
  const { notifications, removeNotification, showSuccess, showError, showWarning, showInfo } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [vitalsLoading, setVitalsLoading] = useState(false);
  const [medicationLoading, setMedicationLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [currentShiftTime] = useState(getCurrentTime());

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);
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

  const handleRefreshVitals = useCallback(() => {
    setVitalsLoading(true);
    showInfo('Refreshing Vitals', 'Updating patient vital signs...');
    setTimeout(() => {
      setVitalsLoading(false);
      showSuccess('Vitals Updated', 'Patient vital signs have been refreshed');
    }, 1500);
  }, [showInfo, showSuccess]);

  const handleMedicationAdmin = useCallback((medication: any) => {
    setMedicationLoading(true);
    showInfo('Administering Medication', `Recording ${medication.medication} administration...`);
    setTimeout(() => {
      setMedicationLoading(false);
      showSuccess('Medication Administered', `${medication.medication} has been administered to ${medication.patientName}`);
    }, 2000);
  }, [showInfo, showSuccess]);

  const handlePatientSelect = useCallback((patient: any) => {
    setSelectedPatient(patient);
    showInfo('Patient Selected', `Viewing ${patient.name}'s nursing care plan`);
  }, [showInfo]);

  const handleEmergencyAlert = useCallback(() => {
    showWarning('Emergency Alert', 'Emergency response team has been notified');
  }, [showWarning]);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'عالية':
        return 'bg-red-100 text-red-800';
      case 'medium':
      case 'متوسطة':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'منخفضة':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
      case 'مستقر':
        return 'bg-green-100 text-green-800';
      case 'improving':
      case 'يتحسن':
        return 'bg-blue-100 text-blue-800';
      case 'monitoring':
      case 'تحت المراقبة':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'حرج':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVitalsStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'concerning':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMedicationStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'due now':
      case 'مستحق الآن':
        return 'bg-red-100 text-red-800';
      case 'pending':
      case 'معلق':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
      case 'مجدول':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
      case 'مكتمل':
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
              <Heart className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Nurse Dashboard | لوحة تحكم الممرض' : 'لوحة تحكم الممرض | Nurse Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Patient Care Coordination System | نظام تنسيق رعاية المرضى' 
                    : 'نظام تنسيق رعاية المرضى | Patient Care Coordination System'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <button
                onClick={handleRefreshVitals}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Refresh patient data"
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
                aria-label="Logout from system"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Logout' : 'تسجيل خروج'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shift Information Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="font-bold text-purple-900">
                  {language === 'en' ? 'Current Shift' : 'الوردية الحالية'}
                </h3>
                <p className="text-sm text-purple-700">
                  {language === 'en' 
                    ? `14:00 - 22:00 | Started at ${currentShiftTime}` 
                    : `١٤:٠٠ - ٢٢:٠٠ | بدأت في ${currentShiftTime}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleEmergencyAlert}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Emergency Alert' : 'تنبيه طارئ'}
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title={language === 'en' ? 'Assigned Patients | المرضى المعينون' : 'المرضى المعينون | Assigned Patients'}
            value={assignedPatients.length.toString()}
            icon={<Users className="h-8 w-8" />}
            trend={null}
            color="blue"
            subtitle={language === 'en' ? 'Under your care | تحت رعايتك' : 'تحت رعايتك | Under your care'}
            onClick={() => showInfo('Patient Assignment', 'Viewing assigned patient list')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Vital Signs Alerts | تنبيهات العلامات الحيوية' : 'تنبيهات العلامات الحيوية | Vital Signs Alerts'}
            value="3"
            icon={<Activity className="h-8 w-8" />}
            trend={null}
            color="orange"
            subtitle={language === 'en' ? 'Require attention | تحتاج انتباه' : 'تحتاج انتباه | Require attention'}
            onClick={() => showWarning('Vital Signs', '3 patients require vital signs attention')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Medications Due | الأدوية المستحقة' : 'الأدوية المستحقة | Medications Due'}
            value="5"
            icon={<Pill className="h-8 w-8" />}
            trend={null}
            color="purple"
            subtitle={language === 'en' ? 'Next 2 hours | خلال ساعتين' : 'خلال ساعتين | Next 2 hours'}
            onClick={() => showInfo('Medication Schedule', 'Viewing medication administration schedule')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Emergency Calls | مكالمات الطوارئ' : 'مكالمات الطوارئ | Emergency Calls'}
            value="0"
            icon={<AlertCircle className="h-8 w-8" />}
            trend={null}
            color="green"
            subtitle={language === 'en' ? 'This shift | هذه الوردية' : 'هذه الوردية | This shift'}
            onClick={() => showSuccess('Emergency Status', 'No emergency calls this shift')}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Care */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assigned Patients */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Assigned Patients | المرضى المعينون' : 'المرضى المعينون | Assigned Patients'}
                  </h3>
                  <button 
                    onClick={() => showInfo('Add Patient', 'Opening patient assignment system')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Add Patient' : 'إضافة مريض'}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {assignedPatients.map((patient) => (
                    <div key={patient.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <UserCheck className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium text-gray-900">{patient.name}</h4>
                              <span className="text-sm text-gray-500">
                                {language === 'en' ? `Room ${patient.room}` : `غرفة ${patient.room}`}
                              </span>
                              {patient.alerts > 0 && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  {patient.alerts} {language === 'en' ? 'alerts' : 'تنبيهات'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {language === 'en' ? patient.condition : patient.conditionAr}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>
                                {language === 'en' ? 'Last vitals:' : 'آخر العلامات الحيوية:'} {patient.lastVitals}
                              </span>
                              <span>
                                {language === 'en' ? 'Next med:' : 'الدواء التالي:'} {patient.nextMedication}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(patient.priority)}`}>
                            {language === 'en' ? patient.priority : patient.priorityAr}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(patient.status)}`}>
                            {language === 'en' ? patient.status : patient.statusAr}
                          </span>
                          <button 
                            onClick={() => handlePatientSelect(patient)}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'View' : 'عرض'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vital Signs Monitoring */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Recent Vital Signs | العلامات الحيوية الحديثة' : 'العلامات الحيوية الحديثة | Recent Vital Signs'}
                  </h3>
                  <button 
                    onClick={handleRefreshVitals}
                    disabled={vitalsLoading}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center disabled:opacity-50"
                  >
                    {vitalsLoading ? (
                      <Loader className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-1" />
                    )}
                    {language === 'en' ? 'Refresh' : 'تحديث'}
                  </button>
                </div>
              </div>

              <div className="p-6">
                {vitalsLoading ? (
                  <LoadingSkeleton rows={3} />
                ) : (
                  <div className="space-y-4">
                    {vitalSigns.map((vital, index) => (
                      <div key={index} className={`p-4 rounded-lg border-2 ${getVitalsStatusColor(vital.status)}`}>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-3">
                            <Stethoscope className="h-5 w-5 text-gray-600" />
                            <div>
                              <h4 className="font-medium text-gray-900">{vital.patientName}</h4>
                              <p className="text-sm text-gray-600">{vital.time}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVitalsStatusColor(vital.status)}`}>
                            {vital.status === 'normal' && (language === 'en' ? 'Normal' : 'طبيعي')}
                            {vital.status === 'attention' && (language === 'en' ? 'Attention' : 'انتباه')}
                            {vital.status === 'concerning' && (language === 'en' ? 'Concerning' : 'مقلق')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">{language === 'en' ? 'BP:' : 'ضغط الدم:'}</span>
                            <p className="font-medium">{vital.bloodPressure}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{language === 'en' ? 'HR:' : 'معدل القلب:'}</span>
                            <p className="font-medium">{vital.heartRate} bpm</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{language === 'en' ? 'Temp:' : 'الحرارة:'}</span>
                            <p className="font-medium">{vital.temperature}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{language === 'en' ? 'O2 Sat:' : 'الأكسجين:'}</span>
                            <p className="font-medium">{vital.oxygenSat}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule & Communications */}
          <div className="space-y-8">
            {/* Medication Schedule */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-purple-600" />
                  {language === 'en' ? 'Medication Schedule | جدول الأدوية' : 'جدول الأدوية | Medication Schedule'}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {medicationSchedule.map((med) => (
                    <div key={med.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{med.patientName}</h4>
                          <p className="text-xs text-gray-600">{med.room}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{med.time}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMedicationStatusColor(med.status)}`}>
                            {language === 'en' ? med.status : med.statusAr}
                          </span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="font-medium text-sm">
                          {language === 'en' ? med.medication : med.medicationAr}
                        </p>
                        <p className="text-xs text-gray-600">{med.route} | {med.notes}</p>
                      </div>
                      <button 
                        onClick={() => handleMedicationAdmin(med)}
                        disabled={medicationLoading}
                        className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                      >
                        {medicationLoading ? (
                          <Loader className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        {language === 'en' ? 'Administer' : 'إعطاء'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shift Handoff */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
                  {language === 'en' ? 'Shift Handoff | تسليم الوردية' : 'تسليم الوردية | Shift Handoff'}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {shiftReports.map((report) => (
                    <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-sm text-gray-900">
                          {language === 'en' ? report.nurse : report.nurseAr}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? report.time : report.timeAr}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? report.summary : report.summaryAr}
                      </p>
                      {report.priority === 'Attention' && (
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {language === 'en' ? 'Requires Attention' : 'يحتاج انتباه'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => showInfo('Shift Notes', 'Opening shift handoff notes form')}
                  className="w-full mt-4 text-center text-purple-600 hover:text-purple-800 font-medium text-sm border border-purple-200 rounded-lg py-2"
                >
                  {language === 'en' ? 'Add Handoff Notes →' : 'إضافة ملاحظات التسليم ←'}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Quick Actions | الإجراءات السريعة' : 'الإجراءات السريعة | Quick Actions'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => showInfo('Emergency', 'Contacting emergency team')}
                  className="p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <Phone className="h-6 w-6 text-red-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">
                    {language === 'en' ? 'Emergency' : 'طوارئ'}
                  </div>
                </button>
                
                <button 
                  onClick={() => showInfo('Doctor', 'Paging attending physician')}
                  className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <Stethoscope className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">
                    {language === 'en' ? 'Page Doctor' : 'استدعاء طبيب'}
                  </div>
                </button>
                
                <button 
                  onClick={() => showInfo('Lab', 'Requesting lab work')}
                  className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <Activity className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">
                    {language === 'en' ? 'Order Labs' : 'طلب فحوصات'}
                  </div>
                </button>
                
                <button 
                  onClick={() => showInfo('Pharmacy', 'Contacting hospital pharmacy')}
                  className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <Pill className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">
                    {language === 'en' ? 'Pharmacy' : 'صيدلية'}
                  </div>
                </button>
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
