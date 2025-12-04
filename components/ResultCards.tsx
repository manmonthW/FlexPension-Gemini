import React from 'react';
import { PensionResult } from '../types';

interface ResultCardsProps {
  result: PensionResult;
}

export const ResultCards: React.FC<ResultCardsProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Main Stat: Monthly Pension */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
        <h3 className="text-indigo-100 text-sm font-medium mb-1">预估退休首月领钱</h3>
        <div className="text-3xl font-bold mb-2">¥ {result.totalMonthly.toFixed(0)}</div>
        <div className="flex justify-between text-xs text-indigo-100 opacity-90">
          <span>基础: ¥{result.monthlyBasicPension.toFixed(0)}</span>
          <span>个人: ¥{result.monthlyPersonalPension.toFixed(0)}</span>
        </div>
      </div>

      {/* Stat 2: Replacement Rate */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-slate-500 text-sm font-medium mb-1">终级替代率</h3>
        <div className="text-3xl font-bold text-slate-800 mb-2">
          {(result.replacementRate * 100).toFixed(1)}%
        </div>
        <p className="text-xs text-slate-400">
          相当于退休时社会平均工资的比例。国际警戒线一般为55%-70%。
        </p>
      </div>

      {/* Stat 3: Breakeven */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-slate-500 text-sm font-medium mb-1">预计回本周期</h3>
        <div className="text-3xl font-bold text-slate-800 mb-2">
          {result.yearsToBreakeven.toFixed(1)} <span className="text-base font-normal text-slate-500">年</span>
        </div>
        <p className="text-xs text-slate-400">
          假设不考虑贴现，领回自己缴纳本金所需的时间。
        </p>
      </div>
    </div>
  );
};