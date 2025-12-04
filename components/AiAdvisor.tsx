import React, { useState } from 'react';
import { generatePensionAdvice } from '../services/geminiService';
import { SimulationParams, PensionResult } from '../types';
import { Sparkles, Loader2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorProps {
  params: SimulationParams;
  result: PensionResult;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ params, result }) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const text = await generatePensionAdvice(params, result);
    setAdvice(text);
    setLoading(false);
    setHasFetched(true);
  };

  // Reset advice if key params change significantly? 
  // For simplicity, we keep old advice until user requests new one, 
  // but we show a button to refresh.

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-6 border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-900">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold">AI 决策顾问</h3>
          </div>
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
            {hasFetched ? '重新分析' : '生成分析报告'}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-400" />
                <p>正在分析您的社保数据...</p>
            </div>
        ) : !advice ? (
            <div className="text-center py-12 text-slate-400">
                <p>点击上方按钮，让 AI 帮您评估当前缴费方案的性价比和未来风险。</p>
            </div>
        ) : (
            <div className="prose prose-indigo prose-sm max-w-none text-slate-700">
                <ReactMarkdown>{advice}</ReactMarkdown>
            </div>
        )}
      </div>
    </div>
  );
};