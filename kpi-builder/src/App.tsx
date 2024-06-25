import React from "react";
import KpiList from "./components/KpiList";
import "./App.css";
import enlyzeLogo from "./assets/enlyze.svg";

const App: React.FC = () => {
  return (
    <div>
      <div className="enlyze-logo">
        <img src={enlyzeLogo} alt="Enlyze Logo" height={60} width={180} />
      </div>

      <h1>KPI Builder 🏄‍♂️</h1>
      <KpiList />
    </div>
  );
};

export default App;
