import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { YearlyProjection } from '../types';

interface PensionChartProps {
  data: YearlyProjection[];
}

export const PensionChart: React.FC<PensionChartProps> = ({ data }) => {
  const chartData = data.filter((d, i) => i % 2 === 0 || i === data.length - 1); // Sample to avoid overcrowding

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">个人账户资金积累趋势</h3>
        <div className="text-sm text-slate-500">仅展示个人账户部分，不含统筹池</div>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="age" 
            label={{ value: '年龄', position: 'insideBottomRight', offset: -5 }} 
            tick={{fontSize: 12, fill: '#94a3b8'}}
          />
          <YAxis 
            tickFormatter={(value) => `${(value / 10000).toFixed(0)}w`} 
            tick={{fontSize: 12, fill: '#94a3b8'}}
          />
          <Tooltip 
            formatter={(value: number) => [`¥${value.toFixed(0)}`, '累计金额']}
            labelFormatter={(label) => `${label}岁`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="totalPersonalAccount" 
            stroke="#4f46e5" 
            fillOpacity={1} 
            fill="url(#colorPv)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};