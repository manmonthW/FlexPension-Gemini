import { GoogleGenAI } from "@google/genai";
import { SimulationParams, PensionResult } from '../types';

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const generatePensionAdvice = async (
  params: SimulationParams,
  result: PensionResult
): Promise<string> => {
  const ai = getGenAI();
  
  const prompt = `
    我是一名中国的灵活就业人员，正在规划养老金。请根据以下计算数据，为我提供一段专业的分析和建议。
    
    **我的情况：**
    - 当前年龄：${params.currentAge}岁
    - 计划退休年龄：${params.retireAge}岁
    - 当前所在城市社平工资：${params.currentAvgSalary}元/月
    - 选择缴费档次：${(params.contributionLevel * 100).toFixed(0)}%
    - 累计缴费年限（含未来）：${params.yearsContributed + params.futureYearsToContribute}年
    - 预估工资年增长率：${(params.salaryGrowthRate * 100).toFixed(1)}%

    **计算结果预测（退休时）：**
    - 预估首月总养老金：${result.totalMonthly.toFixed(0)}元/月
    - 其中基础养老金：${result.monthlyBasicPension.toFixed(0)}元
    - 其中个人账户养老金：${result.monthlyPersonalPension.toFixed(0)}元
    - 回本周期：约${result.yearsToBreakeven.toFixed(1)}年
    - 养老金替代率（对比退休时社平）：${(result.replacementRate * 100).toFixed(1)}%
    - 个人累计本金投入：${(result.totalContributed / 10000).toFixed(2)}万元

    **请从以下角度分析（请保持客观，语气亲切专业，字数控制在400字以内）：**
    1. **性价比分析**：当前的${(params.contributionLevel * 100).toFixed(0)}%档次是否划算？回本周期是否合理？
    2. **生活水平预测**：这个养老金水平在考虑到通胀的${params.futureYearsToContribute}年后，大概能维持什么样的生活质量？
    3. **策略建议**：如果是灵活就业，考虑到经济压力和风险，你会建议我维持这个档次，还是降低/提高档次？应该"长缴多得"还是"多缴多得"？
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable detailed thinking for faster response
      }
    });
    return response.text || "无法获取分析结果，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI分析服务暂时不可用，请检查网络或API Key配置。";
  }
};

export const chatWithPensionBot = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  const ai = getGenAI();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: "你是一位专业的中国养老金规划师。你需要根据用户的问题，结合中国的社保政策（特别是灵活就业人员政策）提供建议。你的回答应当简洁、准确、有同理心。不要编造数据，如果不确定具体的最新地方政策，请建议用户咨询当地社保局12333。",
    },
  });

  try {
    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "抱歉，我没有理解您的问题。";
  } catch (error) {
    console.error("Chat Error:", error);
    return "聊天服务暂时中断，请稍后再试。";
  }
};