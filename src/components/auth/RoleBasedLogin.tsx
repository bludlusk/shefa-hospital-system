'use client';

import React, { useState } from 'react';
import { User, Lock, Shield, Eye, EyeOff, UserCheck, Stethoscope, Heart, Microscope, Settings } from 'lucide-react';
import Link from 'next/link';

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

const RoleBasedLogin: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { 
      value: 'admin', 
      label: 'Hospital Administrator', 
      labelAr: 'مدير المستشفى',
      color: 'bg-red-600',
      icon: Settings,
      description: 'Complete system management and oversight',
      descriptionAr: 'إدارة شاملة للنظام والإشراف'
    },
    { 
      value: 'doctor', 
      label: 'Doctor', 
      labelAr: 'طبيب',
      color: 'bg-blue-600',
      icon: Stethoscope,
      description: 'Patient care, diagnosis, and treatment',
      descriptionAr: 'رعاية المرضى والتشخيص والعلاج'
    },
    { 
      value: 'nurse', 
      label: 'Nurse', 
      labelAr: 'ممرض/ممرضة',
      color: 'bg-green-600',
      icon: Heart,
      description: 'Patient monitoring and care coordination',
      descriptionAr: 'مراقبة المرضى وتنسيق الرعاية'
    },
    { 
      value: 'patient', 
      label: 'Patient', 
      labelAr: 'مريض',
      color: 'bg-purple-600',
      icon: User,
      description: 'Access personal health records and services',
      descriptionAr: 'الوصول للسجلات الصحية والخدمات'
    },
    { 
      value: 'technician', 
      label: 'Medical Technician', 
      labelAr: 'فني طبي',
      color: 'bg-orange-600',
      icon: Microscope,
      description: 'Laboratory and diagnostic equipment management',
      descriptionAr: 'إدارة المختبرات والأجهزة التشخيصية'
    }
  ];

  const demoCredentials = {
    admin: { email: 'admin@shefa.ly', password: 'admin123' },
    doctor: { email: 'doctor@shefa.ly', password: 'doctor123' },
    nurse: { email: 'nurse@shefa.ly', password: 'nurse123' },
    patient: { email: 'patient@shefa.ly', password: 'patient123' },
    technician: { email: 'tech@shefa.ly', password: 'tech123' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const demo = demoCredentials[credentials.role as keyof typeof demoCredentials];
      
      // FIXED: Check if credentials match
      if (credentials.email === demo.email && credentials.password === demo.password) {
        localStorage.setItem('userRole', credentials.role);
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('userName', credentials.role.charAt(0).toUpperCase() + credentials.role.slice(1));
        localStorage.setItem('isAuthenticated', 'true');

        // FIXED: Proper redirects for all roles
        switch (credentials.role) {
          case 'admin':
            window.location.href = '/admin-dashboard';
            break;
          case 'doctor':
            window.location.href = '/doctor-dashboard';
            break;
          case 'nurse':
            window.location.href = '/nurse-dashboard';
            break;
          case 'patient':
            window.location.href = '/patient';
            break;
          case 'technician':
            window.location.href = '/technician-dashboard';
            break;
          default:
            window.location.href = '/patient';
        }
      } else {
        // IMPROVED: Better error message
        setError(`Invalid credentials for ${credentials.role}. Please check your email and password. | بيانات اعتماد غير صالحة`);
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectedRole = roles.find(role => role.value === credentials.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
            <div className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full self-start">
              Libya
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Shefa Hospital Login</h2>
          <p className="text-sm text-gray-600">دخول مستشفى شفاء ليبيا</p>
          <p className="text-xs text-gray-500 mt-2">Select your role to access your personalized dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role | اختر دورك
            </label>
            <div className="space-y-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <label key={role.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={credentials.role === role.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-full p-4 rounded-lg border-2 transition-all ${
                      credentials.role === role.value 
                        ? `${role.color} text-white border-transparent shadow-lg transform scale-105` 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <IconComponent className={`h-8 w-8 ${
                          credentials.role === role.value ? 'text-white' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="font-bold text-lg">{role.label}</div>
                          <div className={`text-sm ${
                            credentials.role === role.value ? 'text-white opacity-90' : 'text-gray-500'
                          }`}>
                            {role.labelAr}
                          </div>
                          <div className={`text-xs mt-1 ${
                            credentials.role === role.value ? 'text-white opacity-75' : 'text-gray-400'
                          }`}>
                            {role.description}
                          </div>
                        </div>
                        {credentials.role === role.value && (
                          <UserCheck className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address | البريد الإلكتروني
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password | كلمة المرور
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-4 rounded-lg font-bold text-white transition-all duration-200 ${
              selectedRole ? selectedRole.color : 'bg-blue-600'
            } hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {selectedRole && <selectedRole.icon className="h-5 w-5 mr-2" />}
                {`Login as ${selectedRole?.label} | دخول`}
              </div>
            )}
          </button>
        </form>

        {/* FIXED: Demo Credentials Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 text-center mb-2 font-medium">
            Demo Credentials for Testing:
          </p>
          <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <strong>Admin:</strong> 
              <span>admin@shefa.ly / admin123</span>
            </div>
            <div className="flex justify-between">
              <strong>Doctor:</strong> 
              <span>doctor@shefa.ly / doctor123</span>
            </div>
            <div className="flex justify-between">
              <strong>Nurse:</strong> 
              <span>nurse@shefa.ly / nurse123</span>
            </div>
            <div className="flex justify-between">
              <strong>Patient:</strong> 
              <span>patient@shefa.ly / patient123</span>
            </div>
            <div className="flex justify-between">
              <strong>Technician:</strong> 
              <span>tech@shefa.ly / tech123</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2 text-center font-medium">
            ✅ All roles have working dashboards
          </p>
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home | العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedLogin;
