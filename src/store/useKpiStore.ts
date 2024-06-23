import { create } from "zustand";
import { KPI } from "../types/KPI";

interface KpiState {
  kpis: KPI[];
  addKpi: (kpi: KPI) => void;
  updateKpi: (updatedKpi: KPI) => void;
  deleteKpi: (id: number) => void;
}

export const useKpiStore = create<KpiState>((set) => ({
  kpis: [],
  addKpi: (kpi) => set((state) => ({ kpis: [...state.kpis, kpi] })),
  updateKpi: (updatedKpi) =>
    set((state) => ({
      kpis: state.kpis.map((kpi) =>
        kpi.id === updatedKpi.id ? updatedKpi : kpi
      ),
    })),
  deleteKpi: (id) =>
    set((state) => ({
      kpis: state.kpis.filter((kpi) => kpi.id !== id),
    })),
}));
