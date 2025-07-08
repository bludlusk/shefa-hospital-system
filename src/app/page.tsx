'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Stethoscope,
  Activity,
  Zap,
  Baby,
  Video,
  Bot,
  Calculator,
  UserCheck,
  Microscope,
  Settings,
  Menu,
  X,
  Globe,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  BrainCircuit
} from 'lucide-react';

const HomePage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to your backend
    alert(currentLanguage === 'en' 
      ? 'Appointment request submitted successfully! We will contact you shortly.' 
      : 'تم تقديم طلب الموعد بنجاح! سنتصل بك قريباً.');
    setAppointmentForm({
      name: '', phone: '', email: '', department: '', 
      preferredDate: '', preferredTime: '', message: ''
    });
  };

  const services = [
    {
      icon: <AlertCircle className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'Emergency Care' : 'الرعاية الطارئة',
      description: currentLanguage === 'en' 
        ? 'Round-the-clock emergency medical services with rapid response team'
        : 'خدمات طبية طارئة على مدار الساعة مع فريق استجابة سريعة',
      color: 'red'
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'Cardiology' : 'أمراض القلب',
      description: currentLanguage === 'en'
        ? 'State-of-the-art heart care with latest diagnostic equipment'
        : 'رعاية القلب المتطورة مع أحدث معدات التشخيص',
      color: 'blue'
    },
    {
      icon: <Activity className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'Surgery' : 'الجراحة',
      description: currentLanguage === 'en'
        ? 'Minimally invasive surgical procedures with expert medical team'
        : 'إجراءات جراحية طفيفة التوغل مع فريق طبي خبير',
      color: 'green'
    },
    {
      icon: <Baby className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'Pediatrics' : 'طب الأطفال',
      description: currentLanguage === 'en'
        ? 'Specialized medical care for infants, children, and adolescents'
        : 'رعاية طبية متخصصة للرضع والأطفال والمراهقين',
      color: 'purple'
    },
    {
      icon: <Video className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'Telemedicine' : 'الطب عن بُعد',
      description: currentLanguage === 'en'
        ? 'AI-powered virtual consultations with international specialists'
        : 'استشارات افتراضية مدعومة بالذكاء الاصطناعي مع أخصائيين دوليين',
      color: 'indigo'
    },
    {
      icon: <BrainCircuit className="h-12 w-12" />,
      title: currentLanguage === 'en' ? 'AI Medical Assistant' : 'المساعد الطبي الذكي',
      description: currentLanguage === 'en'
        ? 'Advanced medical guidance and diagnostic support'
        : 'إرشاد طبي متقدم مدعوم بالذكاء الاصطناعي ودعم التشخيص',
      color: 'orange'
    }
  ];

  const aiFeatures = [
    {
      title: currentLanguage === 'en' ? 'AI Health Assessment' : 'تقييم الصحة بالذكاء الاصطناعي',
      description: currentLanguage === 'en' 
        ? 'Smart health screening with AI-powered analysis' 
        : 'فحص صحي ذكي مع تحليل مدعوم بالذكاء الاصطناعي',
      icon: <BrainCircuit className="h-8 w-8" />,
      link: '/calculators#ai-assistant'
    },
    {
      title: currentLanguage === 'en' ? 'Virtual Consultations' : 'الاستشارات الافتراضية',
      description: currentLanguage === 'en' 
        ? 'Connect with doctors worldwide through AI-enhanced telemedicine' 
        : 'تواصل مع الأطباء في جميع أنحاء العالم من خلال الطب عن بُعد المعزز بالذكاء الاصطناعي',
      icon: <Video className="h-8 w-8" />,
      link: '/telemedicine'
    },
    {
      title: currentLanguage === 'en' ? 'Smart Health Tools' : 'أدوات الصحة الذكية',
      description: currentLanguage === 'en' 
        ? 'AI-powered medical calculators and health monitoring' 
        : 'حاسبات طبية وأدوات مراقبة صحية مدعومة بالذكاء الاصطناعي',
      icon: <Calculator className="h-8 w-8" />,
      link: '/calculators'
    }
  ];

  const departments = [
    'Emergency Medicine | طب الطوارئ',
    'Cardiology | أمراض القلب', 
    'Pediatrics | طب الأطفال',
    'Surgery | الجراحة',
    'Internal Medicine | الطب الباطني',
    'Gynecology | أمراض النساء',
    'Orthopedics | العظام',
    'Dermatology | الأمراض الجلدية'
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hover: 'hover:bg-red-100' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-100' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:bg-indigo-100' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:bg-orange-100' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-red-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shefa Hospital Libya</h1>
                <p className="text-sm text-gray-600">مستشفى شفاء ليبيا</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">
                {currentLanguage === 'en' ? 'Services' : 'الخدمات'}
              </a>
              <a href="#ai-features" className="text-gray-700 hover:text-red-600 transition-colors">
                {currentLanguage === 'en' ? 'AI Technology' : 'تقنية الذكاء الاصطناعي'}
              </a>
              <a href="#appointment" className="text-gray-700 hover:text-red-600 transition-colors">
                {currentLanguage === 'en' ? 'Book Appointment' : 'حجز موعد'}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">
                {currentLanguage === 'en' ? 'Contact' : 'اتصل'}
              </a>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <Link 
                href="/staff-login"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {currentLanguage === 'en' ? 'Staff Login' : 'دخول الموظفين'}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">
                  {currentLanguage === 'en' ? 'Services' : 'الخدمات'}
                </a>
                <a href="#ai-features" className="text-gray-700 hover:text-red-600 transition-colors">
                  {currentLanguage === 'en' ? 'AI Technology' : 'تقنية الذكاء الاصطناعي'}
                </a>
                <a href="#appointment" className="text-gray-700 hover:text-red-600 transition-colors">
                  {currentLanguage === 'en' ? 'Book Appointment' : 'حجز موعد'}
                </a>
                <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">
                  {currentLanguage === 'en' ? 'Contact' : 'اتصل'}
                </a>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  <Globe className="h-5 w-5" />
                  <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
                </button>
                <Link 
                  href="/staff-login"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                >
                  {currentLanguage === 'en' ? 'Staff Login' : 'دخول الموظفين'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'en' ? 'AI-Powered Healthcare' : 'رعاية صحية مدعومة بالذكاء الاصطناعي'}
              <span className="block text-red-600">
                {currentLanguage === 'en' ? 'for Libya' : 'لليبيا'}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Experience the future of healthcare with AI-enhanced medical services, virtual consultations, and smart diagnostic tools at Shefa Hospital Libya.'
                : 'اختبر مستقبل الرعاية الصحية مع الخدمات الطبية المعززة بالذكاء الاصطناعي والاستشارات الافتراضية وأدوات التشخيص الذكية في مستشفى شفاء ليبيا.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#appointment"
                className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 flex items-center justify-center focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {currentLanguage === 'en' ? 'Book Appointment' : 'حجز موعد'}
              </a>
              <Link 
                href="/patient-login"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <Heart className="h-5 w-5 mr-2" />
                {currentLanguage === 'en' ? 'Patient Portal' : 'بوابة المريض'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai-features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                {currentLanguage === 'en' ? 'AI-Powered Medical Technology' : 'التقنية الطبية المدعومة بالذكاء الاصطناعي'}
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Experience cutting-edge artificial intelligence integrated throughout our medical services for enhanced diagnosis, treatment, and patient care.'
                : 'اختبر الذكاء الاصطناعي المتطور المدمج في جميع خدماتنا الطبية لتحسين التشخيص والعلاج ورعاية المرضى.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <Link 
                key={index}
                href={feature.link}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-105 group focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <div className="bg-indigo-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-indigo-200 transition-colors">
                  <div className="text-indigo-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-800">
                  <span>{currentLanguage === 'en' ? 'Explore Feature' : 'استكشف الميزة'}</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'en' ? 'Medical Services' : 'الخدمات الطبية'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Comprehensive healthcare services enhanced with artificial intelligence and cutting-edge medical technology.'
                : 'خدمات رعاية صحية شاملة معززة بالذكاء الاصطناعي والتقنية الطبية المتطورة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const colorClass = getColorClasses(service.color);
              return (
                <div 
                  key={index}
                  className={`p-6 ${colorClass.bg} rounded-lg border ${colorClass.border} ${colorClass.hover} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  <div className={`${colorClass.text} mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="appointment" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'en' ? 'Book Your Appointment' : 'احجز موعدك'}
            </h2>
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'Schedule your consultation with our medical experts. We\'ll contact you to confirm your appointment.'
                : 'احجز استشارتك مع خبرائنا الطبيين. سنتصل بك لتأكيد موعدك.'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleAppointmentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Full Name' : 'الاسم الكامل'}
                  </label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder={currentLanguage === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder={currentLanguage === 'en' ? '+218-91-xxx-xxxx' : '+218-91-xxx-xxxx'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                  </label>
                  <input
                    type="email"
                    required
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder={currentLanguage === 'en' ? 'your@email.com' : 'your@email.com'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Department' : 'القسم'}
                  </label>
                  <select
                    required
                    value={appointmentForm.department}
                    onChange={(e) => setAppointmentForm({...appointmentForm, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">
                      {currentLanguage === 'en' ? 'Select department' : 'اختر القسم'}
                    </option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Preferred Date' : 'التاريخ المفضل'}
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentForm.preferredDate}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'en' ? 'Preferred Time' : 'الوقت المفضل'}
                  </label>
                  <select
                    required
                    value={appointmentForm.preferredTime}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">
                      {currentLanguage === 'en' ? 'Select time' : 'اختر الوقت'}
                    </option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLanguage === 'en' ? 'Additional Message' : 'رسالة إضافية'}
                </label>
                <textarea
                  rows={4}
                  value={appointmentForm.message}
                  onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={currentLanguage === 'en' 
                    ? 'Please describe your symptoms or reason for visit...' 
                    : 'يرجى وصف الأعراض أو سبب الزيارة...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-lg font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {currentLanguage === 'en' ? 'Request Appointment' : 'طلب موعد'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">
                    {currentLanguage === 'en' ? 'Appointment Confirmation Process:' : 'عملية تأكيد الموعد:'}
                  </p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• {currentLanguage === 'en' ? 'We will call you within 2 hours to confirm' : 'سنتصل بك خلال ساعتين للتأكيد'}</li>
                    <li>• {currentLanguage === 'en' ? 'Alternative dates will be offered if needed' : 'سيتم تقديم تواريخ بديلة إذا لزم الأمر'}</li>
                    <li>• {currentLanguage === 'en' ? 'You will receive SMS confirmation' : 'ستتلقى تأكيد برسالة نصية'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section id="emergency" className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <AlertCircle className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              {currentLanguage === 'en' ? 'Emergency Services' : 'خدمات الطوارئ'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {currentLanguage === 'en' 
                ? '24/7 Emergency medical services with AI-enhanced triage and rapid response.'
                : 'خدمات طبية طارئة على مدار الساعة مع فرز معزز بالذكاء الاصطناعي واستجابة سريعة.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+218911234567"
                className="bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center text-lg font-bold focus:ring-2 focus:ring-white focus:outline-none"
              >
                <Phone className="h-6 w-6 mr-3" />
                +218-91-123-4567
              </a>
              <div className="text-white text-sm opacity-75">
                {currentLanguage === 'en' ? 'Emergency Hotline' : 'خط الطوارئ'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
            </h2>
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'Get in touch with us for appointments, inquiries, or general information.'
                : 'تواصل معنا للمواعيد أو الاستفسارات أو المعلومات العامة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Phone' : 'الهاتف'}
              </h3>
              <p className="text-gray-600">+218-91-123-4567</p>
              <p className="text-gray-600">+218-21-987-6543</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Location' : 'الموقع'}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === 'en' 
                  ? 'Medical District, Tripoli, Libya'
                  : 'الحي الطبي، طرابلس، ليبيا'}
              </p>
              <p className="text-gray-600">P.O. Box 12345</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Hours' : 'ساعات العمل'}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === 'en' 
                  ? '24/7 Emergency Services'
                  : 'خدمات الطوارئ على مدار الساعة'}
              </p>
              <p className="text-gray-600">
                {currentLanguage === 'en' 
                  ? 'Appointments: 8 AM - 6 PM'
                  : 'المواعيد: ٨ ص - ٦ م'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-xl font-bold">Shefa Hospital Libya</h3>
                  <p className="text-gray-400">مستشفى شفاء ليبيا</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                {currentLanguage === 'en' 
                  ? 'AI-powered healthcare solutions for comprehensive medical care in Libya. Experience the future of medicine today.'
                  : 'حلول الرعاية الصحية المدعومة بالذكاء الاصطناعي للرعاية الطبية الشاملة في ليبيا. اختبر مستقبل الطب اليوم.'}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">
                {currentLanguage === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-2">
                <li><Link href="/telemedicine" className="text-gray-400 hover:text-white transition-colors">
                  {currentLanguage === 'en' ? 'Telemedicine' : 'الطب عن بُعد'}
                </Link></li>
                <li><Link href="/calculators" className="text-gray-400 hover:text-white transition-colors">
                  {currentLanguage === 'en' ? 'AI Health Tools' : 'أدوات الصحة الذكية'}
                </Link></li>
                <li><a href="#appointment" className="text-gray-400 hover:text-white transition-colors">
                  {currentLanguage === 'en' ? 'Book Appointment' : 'حجز موعد'}
                </a></li>
                <li><Link href="/patient-login" className="text-gray-400 hover:text-white transition-colors">
                  {currentLanguage === 'en' ? 'Patient Portal' : 'بوابة المريض'}
                </Link></li>
                <li><Link href="/staff-login" className="text-gray-400 hover:text-white transition-colors">
                  {currentLanguage === 'en' ? 'Staff Login' : 'دخول الموظفين'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">
                {currentLanguage === 'en' ? 'Contact' : 'اتصل بنا'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +218-91-123-4567
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentLanguage === 'en' ? 'Tripoli, Libya' : 'طرابلس، ليبيا'}
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {currentLanguage === 'en' ? '24/7 Emergency' : 'طوارئ ٢٤/٧'}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2025 Shefa Hospital Libya. {currentLanguage === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
