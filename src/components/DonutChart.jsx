import React, { useEffect, useState } from 'react';

const DonutChart = ({
  data = [],
  size = 180,
  thickness = 16,
  showPercentage = true,
  centerText,
  centerSubtext,
  animate = true,
  animationDuration = 1000,
  gap = 4, // Jarak antar segmen dalam derajat
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
          setAnimatedData(
            data.map((item) => ({
              ...item,
              value: (item.value / 100) * currentValue,
            }))
          );
        }
      }, animationDuration / 20);
      return () => clearInterval(interval);
    } else {
      setAnimatedData(data);
    }
  }, [data, animate, animationDuration]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = animate ? animatedData : data;

  let cumulativePercentage = 0;

  // Kalkulasi koordinat polar ke kartesian untuk menggambar SVG Arc
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    // Menghindari error jika sudut awal dan akhir sama atau terbalik akibat gap
    if (endAngle - startAngle <= 0) return null;

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
  };

  const center = size / 2;
  // Radius kurva disesuaikan agar stroke tidak terpotong viewBox
  const strokeRadius = (size - thickness) / 2;

  // Nilai default teks tengah jika tidak dikirim via props (mengambil data terbesar/pertama)
  const defaultMainText = chartData.length > 0 ? `${Math.round((chartData[0].value / total) * 100)}%` : '0%';
  const defaultSubText = chartData.length > 0 ? chartData[0].label : '';

  const centerTextDisplay = centerText || defaultMainText;
  const centerSubtextDisplay = centerSubtext || defaultSubText;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = cumulativePercentage * 3.6;
          const endAngle = (cumulativePercentage + percentage) * 3.6;
          cumulativePercentage += percentage;

          // Terapkan gap (jarak) antar segmen
          const path = describeArc(
            center,
            center,
            strokeRadius,
            startAngle + gap,
            endAngle - gap
          );

          if (!path) return null;

          return (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={item.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="transition-all duration-300 cursor-pointer hover:opacity-80"
              onClick={() => onSegmentClick && onSegmentClick(item, index)}
            />
          );
        })}
      </svg>

      {/* Teks di Tengah Donut */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {centerTextDisplay}
          </p>
          {centerSubtextDisplay && (
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">
              {centerSubtextDisplay}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Komponen Wrapper: DonutChart dengan Legend
export const DonutChartWithLegend = ({
  data = [],
  title = "Jenis Hewan",
  subtitle = "Persentase Pasien Aktif",
  size = 200,
  thickness = 16,
  showPercentage = true,
  centerText,
  centerSubtext,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 max-w-sm font-sans">
      {/* Header Info */}
      <div className="mb-6">
        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="flex flex-col items-center">
        {/* Chart */}
        <DonutChart
          data={data}
          size={size}
          thickness={thickness}
          showPercentage={showPercentage}
          centerText={centerText}
          centerSubtext={centerSubtext}
        />

        {/* Legend (Flex Row / Horizontal) */}
        <div className="flex flex-row flex-wrap justify-center gap-6 mt-8 w-full">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-semibold text-slate-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;