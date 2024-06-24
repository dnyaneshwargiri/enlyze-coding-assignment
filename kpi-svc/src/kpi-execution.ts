import { KPI, Aggregation } from "./../../libraries/";

export function computeAggregations(kpi: KPI): Aggregation {
  return {
    median: calculateMedian(kpi),
    average: calculateAverage(kpi),
    integration: calculateIntegration(kpi),
    sum: calculateSum(kpi),
  };
}

function calculateMedian(kpi: KPI): number {
  // Implement your logic here
  return 0;
}

function calculateAverage(kpi: KPI): number {
  // Implement your logic here
  return 0;
}

function calculateIntegration(kpi: KPI): number {
  // Implement your logic here
  return 0;
}

function calculateSum(kpi: KPI): number {
  // Implement your logic here
  return 0;
}

export function computeConditioning(kpi: KPI): number {
  // Implement your logic here
  return 0;
}
