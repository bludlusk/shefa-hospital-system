'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function PatientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    if (!email || !password) {
      setError(language === 'en' 
        ? 'Please enter your email and password' 
        : 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo patient credentials
      const patientCredentials = {
        'patient@example.com': { password: 'patient123', name: 'Ahmed Al-Mansouri' },
        'fatima.hassan@email.com': { password: 'fatima123', name: 'Fatima Hassan' },
        'omar.khalil@email.com': { password: 'omar123', name: 'Omar Khalil' }
      };

      const userCred = patientCredentials[email];
      
      if (userCred && userCred.password === password) {
        setSuccess(language === 'en' 
          ? 'Login successful! Redirecting to your portal...' 
          : 'تم تسجيل الدخول بنجاح! جاري التوجيه لبوابتك...');
        
        // Store user data
        localStorage.setItem('userRole', 'patient');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userCred.name);
        localStorage.setItem('userType', 'patient');
        localStorage.setItem('loginTime', new Date().toISOString());
        
        setTimeout(() => {
          router.push('/patient-portal');
        }, 1000);
      } else {
        setError(language === 'en' 
          ? 'Invalid email or password' 
          : 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError(language === 'en' 
        ? 'Login failed. Please try again' 
        : 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Heart className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Patient Portal
        </h2>
        <p className="mt-2 text-center text-xl text-gray-600">
          بوابة المريض
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Access your medical records and appointments
        </p>
      </div>

      {/* Login Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          
          {/* Language Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}
            </h3>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
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
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {language === 'en' ? 'Remember me' : 'تذكرني'}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  {language === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}
                </a>
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
                disabled={loading || !email || !password}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>{language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-5 w-5" />
                    <span>{language === 'en' ? 'Access My Portal' : 'دخول بوابتي'}</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Create Account */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === 'en' ? 'New patient?' : 'مريض جديد؟'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/patient-register"
                className="w-full flex justify-center py-3 px-4 border border-red-300 rounded-md shadow-sm bg-white text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Create Patient Account' : 'إنشاء حساب مريض'}
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Demo Patient Accounts' : 'حسابات المرضى التجريبية'}
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Ahmed:</strong> patient@example.com / patient123
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Fatima:</strong> fatima.hassan@email.com / fatima123
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Omar:</strong> omar.khalil@email.com / omar123
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/staff-login"
              className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {language === 'en' ? 'Hospital Staff? Login here →' : 'موظف مستشفى؟ سجل دخولك هنا ←'}
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
          © 2025 Shefa Hospital Libya - Patient Portal. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </p>
      </div>
    </div>
  );
}
