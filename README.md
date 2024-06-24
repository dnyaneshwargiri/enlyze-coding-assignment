Node Js 21.0.0
Yarn 1.22.21

KPI-SVC ==>

kpi-svc/
├── src/
│ ├── controllers/
│ │ └── kpiController.ts
│ ├── routes/
│ │ └── kpiRoutes.ts
│ ├── types/
│ │ └── KPI.ts
│ ├── kpis.json
│ └── server.ts
├── dist/
└── tsconfig.json

I'm using Yarn workspaces

enlyze-coding-assignment/
├── node_modules/
├── public/
├── src/
│ └── components/
│ └── KpiList.tsx
├── kpi-svc/
│ ├── node_modules/ <-- You want to avoid this
│ ├── src/
│ │ ├── controllers/
│ │ │ └── kpiController.ts
│ │ ├── routes/
│ │ │ └── kpiRoutes.ts
│ │ ├── types/
│ │ │ └── KPI.ts
│ │ ├── kpis.json
│ │ └── server.ts
│ ├── tsconfig.json
│ └── package.json <-- Separate package.json for kpi-svc
├── package.json <-- Root package.json
└── tsconfig.json <-- Root tsconfig.json
