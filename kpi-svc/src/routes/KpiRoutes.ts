import express from "express";
import {
  getAllKpis,
  createKpi,
  updateKpi,
  deleteKpi,
} from "../controllers/KpiController";

export const kpiRoutes = express.Router();

kpiRoutes.get("/", getAllKpis);
kpiRoutes.post("/", createKpi);
kpiRoutes.put("/:id", updateKpi);
kpiRoutes.delete("/:id", deleteKpi);
