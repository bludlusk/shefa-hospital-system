'use client';

import React, { useState, useCallback } from 'react';
import { Scale, TrendingUp, AlertCircle, CheckCircle, Info, Loader } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const calculateBMI = useCallback(async () => {
    setError('');
    
    if (!height || !weight) {
      setError(language === 'en' 
        ? 'Please enter both height and weight' 
        : 'يرجى إدخال الطول والوزن');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum <= 0 || weightNum <= 0) {
      setError(language === 'en' 
        ? 'Please enter valid positive numbers' 
        : 'يرجى إدخال أرقام صحيحة موجبة');
      return;
    }

    if (heightNum > 300 || weightNum > 500) {
      setError(language === 'en' 
        ? 'Please enter realistic values' 
        : 'يرجى إدخال قيم واقعية');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const heightInMeters = heightNum / 100;
      const bmiValue = weightNum / (heightInMeters * heightInMeters);
      const roundedBMI = Math.round(bmiValue * 10) / 10;

      setBMI(roundedBMI);
      
      // Set category and recommendations
      if (roundedBMI < 18.5) {
        setCategory(language === 'en' ? 'Underweight' : 'نقص في الوزن');
        setRecommendation(language === 'en' 
          ? 'Consider consulting a nutritionist for healthy weight gain strategies.' 
          : 'فكر في استشارة أخصائي تغذية لاستراتيجيات زيادة الوزن الصحية.');
      } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        setCategory(language === 'en' ? 'Normal weight' : 'وزن طبيعي');
        setRecommendation(language === 'en' 
          ? 'Maintain your current healthy lifestyle with regular exercise and balanced diet.' 
          : 'حافظ على نمط حياتك الصحي الحالي مع التمارين المنتظمة والنظام الغذائي المتوازن.');
      } else if (roundedBMI >= 25 && roundedBMI < 30) {
        setCategory(language === 'en' ? 'Overweight' : 'زيادة في الوزن');
        setRecommendation(language === 'en' 
          ? 'Consider increasing physical activity and consulting a healthcare provider.' 
          : 'فكر في زيادة النشاط البدني واستشارة مقدم الرعاية الصحية.');
      } else {
        setCategory(language === 'en' ? 'Obese' : 'سمنة');
        setRecommendation(language === 'en' 
          ? 'Consult a healthcare provider for personalized weight management plan.' 
          : 'استشر مقدم الرعاية الصحية للحصول على خطة شخصية لإدارة الوزن.');
      }
    } catch (err) {
      setError(language === 'en' 
        ? 'Calculation error. Please try again.' 
        : 'خطأ في الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsCalculating(false);
    }
  }, [height, weight, language]);

  const resetCalculator = useCallback(() => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setCategory('');
    setRecommendation('');
    setError('');
  }, []);

  const getBMIColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'text-blue-600';
    if (bmiValue >= 18.5 && bmiValue < 25) return 'text-green-600';
    if (bmiValue >= 25 && bmiValue < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIBgColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'bg-blue-50 border-blue-200';
    if (bmiValue >= 18.5 && bmiValue < 25) return 'bg-green-50 border-green-200';
    if (bmiValue >= 25 && bmiValue < 30) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getBMIIcon = (bmiValue: number) => {
    if (bmiValue < 18.5) return <TrendingUp className="h-6 w-6 text-blue-600" />;
    if (bmiValue >= 18.5 && bmiValue < 25) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (bmiValue >= 25 && bmiValue < 30) return <AlertCircle className="h-6 w-6 text-yellow-600" />;
    return <AlertCircle className="h-6 w-6 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Scale className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'BMI Calculator' : 'حاسبة مؤشر كتلة الجسم'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Body Mass Index Assessment' 
                : 'تقييم مؤشر كتلة الجسم'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Height (cm)' : 'الطول (سم)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={language === 'en' ? 'Enter your height in cm' : 'أدخل طولك بالسنتيمتر'}
            min="1"
            max="300"
            aria-label={language === 'en' ? 'Height in centimeters' : 'الطول بالسنتيمتر'}
          />
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Weight (kg)' : 'الوزن (كغ)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={language === 'en' ? 'Enter your weight in kg' : 'أدخل وزنك بالكيلوغرام'}
            min="1"
            max="500"
            step="0.1"
            aria-label={language === 'en' ? 'Weight in kilograms' : 'الوزن بالكيلوغرام'}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Calculate Button */}
        <div className="flex space-x-3">
          <button
            onClick={calculateBMI}
            disabled={isCalculating || !height || !weight}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            aria-label={language === 'en' ? 'Calculate BMI' : 'حساب مؤشر كتلة الجسم'}
          >
            {isCalculating ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                {language === 'en' ? 'Calculating...' : 'جاري الحساب...'}
              </>
            ) : (
              <>
                <Scale className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Calculate BMI' : 'احسب مؤشر كتلة الجسم'}
              </>
            )}
          </button>
          
          {(bmi !== null || error) && (
            <button
              onClick={resetCalculator}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label={language === 'en' ? 'Reset calculator' : 'إعادة تعيين الحاسبة'}
            >
              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
            </button>
          )}
        </div>

        {/* Results */}
        {bmi !== null && (
          <div className={`p-4 rounded-lg border-2 ${getBMIBgColor(bmi)} transition-all duration-500`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getBMIIcon(bmi)}
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Your BMI Result' : 'نتيجة مؤشر كتلة الجسم'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Based on WHO standards' : 'وفقاً لمعايير منظمة الصحة العالمية'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getBMIColor(bmi)} mb-2`}>
                  {bmi}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'BMI Value' : 'قيمة المؤشر'}
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-lg font-bold ${getBMIColor(bmi)} mb-2`}>
                  {category}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Category' : 'التصنيف'}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-md">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    {language === 'en' ? 'Recommendation' : 'التوصية'}
                  </h5>
                  <p className="text-sm text-gray-600">{recommendation}</p>
                </div>
              </div>
            </div>

            {/* BMI Scale Reference */}
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-md">
              <h5 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? 'BMI Scale Reference' : 'مرجع مقياس مؤشر كتلة الجسم'}
              </h5>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Underweight' : 'نقص في الوزن'}</span>
                  <span>{'< 18.5'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Normal weight' : 'وزن طبيعي'}</span>
                  <span>18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Overweight' : 'زيادة في الوزن'}</span>
                  <span>25.0 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Obese' : 'سمنة'}</span>
                  <span>{'≥ 30.0'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500">
            {language === 'en' 
              ? '* This calculator provides general guidance only. For personalized medical advice, please consult with healthcare professionals at Shefa Hospital Libya.'
              : '* توفر هذه الحاسبة إرشادات عامة فقط. للحصول على المشورة الطبية الشخصية، يرجى استشارة المتخصصين في الرعاية الصحية في مستشفى شفاء ليبيا.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
