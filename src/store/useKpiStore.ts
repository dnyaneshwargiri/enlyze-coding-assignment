import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { KPI } from "../../library";
type KpiState = {
  kpis: KPI[];
  addKpi: (kpi: Omit<KPI, "id">) => void;
  updateKpi: (kpi: KPI) => void;
  deleteKpi: (id: string) => void;
};

export const useKpiStore = create<KpiState>((set) => ({
  kpis: [],
  addKpi: (newKpi) =>
    set((state) => ({
      kpis: [...state.kpis, { ...newKpi, id: uuidv4() }],
    })),
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
