'use client';

import React, { useState, useCallback } from 'react';
import { Utensils, Zap, TrendingUp, Info, Loader, Activity, Target, AlertCircle } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState<number | null>(null);
  const [bmr, setBMR] = useState<number | null>(null);
  const [macros, setMacros] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const activityLevels = [
    {
      value: 'sedentary',
      labelEn: 'Sedentary (little or no exercise)',
      labelAr: 'خامل (تمرين قليل أو معدوم)',
      multiplier: 1.2
    },
    {
      value: 'light',
      labelEn: 'Lightly active (light exercise 1-3 days/week)',
      labelAr: 'نشط قليلاً (تمرين خفيف 1-3 أيام/أسبوع)',
      multiplier: 1.375
    },
    {
      value: 'moderate',
      labelEn: 'Moderately active (moderate exercise 3-5 days/week)',
      labelAr: 'نشط متوسط (تمرين متوسط 3-5 أيام/أسبوع)',
      multiplier: 1.55
    },
    {
      value: 'very',
      labelEn: 'Very active (hard exercise 6-7 days/week)',
      labelAr: 'نشط جداً (تمرين شاق 6-7 أيام/أسبوع)',
      multiplier: 1.725
    },
    {
      value: 'extra',
      labelEn: 'Extra active (very hard exercise, physical job)',
      labelAr: 'نشط للغاية (تمرين شاق جداً، عمل بدني)',
      multiplier: 1.9
    }
  ];

  const goals = [
    {
      value: 'lose2',
      labelEn: 'Lose weight fast (2 lbs/week)',
      labelAr: 'فقدان وزن سريع (1 كغ/أسبوع)',
      modifier: -1000
    },
    {
      value: 'lose1',
      labelEn: 'Lose weight (1 lb/week)',
      labelAr: 'فقدان وزن (0.5 كغ/أسبوع)',
      modifier: -500
    },
    {
      value: 'maintain',
      labelEn: 'Maintain weight',
      labelAr: 'الحفاظ على الوزن',
      modifier: 0
    },
    {
      value: 'gain1',
      labelEn: 'Gain weight (1 lb/week)',
      labelAr: 'زيادة وزن (0.5 كغ/أسبوع)',
      modifier: 500
    },
    {
      value: 'gain2',
      labelEn: 'Gain weight fast (2 lbs/week)',
      labelAr: 'زيادة وزن سريع (1 كغ/أسبوع)',
      modifier: 1000
    }
  ];

  const calculateCalories = useCallback(async () => {
    setError('');
    
    if (!age || !gender || !height || !weight || !activity) {
      setError(language === 'en' 
        ? 'Please fill in all required fields' 
        : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (ageNum <= 0 || ageNum > 120) {
      setError(language === 'en' 
        ? 'Please enter a valid age (1-120 years)' 
        : 'يرجى إدخال عمر صحيح (1-120 سنة)');
      return;
    }

    if (heightNum <= 0 || heightNum > 300) {
      setError(language === 'en' 
        ? 'Please enter a valid height (1-300 cm)' 
        : 'يرجى إدخال طول صحيح (1-300 سم)');
      return;
    }

    if (weightNum <= 0 || weightNum > 500) {
      setError(language === 'en' 
        ? 'Please enter a valid weight (1-500 kg)' 
        : 'يرجى إدخال وزن صحيح (1-500 كغ)');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmrValue: number;
      if (gender === 'male') {
        bmrValue = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
      } else {
        bmrValue = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
      }

      // Calculate TDEE (Total Daily Energy Expenditure)
      const activityLevel = activityLevels.find(level => level.value === activity);
      const tdee = bmrValue * (activityLevel?.multiplier || 1.2);

      // Apply goal modifier
      const goalData = goals.find(g => g.value === goal);
      const targetCalories = tdee + (goalData?.modifier || 0);

      // Calculate macronutrients (balanced diet)
      const protein = Math.round((targetCalories * 0.25) / 4); // 25% protein, 4 cal/g
      const carbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs, 4 cal/g
      const fats = Math.round((targetCalories * 0.30) / 9); // 30% fats, 9 cal/g

      setBMR(Math.round(bmrValue));
      setCalories(Math.round(targetCalories));
      setMacros({
        protein,
        carbs,
        fats,
        proteinCal: protein * 4,
        carbsCal: carbs * 4,
        fatsCal: fats * 9
      });

    } catch (err) {
      setError(language === 'en' 
        ? 'Calculation error. Please try again.' 
        : 'خطأ في الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsCalculating(false);
    }
  }, [age, gender, height, weight, activity, goal, language]);

  const resetCalculator = useCallback(() => {
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setActivity('');
    setGoal('maintain');
    setCalories(null);
    setBMR(null);
    setMacros(null);
    setError('');
  }, []);

  const getGoalColor = (goalValue: string) => {
    if (goalValue.includes('lose')) return 'text-blue-600';
    if (goalValue === 'maintain') return 'text-green-600';
    if (goalValue.includes('gain')) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getGoalBgColor = (goalValue: string) => {
    if (goalValue.includes('lose')) return 'bg-blue-50 border-blue-200';
    if (goalValue === 'maintain') return 'bg-green-50 border-green-200';
    if (goalValue.includes('gain')) return 'bg-orange-50 border-orange-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Utensils className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Calorie Calculator' : 'حاسبة السعرات الحرارية'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Daily Energy & Nutrition Planning' 
                : 'تخطيط الطاقة والتغذية اليومية'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-sm text-green-600 hover:text-green-800 font-medium"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Age (years)' : 'العمر (سنة)'}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={language === 'en' ? 'Enter your age' : 'أدخل عمرك'}
              min="1"
              max="120"
              aria-label={language === 'en' ? 'Age in years' : 'العمر بالسنوات'}
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Gender' : 'الجنس'}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-label={language === 'en' ? 'Select gender' : 'اختر الجنس'}
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

          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Height (cm)' : 'الطول (سم)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={language === 'en' ? 'Enter your height' : 'أدخل طولك'}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={language === 'en' ? 'Enter your weight' : 'أدخل وزنك'}
              min="1"
              max="500"
              step="0.1"
              aria-label={language === 'en' ? 'Weight in kilograms' : 'الوزن بالكيلوغرام'}
            />
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Activity Level' : 'مستوى النشاط'}
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label={language === 'en' ? 'Select activity level' : 'اختر مستوى النشاط'}
          >
            <option value="">
              {language === 'en' ? 'Select activity level' : 'اختر مستوى النشاط'}
            </option>
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {language === 'en' ? level.labelEn : level.labelAr}
              </option>
            ))}
          </select>
        </div>

        {/* Goal Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Goal' : 'الهدف'}
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label={language === 'en' ? 'Select goal' : 'اختر الهدف'}
          >
            {goals.map((goalOption) => (
              <option key={goalOption.value} value={goalOption.value}>
                {language === 'en' ? goalOption.labelEn : goalOption.labelAr}
              </option>
            ))}
          </select>
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
            onClick={calculateCalories}
            disabled={isCalculating || !age || !gender || !height || !weight || !activity}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            aria-label={language === 'en' ? 'Calculate calories' : 'حساب السعرات الحرارية'}
          >
            {isCalculating ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                {language === 'en' ? 'Calculating...' : 'جاري الحساب...'}
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Calculate Calories' : 'احسب السعرات الحرارية'}
              </>
            )}
          </button>
          
          {(calories !== null || error) && (
            <button
              onClick={resetCalculator}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label={language === 'en' ? 'Reset calculator' : 'إعادة تعيين الحاسبة'}
            >
              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
            </button>
          )}
        </div>

        {/* Results */}
        {calories !== null && bmr !== null && macros && (
          <div className={`p-4 rounded-lg border-2 ${getGoalBgColor(goal)} transition-all duration-500`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-green-600" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Your Nutrition Plan' : 'خطة التغذية الخاصة بك'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Based on Mifflin-St Jeor equation' : 'وفقاً لمعادلة ميفلين-سانت جور'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Calorie Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white bg-opacity-50 rounded-md">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {bmr}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'BMR (calories)' : 'معدل الأيض الأساسي'}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'en' ? 'Resting metabolism' : 'الأيض أثناء الراحة'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-white bg-opacity-50 rounded-md">
                <div className={`text-3xl font-bold ${getGoalColor(goal)} mb-1`}>
                  {calories}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Daily Calories' : 'السعرات اليومية'}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'en' ? 'Target intake' : 'الهدف اليومي'}
                </div>
              </div>

              <div className="text-center p-3 bg-white bg-opacity-50 rounded-md">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {goals.find(g => g.value === goal)?.modifier || 0 > 0 ? '+' : ''}
                  {goals.find(g => g.value === goal)?.modifier || 0}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Goal Adjustment' : 'تعديل الهدف'}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'en' ? 'Daily surplus/deficit' : 'الفائض/العجز اليومي'}
                </div>
              </div>
            </div>

            {/* Macronutrients Breakdown */}
            <div className="p-3 bg-white bg-opacity-50 rounded-md mb-4">
              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Macronutrients Breakdown' : 'توزيع المغذيات الكبرى'}
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-md">
                  <div className="text-xl font-bold text-blue-600 mb-1">
                    {macros.protein}g
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {language === 'en' ? 'Protein' : 'البروتين'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {macros.proteinCal} cal (25%)
                  </div>
                </div>

                <div className="text-center p-3 bg-yellow-50 rounded-md">
                  <div className="text-xl font-bold text-yellow-600 mb-1">
                    {macros.carbs}g
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {language === 'en' ? 'Carbohydrates' : 'الكربوهيدرات'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {macros.carbsCal} cal (45%)
                  </div>
                </div>

                <div className="text-center p-3 bg-purple-50 rounded-md">
                  <div className="text-xl font-bold text-purple-600 mb-1">
                    {macros.fats}g
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {language === 'en' ? 'Fats' : 'الدهون'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {macros.fatsCal} cal (30%)
                  </div>
                </div>
              </div>
            </div>

            {/* Nutritional Guidelines */}
            <div className="p-3 bg-white bg-opacity-50 rounded-md">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    {language === 'en' ? 'Nutritional Guidelines' : 'إرشادات التغذية'}
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {language === 'en' ? 'Eat protein with every meal for muscle maintenance' : 'تناول البروتين مع كل وجبة للحفاظ على العضلات'}</li>
                    <li>• {language === 'en' ? 'Choose complex carbohydrates for sustained energy' : 'اختر الكربوهيدرات المعقدة للطاقة المستدامة'}</li>
                    <li>• {language === 'en' ? 'Include healthy fats like olive oil and nuts' : 'أدرج الدهون الصحية مثل زيت الزيتون والمكسرات'}</li>
                    <li>• {language === 'en' ? 'Stay hydrated with 8-10 glasses of water daily' : 'حافظ على الترطيب بـ 8-10 أكواب ماء يومياً'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Libya-Specific Food Recommendations */}
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-md">
              <h5 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Libya-Friendly Food Options' : 'خيارات طعام صديقة لليبيا'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                <div>
                  <strong className="text-blue-600">{language === 'en' ? 'Protein:' : 'البروتين:'}</strong>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li>• {language === 'en' ? 'Fish (Mediterranean)' : 'السمك (البحر المتوسط)'}</li>
                    <li>• {language === 'en' ? 'Chicken, lamb' : 'دجاج، لحم ضأن'}</li>
                    <li>• {language === 'en' ? 'Legumes, lentils' : 'البقوليات، العدس'}</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-yellow-600">{language === 'en' ? 'Carbs:' : 'الكربوهيدرات:'}</strong>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li>• {language === 'en' ? 'Couscous, bulgur' : 'الكسكس، البرغل'}</li>
                    <li>• {language === 'en' ? 'Dates, figs' : 'التمر، التين'}</li>
                    <li>• {language === 'en' ? 'Whole grain bread' : 'خبز الحبوب الكاملة'}</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-purple-600">{language === 'en' ? 'Fats:' : 'الدهون:'}</strong>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li>• {language === 'en' ? 'Olive oil' : 'زيت الزيتون'}</li>
                    <li>• {language === 'en' ? 'Almonds, walnuts' : 'اللوز، الجوز'}</li>
                    <li>• {language === 'en' ? 'Avocado' : 'الأفوكادو'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500">
            {language === 'en' 
              ? '* This calculator provides general nutritional guidance only. For personalized diet plans and medical nutrition therapy, please consult with registered dietitians and healthcare professionals at Shefa Hospital Libya.'
              : '* توفر هذه الحاسبة إرشادات تغذوية عامة فقط. للحصول على خطط غذائية شخصية وعلاج التغذية الطبية، يرجى استشارة أخصائيي التغذية المسجلين والمتخصصين في الرعاية الصحية في مستشفى شفاء ليبيا.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
