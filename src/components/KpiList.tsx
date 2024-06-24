import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useKpiStore } from "../store/useKpiStore";
import { KPI, Variable } from "../../library/index";
import KpiModal from "./KpiModal";
import "./KpiList.css"; // Importing the CSS file

const KpiList: React.FC = () => {
  const { kpis, addKpi, updateKpi, deleteKpi } = useKpiStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editKpi, setEditKpi] = useState<Partial<KPI> | null>(null);

  const handleAddKpi = () => {
    setEditKpi({ name: "", customer: "", variables: [] });
    setIsModalVisible(true);
  };

  const handleEditKpi = (kpi: KPI) => {
    setEditKpi(kpi);
    setIsModalVisible(true);
  };

  const handleDeleteKpi = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this KPI?",
      onOk: () => deleteKpi(id),
    });
  };

  const handleOk = (kpi: Partial<KPI>) => {
    if (kpi.id) {
      updateKpi(kpi as KPI);
    } else {
      addKpi(kpi as Omit<KPI, "id">);
    }
    setIsModalVisible(false);
    setEditKpi(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditKpi(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    {
      title: "Variables",
      dataIndex: "variables",
      key: "variables",
      render: (variables: Variable[]) =>
        variables.map((v) => `${v.displayName}: ${v.value}`).join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: null | undefined, record: KPI) => (
        <React.Fragment>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditKpi(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteKpi(record.id)}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <div className="kpi-list-container">
      <Button
        type="link"
        onClick={handleAddKpi}
        style={{ marginBottom: "16px" }}
      >
        Add New KPI
      </Button>
      <Table dataSource={kpis} columns={columns} rowKey="id" />
      <KpiModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        initialKpi={editKpi}
      />
    </div>
  );
};

export default KpiList;
