export interface SimulationParams {
  currentAge: number;
  retireAge: number;
  currentAvgSalary: number; // local social average salary (SAS)
  contributionLevel: number; // 0.6 to 3.0 (60% to 300%)
  yearsContributed: number; // already contributed
  futureYearsToContribute: number; // how many more years planning to pay
  salaryGrowthRate: number; // expected annual growth of SAS
  personalAccountBalance: number; // existing balance
}

export interface YearlyProjection {
  year: number;
  age: number;
  socialAvgSalary: number;
  annualContribution: number; // Total paid that year
  personalAccountInterest: number;
  totalPersonalAccount: number;
}

export interface PensionResult {
  monthlyBasicPension: number; // 基础养老金
  monthlyPersonalPension: number; // 个人账户养老金
  totalMonthly: number;
  replacementRate: number; // vs final avg salary
  totalContributed: number; // Principal only
  yearsToBreakeven: number;
  projections: YearlyProjection[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}