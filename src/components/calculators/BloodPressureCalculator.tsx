'use client';

import React, { useState, useCallback } from 'react';
import { Heart, TrendingUp, AlertTriangle, CheckCircle, Info, Loader, Activity } from 'lucide-react';

const BloodPressureCalculator: React.FC = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const analyzeBP = useCallback(async () => {
    setError('');
    
    if (!systolic || !diastolic) {
      setError(language === 'en' 
        ? 'Please enter both systolic and diastolic pressure' 
        : 'يرجى إدخال الضغط الانقباضي والانبساطي');
      return;
    }

    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);

    if (sys <= 0 || dia <= 0) {
      setError(language === 'en' 
        ? 'Please enter valid positive numbers' 
        : 'يرجى إدخال أرقام صحيحة موجبة');
      return;
    }

    if (sys < 50 || sys > 250 || dia < 30 || dia > 150) {
      setError(language === 'en' 
        ? 'Please enter realistic blood pressure values' 
        : 'يرجى إدخال قيم ضغط دم واقعية');
      return;
    }

    if (sys <= dia) {
      setError(language === 'en' 
        ? 'Systolic pressure should be higher than diastolic pressure' 
        : 'يجب أن يكون الضغط الانقباضي أعلى من الضغط الانبساطي');
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let categoryEn = '';
      let categoryAr = '';
      let recommendationEn = '';
      let recommendationAr = '';
      let risk = '';

      if (sys < 120 && dia < 80) {
        categoryEn = 'Normal';
        categoryAr = 'طبيعي';
        recommendationEn = 'Maintain healthy lifestyle with regular exercise, balanced diet, and stress management.';
        recommendationAr = 'حافظ على نمط حياة صحي مع التمارين المنتظمة والنظام الغذائي المتوازن وإدارة التوتر.';
        risk = 'low';
      } else if (sys >= 120 && sys <= 129 && dia < 80) {
        categoryEn = 'Elevated';
        categoryAr = 'مرتفع قليلاً';
        recommendationEn = 'Adopt healthy lifestyle changes. Monitor regularly and consult healthcare provider.';
        recommendationAr = 'اعتمد تغييرات نمط الحياة الصحية. راقب بانتظام واستشر مقدم الرعاية الصحية.';
        risk = 'low';
      } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
        categoryEn = 'High Blood Pressure Stage 1';
        categoryAr = 'ارتفاع ضغط الدم المرحلة الأولى';
        recommendationEn = 'Lifestyle changes and possible medication. Regular monitoring required. Consult doctor at Shefa Hospital.';
        recommendationAr = 'تغييرات نمط الحياة وأدوية محتملة. مراقبة منتظمة مطلوبة. استشر طبيب في مستشفى شفاء.';
        risk = 'medium';
      } else if ((sys >= 140 && sys <= 179) || (dia >= 90 && dia <= 119)) {
        categoryEn = 'High Blood Pressure Stage 2';
        categoryAr = 'ارتفاع ضغط الدم المرحلة الثانية';
        recommendationEn = 'Medication likely needed along with lifestyle changes. Schedule appointment immediately.';
        recommendationAr = 'الأدوية مطلوبة على الأرجح مع تغييرات نمط الحياة. حدد موعداً فوراً.';
        risk = 'high';
      } else if (sys >= 180 || dia >= 120) {
        categoryEn = 'Hypertensive Crisis';
        categoryAr = 'أزمة ارتفاع ضغط الدم';
        recommendationEn = 'EMERGENCY: Seek immediate medical attention. Call Shefa Hospital Emergency: +218-91-123-4567';
        recommendationAr = 'طوارئ: اطلب الرعاية الطبية الفورية. اتصل بطوارئ مستشفى شفاء: +218-91-123-4567';
        risk = 'emergency';
      }

      setCategory(language === 'en' ? categoryEn : categoryAr);
      setRecommendation(language === 'en' ? recommendationEn : recommendationAr);
      setRiskLevel(risk);

    } catch (err) {
      setError(language === 'en' 
        ? 'Analysis error. Please try again.' 
        : 'خطأ في التحليل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [systolic, diastolic, language]);

  const resetCalculator = useCallback(() => {
    setSystolic('');
    setDiastolic('');
    setCategory('');
    setRecommendation('');
    setRiskLevel('');
    setError('');
  }, []);

  const getBPColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'emergency': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBPBgColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'emergency': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getBPIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'medium': return <Info className="h-6 w-6 text-yellow-600" />;
      case 'high': return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      case 'emergency': return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default: return <Activity className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Blood Pressure Calculator' : 'حاسبة ضغط الدم'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Cardiovascular Health Assessment' 
                : 'تقييم صحة القلب والأوعية الدموية'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Blood Pressure Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Systolic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Systolic Pressure' : 'الضغط الانقباضي'}
              <span className="text-xs text-gray-500 ml-1">
                ({language === 'en' ? 'Top number' : 'الرقم العلوي'})
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={language === 'en' ? 'e.g., 120' : 'مثال: 120'}
                min="50"
                max="250"
                aria-label={language === 'en' ? 'Systolic blood pressure' : 'ضغط الدم الانقباضي'}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">mmHg</span>
              </div>
            </div>
          </div>

          {/* Diastolic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Diastolic Pressure' : 'الضغط الانبساطي'}
              <span className="text-xs text-gray-500 ml-1">
                ({language === 'en' ? 'Bottom number' : 'الرقم السفلي'})
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={language === 'en' ? 'e.g., 80' : 'مثال: 80'}
                min="30"
                max="150"
                aria-label={language === 'en' ? 'Diastolic blood pressure' : 'ضغط الدم الانبساطي'}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">mmHg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Analyze Button */}
        <div className="flex space-x-3">
          <button
            onClick={analyzeBP}
            disabled={isAnalyzing || !systolic || !diastolic}
            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            aria-label={language === 'en' ? 'Analyze blood pressure' : 'تحليل ضغط الدم'}
          >
            {isAnalyzing ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                {language === 'en' ? 'Analyzing...' : 'جاري التحليل...'}
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Analyze Blood Pressure' : 'تحليل ضغط الدم'}
              </>
            )}
          </button>
          
          {(category || error) && (
            <button
              onClick={resetCalculator}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label={language === 'en' ? 'Reset calculator' : 'إعادة تعيين الحاسبة'}
            >
              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
            </button>
          )}
        </div>

        {/* Results */}
        {category && (
          <div className={`p-4 rounded-lg border-2 ${getBPBgColor(riskLevel)} transition-all duration-500`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getBPIcon(riskLevel)}
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Blood Pressure Analysis' : 'تحليل ضغط الدم'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Based on AHA guidelines' : 'وفقاً لإرشادات جمعية القلب الأمريكية'}
                  </p>
                </div>
              </div>
              {riskLevel === 'emergency' && (
                <div className="animate-pulse">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getBPColor(riskLevel)} mb-1`}>
                  {systolic}/{diastolic}
                </div>
                <div className="text-xs text-gray-500">mmHg</div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Reading' : 'القراءة'}
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-lg font-bold ${getBPColor(riskLevel)} mb-1`}>
                  {category}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Category' : 'التصنيف'}
                </div>
              </div>

              <div className="text-center">
                <div className={`text-lg font-bold ${getBPColor(riskLevel)} mb-1 capitalize`}>
                  {riskLevel === 'low' && (language === 'en' ? 'Low Risk' : 'خطر منخفض')}
                  {riskLevel === 'medium' && (language === 'en' ? 'Medium Risk' : 'خطر متوسط')}
                  {riskLevel === 'high' && (language === 'en' ? 'High Risk' : 'خطر عالي')}
                  {riskLevel === 'emergency' && (language === 'en' ? 'Emergency' : 'طارئ')}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Risk Level' : 'مستوى الخطر'}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-3 bg-white bg-opacity-50 rounded-md">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    {language === 'en' ? 'Medical Recommendation' : 'التوصية الطبية'}
                  </h5>
                  <p className="text-sm text-gray-600">{recommendation}</p>
                </div>
              </div>
            </div>

            {/* Emergency Alert */}
            {riskLevel === 'emergency' && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-red-800 mb-1">
                      {language === 'en' ? 'EMERGENCY ALERT' : 'تنبيه طارئ'}
                    </h5>
                    <p className="text-sm text-red-700">
                      {language === 'en' 
                        ? 'Call emergency services immediately or visit Shefa Hospital Emergency Department.'
                        : 'اتصل بخدمات الطوارئ فوراً أو قم بزيارة قسم الطوارئ في مستشفى شفاء.'}
                    </p>
                    <div className="mt-2">
                      <a 
                        href="tel:+218911234567"
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'Call Emergency' : 'اتصل بالطوارئ'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BP Scale Reference */}
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-md">
              <h5 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Blood Pressure Categories (AHA)' : 'فئات ضغط الدم (جمعية القلب الأمريكية)'}
              </h5>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">
                    {language === 'en' ? 'Normal' : 'طبيعي'}
                  </span>
                  <span>{'< 120/80'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600 font-medium">
                    {language === 'en' ? 'Elevated' : 'مرتفع قليلاً'}
                  </span>
                  <span>120-129/{'<80'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600 font-medium">
                    {language === 'en' ? 'Stage 1' : 'المرحلة الأولى'}
                  </span>
                  <span>130-139/80-89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600 font-medium">
                    {language === 'en' ? 'Stage 2' : 'المرحلة الثانية'}
                  </span>
                  <span>140-179/90-119</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">
                    {language === 'en' ? 'Crisis' : 'أزمة'}
                  </span>
                  <span>{'≥180/≥120'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips for Accurate Reading */}
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <h5 className="font-medium text-gray-900 mb-2 flex items-center">
            <Info className="h-4 w-4 mr-2 text-blue-600" />
            {language === 'en' ? 'Tips for Accurate Reading' : 'نصائح للحصول على قراءة دقيقة'}
          </h5>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• {language === 'en' ? 'Rest for 5 minutes before measuring' : 'استرح لمدة 5 دقائق قبل القياس'}</li>
            <li>• {language === 'en' ? 'Sit with feet flat on floor' : 'اجلس مع وضع القدمين مسطحتين على الأرض'}</li>
            <li>• {language === 'en' ? 'Avoid caffeine and smoking before measurement' : 'تجنب الكافيين والتدخين قبل القياس'}</li>
            <li>• {language === 'en' ? 'Take multiple readings and use average' : 'خذ قراءات متعددة واستخدم المتوسط'}</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500">
            {language === 'en' 
              ? '* This calculator provides general guidance only. For accurate diagnosis and treatment, please consult with cardiologists at Shefa Hospital Libya. In case of emergency readings, seek immediate medical attention.'
              : '* توفر هذه الحاسبة إرشادات عامة فقط. للحصول على تشخيص ودقيق وعلاج، يرجى استشارة أطباء القلب في مستشفى شفاء ليبيا. في حالة القراءات الطارئة، اطلب الرعاية الطبية الفورية.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureCalculator;
