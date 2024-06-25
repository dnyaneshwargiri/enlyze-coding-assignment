import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { computeAggregations, computeConditioning } from "../KpiExecution";
import { KPI } from "../../../libraries/dist";

const kpisPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "kpis.json")
    : path.resolve(__dirname, "../../kpis.json");

export const getAllKpis = (req: Request, res: Response) => {
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

export const createKpi = (req: Request, res: Response) => {
  try {
    const newKpi: KPI = req.body;
    const kpis: KPI[] = JSON.parse(fs.readFileSync(kpisPath, "utf-8"));
    kpis.push(newKpi);
    fs.writeFileSync(kpisPath, JSON.stringify(kpis, null, 2));
    res.status(201).json(newKpi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating KPI" });
  }
};

export const updateKpi = (req: Request, res: Response) => {
  try {
    const updatedKpi: KPI = req.body;
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

export const deleteKpi = (req: Request, res: Response) => {
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
