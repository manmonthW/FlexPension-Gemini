import React, { useState, useEffect } from 'react';
import { SimulationParams, PensionResult } from './types';
import { DEFAULT_PARAMS } from './constants';
import { calculatePension } from './utils/calculations';
import { InputSection } from './components/InputSection';
import { ResultCards } from './components/ResultCards';
import { PensionChart } from './components/PensionChart';
import { AiAdvisor } from './components/AiAdvisor';
import { Calculator } from 'lucide-react';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [result, setResult] = useState<PensionResult | null>(null);

  // Initial calculation on load
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    const res = calculatePension(params);
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Calculator className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                    FlexiPension AI
                </h1>
            </div>
            <div className="text-sm text-slate-500 hidden sm:block">
                灵活就业养老金智能计算器
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 xl:col-span-3">
            <InputSection 
              params={params} 
              setParams={setParams} 
              onCalculate={handleCalculate} 
            />
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-800">
                <strong>免责声明：</strong>
                <p className="mt-1 opacity-80 leading-relaxed">
                    本工具基于一般社保算法估算，不代表官方数据。实际养老金受退休地社平工资、政策调整、个人账户记账利率等多种因素影响。AI建议仅供参考。
                </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {result && (
              <>
                <ResultCards result={result} />
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <PensionChart data={result.projections} />
                    <AiAdvisor params={params} result={result} />
                </div>
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;