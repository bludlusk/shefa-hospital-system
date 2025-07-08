'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Stethoscope,
  Heart,
  Microscope,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Removed patient role from staff roles
const staffRoles = [
  {
    value: 'admin',
    label: 'Administrator | مدير النظام',
    icon: <Settings className="h-5 w-5" />,
    color: 'red',
    description: 'System administration and management'
  },
  {
    value: 'doctor',
    label: 'Doctor | طبيب',
    icon: <Stethoscope className="h-5 w-5" />,
    color: 'blue',
    description: 'Medical practice and patient care'
  },
  {
    value: 'nurse',
    label: 'Nurse | ممرض/ممرضة',
    icon: <Heart className="h-5 w-5" />,
    color: 'purple',
    description: 'Patient care coordination'
  },
  {
    value: 'technician',
    label: 'Lab Technician | فني مختبر',
    icon: <Microscope className="h-5 w-5" />,
    color: 'green',
    description: 'Laboratory and diagnostic services'
  }
];

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [language, setLanguage] = useState('en');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !role) {
      setError(language === 'en' 
        ? 'Please fill in all fields' 
        : 'يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo staff credentials (removed patient)
      const staffCredentials = {
        'admin@shefa.ly': { password: 'admin123', role: 'admin' },
        'doctor@shefa.ly': { password: 'doctor123', role: 'doctor' },
        'nurse@shefa.ly': { password: 'nurse123', role: 'nurse' },
        'tech@shefa.ly': { password: 'tech123', role: 'technician' }
      };

      const userCred = staffCredentials[email];
      
      if (userCred && userCred.password === password && userCred.role === role) {
        setSuccess(language === 'en' 
          ? 'Login successful! Redirecting...' 
          : 'تم تسجيل الدخول بنجاح! جاري التوجيه...');
        
        // Store user data
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', 'staff');
        localStorage.setItem('loginTime', new Date().toISOString());
        
        setTimeout(() => {
          const dashboardMap = {
            'admin': '/admin-dashboard',
            'doctor': '/doctor-dashboard',
            'nurse': '/nurse-dashboard',
            'technician': '/technician-dashboard'
          };
          router.push(dashboardMap[role] || '/');
        }, 1000);
      } else {
        setError(language === 'en' 
          ? 'Invalid credentials or unauthorized access' 
          : 'بيانات اعتماد غير صحيحة أو وصول غير مصرح');
      }
    } catch (err) {
      setError(language === 'en' 
        ? 'Login failed. Please try again' 
        : 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (color) => {
    const colors = {
      red: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700',
      blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700',
      purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700',
      green: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Staff Portal Access
        </h2>
        <p className="mt-2 text-center text-xl text-gray-600">
          بوابة دخول الموظفين
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Shefa Hospital Libya - Medical Staff Only
        </p>
      </div>

      {/* Login Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          
          {/* Language Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Staff Login' : 'تسجيل دخول الموظفين'}
            </h3>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Staff Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Select Your Role' : 'اختر دورك'}
              </label>
              <div className="grid grid-cols-1 gap-3">
                {staffRoles.map((roleOption) => (
                  <button
                    key={roleOption.value}
                    type="button"
                    onClick={() => setRole(roleOption.value)}
                    className={`p-4 border rounded-lg transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      role === roleOption.value
                        ? `${getRoleColor(roleOption.color)} border-2`
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${role === roleOption.value ? 'text-current' : 'text-gray-400'}`}>
                        {roleOption.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{roleOption.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{roleOption.description}</div>
                      </div>
                      {role === roleOption.value && (
                        <CheckCircle className="h-5 w-5 text-current" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Staff Email Address' : 'البريد الإلكتروني للموظف'}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'en' ? 'your.name@shefa.ly' : 'your.name@shefa.ly'}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || !email || !password || !role}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>{language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-5 w-5" />
                    <span>{language === 'en' ? 'Access Staff Portal' : 'دخول بوابة الموظفين'}</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Demo Staff Credentials' : 'بيانات الموظفين التجريبية'}
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Admin:</strong> admin@shefa.ly / admin123
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Doctor:</strong> doctor@shefa.ly / doctor123
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Nurse:</strong> nurse@shefa.ly / nurse123
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Lab Tech:</strong> tech@shefa.ly / tech123
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/patient-login"
              className="block text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              {language === 'en' ? 'Patient? Login here →' : 'مريض؟ سجل دخولك هنا ←'}
            </Link>
            <Link 
              href="/"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Back to Homepage' : 'العودة للصفحة الرئيسية'}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          © 2025 Shefa Hospital Libya - Staff Portal. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </p>
      </div>
    </div>
  );
}
