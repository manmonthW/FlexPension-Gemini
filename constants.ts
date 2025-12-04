// Official divisors for personal account monthly distribution
// 50岁: 195, 55岁: 170, 60岁: 139
export const PENSION_DIVISORS: Record<number, number> = {
  50: 195,
  55: 170,
  60: 139,
  65: 101, // Extended assumption
};

// Flexible employment usually pays ~20% of base, 
// of which 8% goes to personal account, 12% to social pool.
export const FLEX_TOTAL_RATE = 0.20;
export const FLEX_PERSONAL_RATE = 0.08;

// Default interest rate for personal account accumulation (conservative est)
export const PERSONAL_ACCOUNT_INTEREST_RATE = 0.025; 

export const DEFAULT_PARAMS = {
  currentAge: 30,
  retireAge: 60,
  currentAvgSalary: 8000,
  contributionLevel: 1.0, // 100%
  yearsContributed: 0,
  futureYearsToContribute: 30,
  salaryGrowthRate: 0.03, // 3% inflation/growth
  personalAccountBalance: 0,
};