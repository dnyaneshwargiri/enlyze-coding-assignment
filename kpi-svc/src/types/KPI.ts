export interface KPI {
  id: string;
  name: string;
  customer: string;
  conditioning?: number;
  aggregation?: Aggregation;
  variables?: Variable[];
}

interface Aggregation {
  median: number;
  average: number;
  integration: number;
  sum: number;
}

interface Variable {
  id: string;
  displayName: string;
  value: number;
}
