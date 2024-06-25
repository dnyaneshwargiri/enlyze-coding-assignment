import { KPI, Aggregation, Variable } from "kpi-library";

// Implement your logic here
export function computeAggregations(kpi: KPI): Aggregation {
  return {
    median: calculateMedian(kpi),
    average: calculateAverage(kpi),
    integration: calculateIntegration(kpi),
    sum: calculateSum(kpi),
  };
}

function calculateMedian(kpi: KPI): number {
  const values = kpi.variables;
  if (values) {
    if (values.length === 0) return 0;
    values.sort((a: Variable, b: Variable) => a.value - b.value);
    const mid = Math.floor(values.length / 2);

    const median =
      values.length % 2 !== 0
        ? values[mid].value
        : (values[mid - 1].value + values[mid].value) / 2;
    return parseFloat(median.toFixed(2));
  }
  return 0;
}

function calculateAverage(kpi: KPI): number {
  const average = calculateSum(kpi) / (kpi.variables?.length || 1);
  return parseFloat(average.toFixed(2));
}

function calculateIntegration(kpi: KPI): number {
  // TODO
  kpi;
  return 0;
}

function calculateSum(kpi: KPI): number {
  const sum =
    kpi.variables?.reduce((acc, variable) => acc + variable.value, 0) || 0;
  return parseFloat(sum.toFixed(2));
}

export function computeConditioning(kpi: KPI): number {
  // TODO
  kpi;
  return 0;
}
