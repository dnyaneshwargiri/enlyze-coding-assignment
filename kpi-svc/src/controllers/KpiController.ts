import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { KPI } from "../../../libraries/dist";
import { computeAggregations, computeConditioning } from "../KpiExecution";

dotenv.config();

const kpisPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, process.env.KPI_FILE_PATH_PRODUCTION || "")
    : path.resolve(__dirname, process.env.KPI_FILE_PATH_DEV || "");

export const getAllKpis = async (req: Request, res: Response) => {
  try {
    const kpis: KPI[] = JSON.parse(fs.readFileSync(kpisPath, "utf-8"));
    const kpisWithCalculations = kpis.map((kpi) => ({
      ...kpi,
      aggregation: computeAggregations(kpi),
      conditioning: computeConditioning(kpi),
    }));
    res.status(200).json(kpisWithCalculations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving KPIs" });
  }
};

export const createKpi = async (req: Request, res: Response) => {
  try {
    const newKpi: Omit<KPI, "conditioning" | "aggregation"> = req.body;
    const kpis: KPI[] = JSON.parse(fs.readFileSync(kpisPath, "utf-8"));
    kpis.push(newKpi);
    fs.writeFileSync(kpisPath, JSON.stringify(kpis, null, 2));
    res.status(201).json(newKpi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating KPI" });
  }
};

export const updateKpi = async (req: Request, res: Response) => {
  try {
    const updatedKpi: Omit<KPI, "conditioning" | "aggregation"> = req.body;
    const kpis: KPI[] = JSON.parse(fs.readFileSync(kpisPath, "utf-8"));
    const index = kpis.findIndex((kpi) => kpi.id === updatedKpi.id);
    if (index === -1) {
      throw new Error("KPI not found");
    }
    kpis[index] = updatedKpi;
    fs.writeFileSync(kpisPath, JSON.stringify(kpis, null, 2));
    res.status(200).json(updatedKpi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating KPI" });
  }
};

export const deleteKpi = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    let kpis: KPI[] = JSON.parse(fs.readFileSync(kpisPath, "utf-8"));
    const kpiExists = kpis.some((kpi) => kpi.id === id);
    if (!kpiExists) {
      res.status(404).json({ message: `KPI with Id ${id} doesnt exist` });
    }
    kpis = kpis.filter((kpi) => kpi.id !== id);
    fs.writeFileSync(kpisPath, JSON.stringify(kpis, null, 2));
    res.status(200).json({ message: "KPI deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting KPI" });
  }
};
