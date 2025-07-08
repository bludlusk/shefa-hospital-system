import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number | null;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  subtitle?: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend = null, 
  color = "blue",
  subtitle,
  onClick 
}) => {
  const getColorClasses = () => {
    const colors = {
      blue: { text: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
      green: { text: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
      purple: { text: "text-purple-600", bg: "bg-purple-50", hover: "hover:bg-purple-100" },
      orange: { text: "text-orange-600", bg: "bg-orange-50", hover: "hover:bg-orange-100" },
      red: { text: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
      yellow: { text: "text-yellow-600", bg: "bg-yellow-50", hover: "hover:bg-yellow-100" }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses();

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses.text} mb-1`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend !== null && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium flex items-center ${
                trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trend > 0 ? (
                  <span className="mr-1">↗</span>
                ) : trend < 0 ? (
                  <span className="mr-1">↘</span>
                ) : (
                  <span className="mr-1">→</span>
                )}
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses.bg} ${colorClasses.hover} transition-colors duration-200`}>
          <div className={`${colorClasses.text}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;