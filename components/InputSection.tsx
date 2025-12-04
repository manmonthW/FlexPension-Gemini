import React from 'react';
import { SimulationParams } from '../types';
import { DollarSign, TrendingUp, MapPin } from 'lucide-react';

interface InputSectionProps {
  params: SimulationParams;
  setParams: (p: SimulationParams) => void;
  onCalculate: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ params, setParams, onCalculate }) => {
  
  const handleChange = (field: keyof SimulationParams, value: number) => {
    setParams({ ...params, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-6 text-indigo-900">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <DollarSign className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold">参保参数设置</h2>
      </div>

      <div className="space-y-6">
        {/* City/Salary */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-slate-400" />
            当前社平工资 (元/月)
          </label>
          <input
            type="number"
            value={params.currentAvgSalary}
            onChange={(e) => handleChange('currentAvgSalary', Number(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1">输入当地上一年度社会平均工资</p>
        </div>

        {/* Ages */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">当前年龄</label>
            <input
              type="number"
              value={params.currentAge}
              onChange={(e) => handleChange('currentAge', Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">退休年龄</label>
            <select
              value={params.retireAge}
              onChange={(e) => handleChange('retireAge', Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value={50}>50岁 (女工人)</option>
              <option value={55}>55岁 (女干部/灵活)</option>
              <option value={60}>60岁 (男)</option>
            </select>
          </div>
        </div>

        {/* Contribution Level */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3 flex justify-between">
            <span>缴费档次 (60% - 300%)</span>
            <span className="text-indigo-600 font-bold">{(params.contributionLevel * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min="0.6"
            max="3.0"
            step="0.1"
            value={params.contributionLevel}
            onChange={(e) => handleChange('contributionLevel', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>低档 (60%)</span>
            <span>中档 (100%)</span>
            <span>高档 (300%)</span>
          </div>
        </div>

        {/* Years */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">已缴年限</label>
            <input
              type="number"
              value={params.yearsContributed}
              onChange={(e) => handleChange('yearsContributed', Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">未来拟缴年限</label>
            <input
              type="number"
              value={params.futureYearsToContribute}
              onChange={(e) => handleChange('futureYearsToContribute', Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
         {/* Advanced (Collapsible logic could be added, keeping simple for now) */}
         <div>
             <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                预估工资平均涨幅
             </label>
             <div className="flex items-center gap-2">
                 <input
                  type="number"
                  step="0.01"
                  value={(params.salaryGrowthRate * 100).toFixed(1)}
                  onChange={(e) => handleChange('salaryGrowthRate', Number(e.target.value) / 100)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                 />
                 <span className="text-slate-500">%</span>
             </div>
        </div>

        <button
          onClick={onCalculate}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
        >
          开始计算 / 更新图表
        </button>
      </div>
    </div>
  );
};