import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { kpiRoutes } from "./routes/KpiRoutes";

const app = express();
const PORT = 9999;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/kpis", kpiRoutes);

app.listen(PORT, () => {
  console.log(`KPI service is running on http://localhost:${PORT}`);
});
