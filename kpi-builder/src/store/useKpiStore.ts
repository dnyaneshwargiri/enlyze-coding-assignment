import { create } from "zustand";
import { KPI } from "libraries";
import axios from "axios";

interface KpiState {
  kpis: KPI[];
  fetchKpis: () => Promise<void>;
  addKpi: (kpi: KPI) => Promise<void>;
  updateKpi: (kpi: KPI) => Promise<void>;
  deleteKpi: (id: string) => Promise<void>;
}

export const useKpiStore = create<KpiState>((set) => ({
  kpis: [],
  fetchKpis: async () => {
    const response = await axios.get("http://localhost:9999/api/kpis");
    set({ kpis: response.data });
  },
  addKpi: async (kpi: KPI) => {
    const response = await axios.post("http://localhost:9999/api/kpis", kpi);
    set((state) => ({ kpis: [...state.kpis, response.data] }));
  },
  updateKpi: async (kpi: KPI) => {
    await axios.put(`http://localhost:9999/api/kpis/${kpi.id}`, kpi);
    set((state) => ({
      kpis: state.kpis.map((item) => (item.id === kpi.id ? kpi : item)),
    }));
  },
  deleteKpi: async (id: string) => {
    await axios.delete(`http://localhost:9999/api/kpis/${id}`);
    set((state) => ({
      kpis: state.kpis.filter((kpi) => kpi.id !== id),
    }));
  },
}));
