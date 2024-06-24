import { create } from "zustand";
import { KPI } from "../../../libraries";
import axios from "axios";

interface KpiState {
  kpis: KPI[];
  fetchKpis: () => Promise<void>;
  addKpi: (kpi: KPI) => Promise<void>;
  updateKpi: (kpi: KPI) => Promise<void>;
  deleteKpi: (id: string) => Promise<void>;
}

const SERVICE_URL = import.meta.env.VITE_KPI_SERVICE_URL as string;

export const useKpiStore = create<KpiState>((set) => ({
  kpis: [],
  fetchKpis: async () => {
    const response = await axios.get(SERVICE_URL);
    set({ kpis: response.data });
  },
  addKpi: async (kpi: KPI) => {
    const response = await axios.post(SERVICE_URL, kpi);
    set((state) => ({ kpis: [...state.kpis, response.data] }));
  },
  updateKpi: async (kpi: KPI) => {
    await axios.put(`${SERVICE_URL}/${kpi.id}`, kpi);
    set((state) => ({
      kpis: state.kpis.map((item) => (item.id === kpi.id ? kpi : item)),
    }));
  },
  deleteKpi: async (id: string) => {
    await axios.delete(`${SERVICE_URL}/${id}`);
    set((state) => ({
      kpis: state.kpis.filter((kpi) => kpi.id !== id),
    }));
  },
}));
