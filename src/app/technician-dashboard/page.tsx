'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Microscope, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  LogOut, 
  Bell,
  Activity,
  Beaker,
  Thermometer,
  Zap,
  Settings,
  RefreshCw,
  Plus,
  Eye,
  Download,
  Upload,
  Monitor,
  Wrench,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Info,
  Loader,
  Search,
  Filter
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { ToastContainer } from '@/components/ui/NotificationToast';
import useNotifications from '@/hooks/useNotifications';

// Helper functions for current dates and times
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

// Mock laboratory test data
const pendingTests = [
  {
    id: "LAB001",
    patientName: "Ahmed Al-Mansouri",
    patientId: "P001",
    testType: "Complete Blood Count",
    testTypeAr: "تعداد الدم الكامل",
    sampleType: "Blood",
    sampleTypeAr: "دم",
    priority: "High",
    priorityAr: "عالية",
    orderedBy: "Dr. Sarah Ahmed",
    orderedTime: getRandomTime(2),
    expectedTime: "30 min",
    status: "Processing",
    statusAr: "قيد المعالجة"
  },
  {
    id: "LAB002",
    patientName: "Fatima Hassan",
    patientId: "P002",
    testType: "Blood Chemistry Panel",
    testTypeAr: "فحص كيمياء الدم",
    sampleType: "Blood",
    sampleTypeAr: "دم",
    priority: "Medium",
    priorityAr: "متوسطة",
    orderedBy: "Dr. Omar Benali",
    orderedTime: getRandomTime(1),
    expectedTime: "45 min",
    status: "Awaiting Sample",
    statusAr: "في انتظار العينة"
  },
  {
    id: "LAB003",
    patientName: "Omar Khalil",
    patientId: "P003",
    testType: "Urine Analysis",
    testTypeAr: "تحليل البول",
    sampleType: "Urine",
    sampleTypeAr: "بول",
    priority: "Low",
    priorityAr: "منخفضة",
    orderedBy: "Dr. Layla Hassan",
    orderedTime: getRandomTime(3),
    expectedTime: "20 min",
    status: "Ready for Collection",
    statusAr: "جاهز للجمع"
  }
];

const completedTests = [
  {
    id: "LAB004",
    patientName: "Yusuf Ibrahim",
    patientId: "P005",
    testType: "Lipid Profile",
    testTypeAr: "فحص الدهون",
    sampleType: "Blood",
    completedTime: getRandomTime(4),
    results: "Cholesterol: 210 mg/dL (Borderline High)",
    resultsAr: "الكوليسترول: ٢١٠ ملغ/دل (حدود عليا)",
    status: "Completed",
    statusAr: "مكتمل",
    verifiedBy: "Tech. Ahmad Mansour"
  },
  {
    id: "LAB005",
    patientName: "Sara Ahmed",
    patientId: "P006",
    testType: "Thyroid Function",
    testTypeAr: "وظائف الغدة الدرقية",
    sampleType: "Blood",
    completedTime: getRandomTime(6),
    results: "TSH: 2.8 mIU/L (Normal)",
    resultsAr: "هرمون الدرقية: ٢.٨ وحدة/لتر (طبيعي)",
    status: "Verified",
    statusAr: "تم التحقق",
    verifiedBy: "Tech. Fatima Ali"
  }
];

const equipmentStatus = [
  {
    id: "EQ001",
    name: "Hematology Analyzer",
    nameAr: "محلل أمراض الدم",
    status: "Online",
    statusAr: "متصل",
    lastMaintenance: getCurrentDate(),
    nextMaintenance: "2025-02-15",
    utilizationRate: 85,
    location: "Lab Room A"
  },
  {
    id: "EQ002",
    name: "Chemistry Analyzer",
    nameAr: "محلل الكيمياء",
    status: "Maintenance",
    statusAr: "صيانة",
    lastMaintenance: "2025-01-10",
    nextMaintenance: getCurrentDate(),
    utilizationRate: 0,
    location: "Lab Room B"
  },
  {
    id: "EQ003",
    name: "Microscope Digital",
    nameAr: "مجهر رقمي",
    status: "Online",
    statusAr: "متصل",
    lastMaintenance: "2024-12-20",
    nextMaintenance: "2025-03-20",
    utilizationRate: 65,
    location: "Lab Room C"
  },
  {
    id: "EQ004",
    name: "Centrifuge",
    nameAr: "جهاز الطرد المركزي",
    status: "Warning",
    statusAr: "تحذير",
    lastMaintenance: "2024-11-15",
    nextMaintenance: "2025-01-20",
    utilizationRate: 45,
    location: "Lab Room A"
  }
];

const qualityControlData = [
  {
    id: "QC001",
    testName: "Glucose Control",
    testNameAr: "ضبط الجلوكوز",
    targetValue: "100 mg/dL",
    actualValue: "98 mg/dL",
    deviation: "-2%",
    status: "Pass",
    statusAr: "نجح",
    testedBy: "Tech. Omar Said",
    testDate: getCurrentDate()
  },
  {
    id: "QC002",
    testName: "Hemoglobin Control",
    testNameAr: "ضبط الهيموجلوبين",
    targetValue: "15.0 g/dL",
    actualValue: "15.8 g/dL",
    deviation: "+5.3%",
    status: "Fail",
    statusAr: "فشل",
    testedBy: "Tech. Layla Mahmoud",
    testDate: getCurrentDate()
  }
];

export default function TechnicianDashboard() {
  const { notifications, removeNotification, showSuccess, showError, showWarning, showInfo } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [testsLoading, setTestsLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('pending');

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

  const handleRefreshTests = useCallback(() => {
    setTestsLoading(true);
    showInfo('Refreshing Tests', 'Updating laboratory test queue...');
    setTimeout(() => {
      setTestsLoading(false);
      showSuccess('Tests Updated', 'Laboratory test queue has been refreshed');
    }, 1500);
  }, [showInfo, showSuccess]);

  const handleEquipmentCheck = useCallback(() => {
    setEquipmentLoading(true);
    showInfo('Equipment Check', 'Performing equipment status verification...');
    setTimeout(() => {
      setEquipmentLoading(false);
      showSuccess('Equipment Verified', 'All equipment status has been updated');
    }, 2000);
  }, [showInfo, showSuccess]);

  const handleTestComplete = useCallback((test: any) => {
    showInfo('Test Processing', `Completing ${test.testType} for ${test.patientName}...`);
    setTimeout(() => {
      showSuccess('Test Completed', `${test.testType} results are ready for verification`);
    }, 2000);
  }, [showInfo, showSuccess]);

  const handleResultVerification = useCallback((test: any) => {
    showInfo('Verifying Results', `Verifying ${test.testType} results...`);
    setTimeout(() => {
      showSuccess('Results Verified', `${test.testType} results have been verified and sent to physician`);
    }, 1500);
  }, [showInfo, showSuccess]);

  const handleQualityControl = useCallback(() => {
    showInfo('Quality Control', 'Running quality control procedures...');
    setTimeout(() => {
      showWarning('QC Alert', 'One quality control test has failed and requires attention');
    }, 2000);
  }, [showInfo, showWarning]);

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
      case 'processing':
      case 'قيد المعالجة':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'verified':
      case 'تم التحقق':
        return 'bg-emerald-100 text-emerald-800';
      case 'awaiting sample':
      case 'في انتظار العينة':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready for collection':
      case 'جاهز للجمع':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'متصل':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'صيانة':
        return 'bg-red-100 text-red-800';
      case 'warning':
      case 'تحذير':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
      case 'غير متصل':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQCStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass':
      case 'نجح':
        return 'bg-green-100 text-green-800';
      case 'fail':
      case 'فشل':
        return 'bg-red-100 text-red-800';
      case 'warning':
      case 'تحذير':
        return 'bg-yellow-100 text-yellow-800';
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
              <Microscope className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Laboratory & Diagnostic Management | إدارة المختبر والتشخيص' : 'إدارة المختبر والتشخيص | Laboratory & Diagnostic Management'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Medical Testing & Equipment Control System | نظام الفحوصات الطبية وتحكم المعدات' 
                    : 'نظام الفحوصات الطبية وتحكم المعدات | Medical Testing & Equipment Control System'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <button
                onClick={handleRefreshTests}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Refresh test queue"
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
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title={language === 'en' ? 'Pending Tests | الاختبارات المعلقة' : 'الاختبارات المعلقة | Pending Tests'}
            value={pendingTests.length.toString()}
            icon={<Beaker className="h-8 w-8" />}
            trend={null}
            color="blue"
            subtitle={language === 'en' ? 'In queue for processing | في انتظار المعالجة' : 'في انتظار المعالجة | In queue for processing'}
            onClick={() => setActiveTab('pending')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Completed Today | مكتملة اليوم' : 'مكتملة اليوم | Completed Today'}
            value="42"
            icon={<CheckCircle className="h-8 w-8" />}
            trend={15}
            color="green"
            subtitle={language === 'en' ? 'Tests completed | الاختبارات المكتملة' : 'الاختبارات المكتملة | Tests completed'}
            onClick={() => setActiveTab('completed')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Critical Results | النتائج الحرجة' : 'النتائج الحرجة | Critical Results'}
            value="2"
            icon={<AlertTriangle className="h-8 w-8" />}
            trend={null}
            color="red"
            subtitle={language === 'en' ? 'Require immediate attention | تحتاج انتباه فوري' : 'تحتاج انتباه فوري | Require immediate attention'}
            onClick={() => showWarning('Critical Results', '2 test results require immediate physician attention')}
          />
          
          <DashboardCard
            title={language === 'en' ? 'Equipment Status | حالة المعدات' : 'حالة المعدات | Equipment Status'}
            value="All Online"
            icon={<Monitor className="h-8 w-8" />}
            trend={null}
            color="purple"
            subtitle={language === 'en' ? 'Operational status | الحالة التشغيلية' : 'الحالة التشغيلية | Operational status'}
            onClick={handleEquipmentCheck}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Laboratory navigation">
              {[
                { id: 'pending', label: language === 'en' ? 'Pending Tests | الاختبارات المعلقة' : 'الاختبارات المعلقة | Pending Tests', icon: <Clock className="h-5 w-5" /> },
                { id: 'completed', label: language === 'en' ? 'Completed Tests | الاختبارات المكتملة' : 'الاختبارات المكتملة | Completed Tests', icon: <CheckCircle className="h-5 w-5" /> },
                { id: 'equipment', label: language === 'en' ? 'Equipment | المعدات' : 'المعدات | Equipment', icon: <Monitor className="h-5 w-5" /> },
                { id: 'quality', label: language === 'en' ? 'Quality Control | ضبط الجودة' : 'ضبط الجودة | Quality Control', icon: <BarChart3 className="h-5 w-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
            {activeTab === 'pending' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Pending Laboratory Tests | الاختبارات المعلقة' : 'الاختبارات المعلقة | Pending Laboratory Tests'}
                  </h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleRefreshTests}
                      disabled={testsLoading}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center disabled:opacity-50"
                    >
                      {testsLoading ? (
                        <Loader className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-1" />
                      )}
                      {language === 'en' ? 'Refresh Queue' : 'تحديث القائمة'}
                    </button>
                  </div>
                </div>

                {testsLoading ? (
                  <LoadingSkeleton rows={4} />
                ) : (
                  <div className="space-y-4">
                    {pendingTests.map((test) => (
                      <div key={test.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                              <Beaker className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-gray-900">{test.patientName}</h4>
                                <span className="text-sm text-gray-500">ID: {test.patientId}</span>
                              </div>
                              <p className="font-medium text-sm mb-1">
                                {language === 'en' ? test.testType : test.testTypeAr}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>
                                  {language === 'en' ? 'Sample:' : 'العينة:'} {language === 'en' ? test.sampleType : test.sampleTypeAr}
                                </span>
                                <span>
                                  {language === 'en' ? 'Ordered:' : 'طلب:'} {test.orderedTime}
                                </span>
                                <span>
                                  {language === 'en' ? 'Est. Time:' : 'الوقت المتوقع:'} {test.expectedTime}
                                </span>
                                <span>
                                  {language === 'en' ? 'By:' : 'بواسطة:'} {test.orderedBy}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(test.priority)}`}>
                              {language === 'en' ? test.priority : test.priorityAr}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                              {language === 'en' ? test.status : test.statusAr}
                            </span>
                            <button 
                              onClick={() => handleTestComplete(test)}
                              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors flex items-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {language === 'en' ? 'Process' : 'معالجة'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {language === 'en' ? 'Completed Tests Today | الاختبارات المكتملة اليوم' : 'الاختبارات المكتملة اليوم | Completed Tests Today'}
                </h3>
                
                <div className="space-y-4">
                  {completedTests.map((test) => (
                    <div key={test.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium text-gray-900">{test.patientName}</h4>
                              <span className="text-sm text-gray-500">ID: {test.patientId}</span>
                            </div>
                            <p className="font-medium text-sm mb-1">
                              {language === 'en' ? test.testType : test.testTypeAr}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              {language === 'en' ? 'Results:' : 'النتائج:'} {language === 'en' ? test.results : test.resultsAr}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>
                                {language === 'en' ? 'Completed:' : 'اكتمل:'} {test.completedTime}
                              </span>
                              <span>
                                {language === 'en' ? 'Verified by:' : 'تم التحقق بواسطة:'} {test.verifiedBy}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                            {language === 'en' ? test.status : test.statusAr}
                          </span>
                          <button 
                            onClick={() => handleResultVerification(test)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Download' : 'تحميل'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Laboratory Equipment Status | حالة معدات المختبر' : 'حالة معدات المختبر | Laboratory Equipment Status'}
                  </h3>
                  <button 
                    onClick={handleEquipmentCheck}
                    disabled={equipmentLoading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center transition-colors disabled:opacity-50"
                  >
                    {equipmentLoading ? (
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Monitor className="h-4 w-4 mr-2" />
                    )}
                    {language === 'en' ? 'Check All Equipment' : 'فحص جميع المعدات'}
                  </button>
                </div>

                {equipmentLoading ? (
                  <LoadingSkeleton rows={4} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {equipmentStatus.map((equipment) => (
                      <div key={equipment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                              <Monitor className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {language === 'en' ? equipment.name : equipment.nameAr}
                              </h4>
                              <p className="text-sm text-gray-600">{equipment.location}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEquipmentStatusColor(equipment.status)}`}>
                            {language === 'en' ? equipment.status : equipment.statusAr}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {language === 'en' ? 'Utilization Rate:' : 'معدل الاستخدام:'}
                            </span>
                            <span className="font-medium">{equipment.utilizationRate}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                equipment.utilizationRate > 80 ? 'bg-red-600' :
                                equipment.utilizationRate > 60 ? 'bg-yellow-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${equipment.utilizationRate}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {language === 'en' ? 'Last Maintenance:' : 'آخر صيانة:'} {equipment.lastMaintenance}
                            </span>
                            <span>
                              {language === 'en' ? 'Next:' : 'التالية:'} {equipment.nextMaintenance}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => showInfo('Maintenance', `Scheduling maintenance for ${equipment.name}`)}
                            className="w-full bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-300 transition-colors flex items-center justify-center"
                          >
                            <Wrench className="h-4 w-4 mr-2" />
                            {language === 'en' ? 'Schedule Maintenance' : 'جدولة الصيانة'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quality' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Quality Control Results | نتائج ضبط الجودة' : 'نتائج ضبط الجودة | Quality Control Results'}
                  </h3>
                  <button 
                    onClick={handleQualityControl}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center transition-colors"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Run QC Tests' : 'تشغيل اختبارات الجودة'}
                  </button>
                </div>

                <div className="space-y-4">
                  {qualityControlData.map((qc) => (
                    <div key={qc.id} className={`p-4 rounded-lg border-2 ${
                      qc.status === 'Pass' || qc.status === 'نجح' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {language === 'en' ? qc.testName : qc.testNameAr}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Tested by:' : 'تم الاختبار بواسطة:'} {qc.testedBy} | {qc.testDate}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQCStatusColor(qc.status)}`}>
                          {language === 'en' ? qc.status : qc.statusAr}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">{language === 'en' ? 'Target:' : 'الهدف:'}</span>
                          <p className="font-medium">{qc.targetValue}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{language === 'en' ? 'Actual:' : 'الفعلي:'}</span>
                          <p className="font-medium">{qc.actualValue}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{language === 'en' ? 'Deviation:' : 'الانحراف:'}</span>
                          <p className={`font-medium ${
                            qc.status === 'Pass' || qc.status === 'نجح' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {qc.deviation}
                          </p>
                        </div>
                      </div>

                      {(qc.status === 'Fail' || qc.status === 'فشل') && (
                        <div className="mt-3 p-2 bg-red-100 rounded text-sm text-red-800">
                          <AlertTriangle className="h-4 w-4 inline mr-2" />
                          {language === 'en' 
                            ? 'This quality control test has failed. Please investigate and re-run.' 
                            : 'فشل اختبار ضبط الجودة هذا. يرجى التحقيق وإعادة التشغيل.'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* QC Summary */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {language === 'en' ? 'QC Summary Today' : 'ملخص ضبط الجودة اليوم'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600">
                        {language === 'en' ? 'Passed Tests' : 'اختبارات نجحت'}
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <div className="text-2xl font-bold text-red-600">1</div>
                      <div className="text-sm text-gray-600">
                        {language === 'en' ? 'Failed Tests' : 'اختبارات فشلت'}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <div className="text-sm text-gray-600">
                        {language === 'en' ? 'Success Rate' : 'معدل النجاح'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Quick Laboratory Actions | إجراءات المختبر السريعة' : 'إجراءات المختبر السريعة | Quick Laboratory Actions'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => showInfo('Sample Collection', 'Opening sample collection interface')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <Upload className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'en' ? 'Sample Collection' : 'جمع العينات'}
              </div>
            </button>
            
            <button 
              onClick={() => showInfo('Test Results', 'Uploading test results')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'en' ? 'Upload Results' : 'رفع النتائج'}
              </div>
            </button>
            
            <button 
              onClick={handleEquipmentCheck}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <Settings className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'en' ? 'Equipment Check' : 'فحص المعدات'}
              </div>
            </button>
            
            <button 
              onClick={() => showWarning('Emergency', 'Lab emergency protocol activated')}
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'en' ? 'Lab Emergency' : 'طوارئ المختبر'}
              </div>
            </button>
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
