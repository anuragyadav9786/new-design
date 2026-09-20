// Illustrative-only "how much would I need to invest" estimate for the
// on-page assessment. Inverts the same effective-monthly-rate methodology
// used by calculateMonthlySIP in src/utils/calculator.ts (annuity-due SIP
// growth) instead of introducing a different formula for the same math.
export type RiskKey = "low" | "moderate" | "high";

export const RISK_PROFILES: Record<
  RiskKey,
  { label: string; assumedReturn: number; allocation: { equity: number; debt: number; gold: number } }
> = {
  low: { label: "Moderate/Lower", assumedReturn: 8, allocation: { equity: 30, debt: 60, gold: 10 } },
  moderate: { label: "Moderate", assumedReturn: 10, allocation: { equity: 55, debt: 35, gold: 10 } },
  high: { label: "Moderately High", assumedReturn: 12, allocation: { equity: 75, debt: 20, gold: 5 } },
};

export function estimateRequiredMonthlySip(targetValue: number, years: number, riskKey: RiskKey): number {
  const { assumedReturn } = RISK_PROFILES[riskKey];
  const annualRate = assumedReturn / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const totalMonths = Math.max(Math.round(years * 12), 1);

  const growthFactor =
    monthlyRate === 0 ? totalMonths : (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

  const requiredSip = targetValue / (growthFactor * (1 + monthlyRate));
  return Math.max(Math.round(requiredSip), 0);
}

export function formatInr(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 2)} L`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export const goalDefaults: Record<string, { targetAmount: number; years: number }> = {
  retirement: { targetAmount: 25000000, years: 25 },
  education: { targetAmount: 7500000, years: 15 },
  wealth: { targetAmount: 10000000, years: 10 },
  house: { targetAmount: 4000000, years: 5 },
  emergency: { targetAmount: 600000, years: 1 },
};
