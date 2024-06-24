import "./App.css";
import KpiList from "./components/KpiList";
import enlyzeLogo from "./assets/enlyze.svg";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <img src={enlyzeLogo} alt="Enlyze Logo" height={60} width={180} />
      </div>

      <h1>KPI Builder 🏄‍♂️</h1>
      <KpiList />
    </div>
  );
};

export default App;
