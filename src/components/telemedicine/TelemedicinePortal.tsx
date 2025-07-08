'use client';

import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Settings, 
  Users, 
  Clock, 
  Calendar,
  FileText,
  Download,
  Upload,
  MessageCircle,
  Share,
  Monitor,
  Camera,
  Volume2,
  VolumeX,
  MoreVertical,
  User,
  Stethoscope,
  Heart,
  AlertCircle,
  CheckCircle,
  Globe
} from 'lucide-react';

const TelemedicinePortal = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock doctor data
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      nameAr: "د. سارة أحمد",
      specialty: "Cardiology",
      specialtyAr: "أمراض القلب",
      location: "Shefa Hospital, Libya",
      locationAr: "مستشفى شفاء، ليبيا",
      avatar: "/api/placeholder/64/64",
      status: "Available",
      statusAr: "متاح",
      experience: "15 years",
      languages: ["Arabic", "English"],
      rating: 4.9,
      consultationFee: "50 LYD"
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      nameAr: "د. أحمد حسن",
      specialty: "Internal Medicine",
      specialtyAr: "الطب الباطني",
      location: "Shefa Hospital, Libya",
      locationAr: "مستشفى شفاء، ليبيا",
      avatar: "/api/placeholder/64/64",
      status: "Available",
      statusAr: "متاح",
      experience: "12 years",
      languages: ["Arabic", "English", "French"],
      rating: 4.8,
      consultationFee: "45 LYD"
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      nameAr: "د. ماريا رودريغيز",
      specialty: "Pediatrics",
      specialtyAr: "طب الأطفال",
      location: "International Partner",
      locationAr: "شريك دولي",
      avatar: "/api/placeholder/64/64",
      status: "Busy",
      statusAr: "مشغول",
      experience: "18 years",
      languages: ["English", "Spanish", "Arabic"],
      rating: 4.9,
      consultationFee: "60 LYD"
    }
  ];

  const mockPatient = {
    name: "Ahmed Al-Mansouri",
    age: 45,
    id: "P001",
    condition: "Follow-up consultation",
    conditionAr: "استشارة متابعة"
  };

  const startCall = (doctor) => {
    setSelectedDoctor(doctor);
    setIsCalling(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsCalling(false);
      setIsConnected(true);
    }, 3000);
  };

  const endCall = () => {
    setIsConnected(false);
    setIsCalling(false);
    setSelectedDoctor(null);
    setChatMessages([]);
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'patient',
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse = {
          id: Date.now() + 1,
          text: language === 'en' 
            ? "Thank you for sharing. Let me review your information."
            : "شكراً لك على المشاركة. دعني أراجع معلوماتك.",
          sender: 'doctor',
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'متاح':
        return 'bg-green-100 text-green-800';
      case 'busy':
      case 'مشغول':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Video Call Header */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <div>
                <h3 className="font-medium">
                  {language === 'en' ? selectedDoctor?.name : selectedDoctor?.nameAr}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'en' ? selectedDoctor?.specialty : selectedDoctor?.specialtyAr}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">
                {language === 'en' ? 'Connected' : 'متصل'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
            {/* Main Video Area */}
            <div className="lg:col-span-3 relative bg-gray-800">
              {/* Doctor Video */}
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                {videoEnabled ? (
                  <div className="text-center">
                    <User className="h-32 w-32 text-gray-400 mx-auto mb-4" />
                    <p className="text-white text-lg">
                      {language === 'en' ? selectedDoctor?.name : selectedDoctor?.nameAr}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {language === 'en' ? 'Video consultation in progress' : 'استشارة فيديو جارية'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="h-32 w-32 text-gray-400 mx-auto mb-4" />
                    <p className="text-white">
                      {language === 'en' ? 'Video disabled' : 'الفيديو معطل'}
                    </p>
                  </div>
                )}
              </div>

              {/* Patient Video (Picture-in-Picture) */}
              <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-600 rounded-lg border-2 border-white">
                <div className="w-full h-full flex items-center justify-center">
                  {videoEnabled ? (
                    <div className="text-center">
                      <User className="h-8 w-8 text-gray-300 mx-auto mb-1" />
                      <p className="text-white text-xs">{mockPatient.name}</p>
                    </div>
                  ) : (
                    <VideoOff className="h-8 w-8 text-gray-300" />
                  )}
                </div>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-3">
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-full transition-colors ${
                      audioEnabled 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-red-600 text-white hover:bg-red-500'
                    }`}
                  >
                    {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full transition-colors ${
                      videoEnabled 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-red-600 text-white hover:bg-red-500'
                    }`}
                  >
                    {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={endCall}
                    className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </button>
                  
                  <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Sidebar */}
            <div className="bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">
                  {language === 'en' ? 'Consultation Chat' : 'محادثة الاستشارة'}
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'patient' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={language === 'en' ? 'Type a message...' : 'اكتب رسالة...'}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCalling) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-pulse mb-6">
            <Video className="h-24 w-24 mx-auto text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'en' ? 'Connecting...' : 'جاري الاتصال...'}
          </h2>
          <p className="text-gray-300 mb-4">
            {language === 'en' 
              ? `Calling ${selectedDoctor?.name}` 
              : `جاري الاتصال بـ ${selectedDoctor?.nameAr}`}
          </p>
          <button
            onClick={endCall}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
          >
            <PhoneOff className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Cancel' : 'إلغاء'}
          </button>
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
              <Video className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Telemedicine Portal' : 'بوابة الطب عن بُعد'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Virtual Healthcare Consultations | استشارات طبية افتراضية' 
                    : 'استشارات طبية افتراضية | Virtual Healthcare Consultations'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">24</h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Today Consultations' : 'استشارات اليوم'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">18 min</h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Avg Session Time' : 'متوسط وقت الجلسة'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">8</h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Available Doctors' : 'الأطباء المتاحون'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">12</h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'International Partners' : 'الشركاء الدوليون'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Doctors */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Available Doctors' : 'الأطباء المتاحون'}
            </h2>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? 'Connect with medical specialists for virtual consultations' 
                : 'تواصل مع الأطباء المتخصصين للاستشارات الافتراضية'}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDoctors.map((doctor) => (
                <div key={doctor.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gray-200 rounded-full p-3">
                      <Stethoscope className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {language === 'en' ? doctor.name : doctor.nameAr}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? doctor.specialty : doctor.specialtyAr}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                          {language === 'en' ? doctor.status : doctor.statusAr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{doctor.consultationFee}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                    </div>
                    
                    <button
                      onClick={() => startCall(doctor)}
                      disabled={doctor.status === 'Busy' || doctor.status === 'مشغول'}
                      className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors ${
                        doctor.status === 'Available' || doctor.status === 'متاح'
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Start Call' : 'بدء المكالمة'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'How Telemedicine Works' : 'كيف يعمل الطب عن بُعد'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? '1. Select Doctor' : '١. اختر الطبيب'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Choose from available specialists and book your consultation'
                  : 'اختر من الأطباء المتخصصين المتاحين واحجز استشارتك'}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Video className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? '2. Video Consultation' : '٢. استشارة فيديو'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Connect via secure video call with your chosen healthcare provider'
                  : 'تواصل عبر مكالمة فيديو آمنة مع مقدم الرعاية الصحية المختار'}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? '3. Follow-up Care' : '٣. رعاية المتابعة'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Receive prescriptions, recommendations, and schedule follow-up visits'
                  : 'احصل على الوصفات والتوصيات وجدولة زيارات المتابعة'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicinePortal;
