'use client';

import React, { useState } from 'react';
import BMICalculator from '../../components/calculators/BMICalculator';
import BloodPressureCalculator from '../../components/calculators/BloodPressureCalculator';
import CalorieCalculator from '../../components/calculators/CalorieCalculator';
import { Calculator, ArrowLeft, Heart, Scale, Utensils, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState('bmi');
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Back to Homepage' : 'العودة للصفحة الرئيسية'}
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-green-600 mr-3" />
                {language === 'en' ? 'Medical Health Calculators' : 'حاسبات الصحة الطبية'}
              </h1>
              <p className="text-gray-600 mt-2">
                {language === 'en' 
                  ? 'Interactive health calculators for medical assessment'
                  : 'حاسبات صحية تفاعلية للتقييم الطبي'}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Medical Calculators Banner */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Heart className="h-12 w-12" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Professional Medical Calculators' : 'حاسبات طبية مهنية'}
                </h2>
                <p className="opacity-90">
                  {language === 'en' 
                    ? 'Get accurate health assessments with our medical-grade calculators'
                    : 'احصل على تقييمات صحية دقيقة باستخدام حاسباتنا الطبية'}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-center">
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm opacity-90">
                  {language === 'en' ? 'Calculators' : 'حاسبات'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">
                  {language === 'en' ? 'Accurate' : 'دقيقة'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calculator Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Available Calculators' : 'الحاسبات المتوفرة'}
              </h3>
              <div className="space-y-3">
                {[
                  { 
                    id: 'bmi', 
                    label: language === 'en' ? 'BMI Calculator' : 'حاسبة مؤشر كتلة الجسم', 
                    icon: <Scale className="h-5 w-5" />,
                    description: language === 'en' ? 'Body Mass Index' : 'مؤشر كتلة الجسم',
                    color: 'blue'
                  },
                  { 
                    id: 'bp', 
                    label: language === 'en' ? 'Blood Pressure' : 'حاسبة ضغط الدم', 
                    icon: <Heart className="h-5 w-5" />,
                    description: language === 'en' ? 'Cardiovascular Health' : 'صحة القلب والأوعية',
                    color: 'red'
                  },
                  { 
                    id: 'calorie', 
                    label: language === 'en' ? 'Calorie Calculator' : 'حاسبة السعرات الحرارية', 
                    icon: <Utensils className="h-5 w-5" />,
                    description: language === 'en' ? 'Daily Energy Needs' : 'الاحتياجات اليومية من الطاقة',
                    color: 'green'
                  }
                ].map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => setActiveCalculator(calc.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left hover:scale-105 ${
                      activeCalculator === calc.id
                        ? `border-${calc.color}-500 bg-${calc.color}-50 shadow-lg`
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeCalculator === calc.id 
                          ? `bg-${calc.color}-100 text-${calc.color}-600` 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {calc.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{calc.label}</div>
                        <div className="text-xs text-gray-500">{calc.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">
                  {language === 'en' ? 'Calculator Features' : 'ميزات الحاسبات'}
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{language === 'en' ? 'Medically Accurate' : 'دقيقة طبياً'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{language === 'en' ? 'Instant Results' : 'نتائج فورية'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{language === 'en' ? 'Professional Guidelines' : 'إرشادات مهنية'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{language === 'en' ? 'Bilingual Support' : 'دعم ثنائي اللغة'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Calculator Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Calculator Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {activeCalculator === 'bmi' && (
                      <>
                        <Scale className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {language === 'en' ? 'BMI Calculator' : 'حاسبة مؤشر كتلة الجسم'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Calculate your Body Mass Index' : 'احسب مؤشر كتلة الجسم'}
                          </p>
                        </div>
                      </>
                    )}
                    {activeCalculator === 'bp' && (
                      <>
                        <Heart className="h-6 w-6 text-red-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {language === 'en' ? 'Blood Pressure Calculator' : 'حاسبة ضغط الدم'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Analyze your cardiovascular health' : 'حلل صحة القلب والأوعية الدموية'}
                          </p>
                        </div>
                      </>
                    )}
                    {activeCalculator === 'calorie' && (
                      <>
                        <Utensils className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {language === 'en' ? 'Calorie Calculator' : 'حاسبة السعرات الحرارية'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Calculate your daily energy needs' : 'احسب احتياجاتك اليومية من الطاقة'}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {language === 'en' ? 'Shefa Hospital Libya' : 'مستشفى شفاء ليبيا'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {language === 'en' ? 'Medical Grade Calculator' : 'حاسبة طبية متقدمة'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Content */}
              <div className="p-6">
                {activeCalculator === 'bmi' && <BMICalculator />}
                {activeCalculator === 'bp' && <BloodPressureCalculator />}
                {activeCalculator === 'calorie' && <CalorieCalculator />}
              </div>
            </div>

            {/* Health Tips Panel */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  {language === 'en' ? 'Health Tips & Recommendations' : 'نصائح وتوصيات صحية'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    {language === 'en' ? 'General Health Guidelines:' : 'إرشادات صحية عامة:'}
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• {language === 'en' ? 'Regular health check-ups are recommended' : 'الفحوصات الصحية المنتظمة موصى بها'}</li>
                    <li>• {language === 'en' ? 'Maintain a balanced diet and exercise routine' : 'حافظ على نظام غذائي متوازن وروتين رياضي'}</li>
                    <li>• {language === 'en' ? 'Monitor your vital signs regularly' : 'راقب علاماتك الحيوية بانتظام'}</li>
                    <li>• {language === 'en' ? 'Consult healthcare professionals for concerns' : 'استشر المتخصصين في الرعاية الصحية عند القلق'}</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">
                    {language === 'en' ? 'When to See a Doctor:' : 'متى تراجع الطبيب:'}
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• {language === 'en' ? 'Unusual changes in health metrics' : 'تغييرات غير عادية في المؤشرات الصحية'}</li>
                    <li>• {language === 'en' ? 'Persistent symptoms or concerns' : 'أعراض أو مخاوف مستمرة'}</li>
                    <li>• {language === 'en' ? 'High-risk calculator results' : 'نتائج حاسبة عالية الخطورة'}</li>
                    <li>• {language === 'en' ? 'Questions about your health status' : 'أسئلة حول حالتك الصحية'}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/#appointment"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                  >
                    {language === 'en' ? 'Book Health Consultation' : 'احجز استشارة صحية'}
                  </Link>
                  <Link 
                    href="/telemedicine"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    {language === 'en' ? 'Virtual Consultation' : 'استشارة افتراضية'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-yellow-800">
                {language === 'en' ? 'Medical Disclaimer' : 'إخلاء مسؤولية طبية'}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {language === 'en' 
                    ? 'These calculators are for educational and informational purposes only. They are not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers at Shefa Hospital Libya for any health concerns or before making medical decisions based on these calculations.'
                    : 'هذه الحاسبات لأغراض تعليمية وإعلامية فقط. وهي غير مخصصة لتحل محل المشورة الطبية المهنية أو التشخيص أو العلاج. استشر دائماً مقدمي الرعاية الصحية المؤهلين في مستشفى شفاء ليبيا لأي مخاوف صحية أو قبل اتخاذ قرارات طبية بناءً على هذه الحسابات.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
