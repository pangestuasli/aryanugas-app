import React, { useEffect, useState } from 'react';

const DonutChart = ({
  data = [],
  size = 160,
  thickness = 14,
  showPercentage = true,
  centerText,
  centerSubtext,
  animate = true,
  animationDuration = 1000,
  onSegmentClick,
}) => {
  const [animatedData, setAnimatedData] = useState([]);
  
  useEffect(() => {
    if (animate) {
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += 5;
        if (currentValue >= 100) {
          clearInterval(interval);
          setAnimatedData(data);
        } else {
          setAnimatedData(data.map(item => ({
            ...item,
            value: (item.value / 100) * currentValue
          })));
        }
      }, animationDuration / 20);
    } else {
      setAnimatedData(data);
    }
  }, [data, animate, animationDuration]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = animate ? animatedData : data;
  
  let cumulativePercentage = 0;
  
  const segments = chartData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = cumulativePercentage * 3.6;
    const endAngle = (cumulativePercentage + percentage) * 3.6;
    cumulativePercentage += percentage;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });

  const getCoordinates = (angle, radius) => {
    const radian = (angle - 90) * Math.PI / 180;
    return {
      x: radius + radius * Math.cos(radian),
      y: radius + radius * Math.sin(radian),
    };
  };

  const radius = size / 2;
  const innerRadius = radius - thickness;
  
  const createArcPath = (startAngle, endAngle) => {
    if (endAngle - startAngle === 360) {
      return `M ${radius},0 A ${radius},${radius} 0 1,1 ${radius - 0.001},0 Z`;
    }
    
    const start = getCoordinates(startAngle, radius);
    const end = getCoordinates(endAngle, radius);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y} L ${end.x},${end.y}`;
  };
  
  const createHolePath = () => {
    return `M ${radius},${innerRadius} A ${innerRadius},${innerRadius} 0 1,1 ${radius - 0.001},${innerRadius} Z`;
  };

  const centerTextDisplay = centerText || `${Math.round(cumulativePercentage)}%`;
  const centerSubtextDisplay = centerSubtext || 'Total';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {segments.map((segment, index) => {
          const { startAngle, endAngle } = segment;
          const path = createArcPath(startAngle, endAngle);
          
          if (!path) return null;
          
          return (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="transition-all duration-300 cursor-pointer hover:opacity-80"
              onClick={() => onSegmentClick && onSegmentClick(segment, index)}
            />
          );
        })}
        
        {/* Inner circle untuk membuat effect donut */}
        <path
          d={createHolePath()}
          fill="white"
          stroke="none"
        />
      </svg>
      
      {/* Center text */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-slate-800">{centerTextDisplay}</p>
          {centerSubtextDisplay && (
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{centerSubtextDisplay}</p>
          )}
        </div>
      )}
    </div>
  );
};

// DonutChart dengan Legend
export const DonutChartWithLegend = ({
  data = [],
  title,
  subtitle,
  size = 180,
  thickness = 14,
  showPercentage = true,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
      <div>
        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex flex-col items-center mt-6">
        <DonutChart 
          data={data}
          size={size}
          thickness={thickness}
          showPercentage={showPercentage}
        />
        
        <div className="grid grid-cols-2 gap-4 mt-8 w-full">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs font-bold text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;