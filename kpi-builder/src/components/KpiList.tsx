import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useKpiStore } from "../store/useKpiStore";
import { KPI } from "./../../../libraries/dist";
import KpiModal from "./KpiModal";

const KpiList: React.FC = () => {
  const { kpis, fetchKpis, addKpi, updateKpi, deleteKpi } = useKpiStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editKpi, setEditKpi] = useState<KPI | null>(null);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  const handleAddKpi = () => {
    setEditKpi(null);
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
      render: (
        variables: Array<{ id: string; displayName: string; value: number }>
      ) =>
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
      render: (
        aggregation:
          | {
              median: number;
              average: number;
              integration: number;
              sum: number;
            }
          | undefined
      ) =>
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
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="link"
          onClick={handleAddKpi}
          icon={<PlusOutlined />}
          style={{ marginBottom: "20px" }}
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
