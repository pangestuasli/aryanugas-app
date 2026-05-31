import React, { useState, useEffect } from 'react';

const BarChart = ({
  data = [],
  barColor = "bg-emerald-500",
  barHoverColor = "hover:bg-emerald-600",
  showValues = false,
  showLabels = true,
  animate = true,
  animationDuration = 500,
  onBarClick,
}) => {
  const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));

  useEffect(() => {
    if (animate) {
      setAnimatedHeights(data.map(() => 0));
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = item.value;
            return newHeights;
          });
        }, index * 100);
      });
    } else {
      setAnimatedHeights(data.map(item => item.value));
    }
  }, [data, animate]);

  const maxValue = Math.max(...data.map(item => item.value), 1);

  const getBarHeight = (value) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="flex items-end justify-around gap-3">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          {/* Bar container */}
          <div className="w-full h-48 flex flex-col justify-end">
            {showValues && (
              <div className="text-center mb-1">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </span>
              </div>
            )}
            <div 
              className={`
                w-full 
                ${barColor} 
                ${barHoverColor} 
                rounded-t-lg
                transition-all 
                cursor-pointer 
                shadow-lg 
                shadow-emerald-100
                group
                relative
              `}
              style={{ 
                height: animate ? getBarHeight(animatedHeights[index]) : getBarHeight(item.value),
                transitionDuration: `${animationDuration}ms`
              }}
              onClick={() => onBarClick && onBarClick(item, index)}
            >
              {/* Tooltip on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-t-lg">
                <span className="text-white text-xs font-bold">{item.value}</span>
              </div>
            </div>
          </div>
          
          {/* Label di bawah bar */}
          {showLabels && (
            <span className="text-[10px] font-bold text-slate-400">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BarChart;