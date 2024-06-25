export type KPI = {
  id: string;
  name: string;
  customer: string;
  conditioning?: number;
  aggregation?: Aggregation;
  variables?: Variable[];
};

export type Aggregation = {
  median: number;
  average: number;
  integration: number;
  sum: number;
};

export type Variable = {
  id: string;
  displayName: string;
  value: number;
};
