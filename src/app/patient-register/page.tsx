'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function PatientRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [language, setLanguage] = useState('en');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.dateOfBirth || !formData.gender || !formData.password || !formData.confirmPassword) {
      setError(language === 'en' 
        ? 'Please fill in all required fields' 
        : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'en' 
        ? 'Passwords do not match' 
        : 'كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'en' 
        ? 'Password must be at least 6 characters' 
        : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (!acceptTerms) {
      setError(language === 'en' 
        ? 'Please accept the terms and conditions' 
        : 'يرجى قبول الشروط والأحكام');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate patient ID
      const patientId = 'PAT-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      
      setSuccess(language === 'en' 
        ? `Account created successfully! Your Patient ID is: ${patientId}. Redirecting to login...` 
        : `تم إنشاء الحساب بنجاح! معرف المريض الخاص بك هو: ${patientId}. جاري التوجيه لصفحة تسجيل الدخول...`);
      
      // Here you would typically send data to your backend
      console.log('New patient registration:', { ...formData, patientId });
      
      setTimeout(() => {
        router.push('/patient-login');
      }, 3000);
    } catch (err) {
      setError(language === 'en' 
        ? 'Registration failed. Please try again' 
        : 'فشل التسجيل. يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <UserPlus className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create Patient Account
        </h2>
        <p className="mt-2 text-center text-xl text-gray-600">
          إنشاء حساب مريض
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Join Shefa Hospital Libya for better healthcare
        </p>
      </div>

      {/* Registration Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          
          {/* Language Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Patient Registration' : 'تسجيل المريض'}
            </h3>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                {language === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'First Name *' : 'الاسم الأول *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'en' ? 'Enter first name' : 'أدخل الاسم الأول'}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Last Name *' : 'اسم العائلة *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'en' ? 'Enter last name' : 'أدخل اسم العائلة'}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Date of Birth *' : 'تاريخ الميلاد *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Gender *' : 'الجنس *'}
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">
                      {language === 'en' ? 'Select gender' : 'اختر الجنس'}
                    </option>
                    <option value="male">
                      {language === 'en' ? 'Male' : 'ذكر'}
                    </option>
                    <option value="female">
                      {language === 'en' ? 'Female' : 'أنثى'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Email Address *' : 'البريد الإلكتروني *'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Phone Number *' : 'رقم الهاتف *'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'en' ? '+218-91-xxx-xxxx' : '+218-91-xxx-xxxx'}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Address' : 'العنوان'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'en' ? 'Enter your address in Libya' : 'أدخل عنوانك في ليبيا'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                {language === 'en' ? 'Emergency Contact (Optional)' : 'جهة الاتصال في حالة الطوارئ (اختياري)'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Emergency Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Emergency Contact Name' : 'اسم جهة الاتصال الطارئ'}
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'en' ? 'Full name of emergency contact' : 'الاسم الكامل لجهة الاتصال الطارئ'}
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Emergency Contact Phone' : 'هاتف جهة الاتصال الطارئ'}
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'en' ? '+218-91-xxx-xxxx' : '+218-91-xxx-xxxx'}
                  />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                {language === 'en' ? 'Account Security' : 'أمان الحساب'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Password *' : 'كلمة المرور *'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'en' ? 'Create password (6+ characters)' : 'إنشاء كلمة مرور (6+ أحرف)'}
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Confirm Password *' : 'تأكيد كلمة المرور *'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'en' ? 'Confirm your password' : 'أكد كلمة المرور'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept-terms" className="font-medium text-gray-700">
                  {language === 'en' 
                    ? 'I agree to the Terms and Conditions and Privacy Policy *' 
                    : 'أوافق على الشروط والأحكام وسياسة الخصوصية *'}
                </label>
                <p className="text-gray-500">
                  {language === 'en' 
                    ? 'By registering, you agree to receive medical communications from Shefa Hospital Libya.' 
                    : 'بالتسجيل، فإنك توافق على تلقي التواصل الطبي من مستشفى شفاء ليبيا.'}
                </p>
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
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>{language === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>{language === 'en' ? 'Create Patient Account' : 'إنشاء حساب مريض'}</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/patient-login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                {language === 'en' ? 'Sign in to your account →' : 'سجل دخولك لحسابك ←'}
              </Link>
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
          © 2025 Shefa Hospital Libya - Patient Registration. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </p>
      </div>
    </div>
  );
}
