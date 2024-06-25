import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useKpiStore } from "../store/useKpiStore";
import { Aggregation, KPI, Variable } from "kpi-library";
import KpiModal from "./KpiModal";
import "./KpiList.css";

export const fetchKpisHelper = async (fetchKpis: () => Promise<void>) => {
  await fetchKpis();
};

export const handleAddKpiHelper = (
  setEditKpi: React.Dispatch<React.SetStateAction<KPI | null>>,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setEditKpi(null);
  setIsModalVisible(true);
};

export const handleEditKpiHelper = (
  kpi: KPI,
  setEditKpi: React.Dispatch<React.SetStateAction<KPI | null>>,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setEditKpi(kpi);
  setIsModalVisible(true);
};

export const handleDeleteKpiHelper = (
  id: string,
  deleteKpi: (id: string) => Promise<void>
) => {
  Modal.confirm({
    title: "Are you sure you want to delete this KPI?",
    onOk: () => deleteKpi(id),
  });
};

const KpiList: React.FC = () => {
  const { kpis, fetchKpis, addKpi, updateKpi, deleteKpi } = useKpiStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editKpi, setEditKpi] = useState<KPI | null>(null);

  useEffect(() => {
    fetchKpisHelper(fetchKpis);
  }, [fetchKpis]);

  const handleAddKpi = () => handleAddKpiHelper(setEditKpi, setIsModalVisible);
  const handleEditKpi = (kpi: KPI) =>
    handleEditKpiHelper(kpi, setEditKpi, setIsModalVisible);
  const handleDeleteKpi = (id: string) => handleDeleteKpiHelper(id, deleteKpi);

  const handleModalClose = async () => {
    await fetchKpis();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Variables",
      dataIndex: "variables",
      key: "variables",
      render: (variables: Array<Variable>) =>
        variables.map((variable) => (
          <div key={variable.id}>
            {variable.displayName}: {variable.value}
          </div>
        )),
    },
    {
      title: "Conditioning",
      dataIndex: "conditioning",
      key: "conditioning",
      render: (conditioning: number | undefined) => conditioning ?? "N/A",
    },
    {
      title: "Aggregation",
      dataIndex: "aggregation",
      key: "aggregation",
      render: (aggregation: Aggregation | undefined) =>
        aggregation ? (
          <div>
            Median: {aggregation.median}, Average: {aggregation.average},
            Integration: {aggregation.integration}, Sum: {aggregation.sum}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: null | undefined, record: KPI) => (
        <>
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
        </>
      ),
    },
  ];

  return (
    <div className="padding-20">
      <div className="add-new-button">
        <Button
          type="link"
          onClick={handleAddKpi}
          icon={<PlusOutlined />}
          className="margin-bottom-20"
        >
          Add New KPI
        </Button>
      </div>
      <Table columns={columns} dataSource={kpis} rowKey="id" />
      <KpiModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={async (kpi) => {
          if (editKpi) {
            await updateKpi(kpi);
          } else {
            await addKpi(kpi);
          }
          setIsModalVisible(false);
          handleModalClose();
        }}
        editKpi={editKpi}
      />
    </div>
  );
};

export default KpiList;
