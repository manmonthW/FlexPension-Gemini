import { SimulationParams, PensionResult, YearlyProjection } from '../types';
import { PENSION_DIVISORS, FLEX_TOTAL_RATE, FLEX_PERSONAL_RATE, PERSONAL_ACCOUNT_INTEREST_RATE } from '../constants';

export const calculatePension = (params: SimulationParams): PensionResult => {
  const {
    currentAge,
    retireAge,
    currentAvgSalary,
    contributionLevel,
    yearsContributed, // Past years
    futureYearsToContribute, // Future years
    salaryGrowthRate,
    personalAccountBalance,
  } = params;

  let currentPersonalAccount = personalAccountBalance;
  let simulatedAvgSalary = currentAvgSalary;
  let totalDirectContribution = 0;
  
  const projections: YearlyProjection[] = [];
  const yearsToSimulate = Math.max(0, retireAge - currentAge);
  
  // We only simulate the *future* accumulation. 
  // For simplicity, we assume 'yearsContributed' (past) contributed to the 'personalAccountBalance'
  // and contributes to the 'total years' multiplier (N).
  // The 'contributionLevel' is applied to future years.
  
  // 1. Simulate Future Accumulation
  for (let i = 0; i < yearsToSimulate; i++) {
    const year = new Date().getFullYear() + i;
    const age = currentAge + i;

    // Apply wage growth
    if (i > 0) {
      simulatedAvgSalary = simulatedAvgSalary * (1 + salaryGrowthRate);
    }

    let annualContributionTotal = 0;
    let personalPart = 0;

    // Only contribute if we are within the "futureYearsToContribute" window
    if (i < futureYearsToContribute) {
       const base = simulatedAvgSalary * contributionLevel;
       const monthlyTotal = base * FLEX_TOTAL_RATE;
       const monthlyPersonal = base * FLEX_PERSONAL_RATE;
       
       annualContributionTotal = monthlyTotal * 12;
       personalPart = monthlyPersonal * 12;
       totalDirectContribution += annualContributionTotal;
    }

    // Add Interest
    const interest = currentPersonalAccount * PERSONAL_ACCOUNT_INTEREST_RATE;
    currentPersonalAccount += interest + personalPart;

    projections.push({
      year,
      age,
      socialAvgSalary: simulatedAvgSalary,
      annualContribution: annualContributionTotal,
      personalAccountInterest: interest,
      totalPersonalAccount: currentPersonalAccount
    });
  }

  // 2. Calculate Pension at Retirement
  // A. Basic Pension (基础养老金)
  // Formula: (Final SAS + Final SAS * Index) / 2 * Total Years * 1%
  // Note: This is a simplified estimation. Strictly, Index is the average index over career.
  // We assume the user maintains the current contributionLevel for the 'futureYears' and average index approximates it.
  const totalYears = yearsContributed + Math.min(yearsToSimulate, futureYearsToContribute);
  const averageIndex = contributionLevel; // Simplified assumption for estimation
  const finalAvgSalary = simulatedAvgSalary;

  const basicPension = (finalAvgSalary * (1 + averageIndex) / 2) * totalYears * 0.01;

  // B. Personal Account Pension (个人账户养老金)
  // Formula: Total Balance / Divisor
  // Find closest divisor
  const divisor = PENSION_DIVISORS[retireAge] || (retireAge > 60 ? 139 : 195);
  const personalPension = currentPersonalAccount / divisor;

  const totalMonthly = basicPension + personalPension;
  const replacementRate = totalMonthly / finalAvgSalary;

  // 3. Breakeven Analysis (Simple: Total Contributed / Monthly Pension / 12)
  const yearsToBreakeven = totalMonthly > 0 ? totalDirectContribution / (totalMonthly * 12) : 0;

  return {
    monthlyBasicPension: basicPension,
    monthlyPersonalPension: personalPension,
    totalMonthly,
    replacementRate,
    totalContributed: totalDirectContribution,
    yearsToBreakeven,
    projections
  };
};