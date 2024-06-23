import React, { useState } from "react";
import { useKpiStore } from "../store/useKpiStore";
import { Table, Button, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { KPI } from "../types/KPI";

const KpiList: React.FC = () => {
  const { kpis, addKpi, updateKpi, deleteKpi } = useKpiStore();
  const [newKpi, setNewKpi] = useState<{ name: string; value: number }>({
    name: "",
    value: 0,
  });
  const [editKpi, setEditKpi] = useState<KPI | null>(null);

  const handleAddKpi = () => {
    if (newKpi.name && newKpi.value) {
      addKpi({ ...newKpi, id: Date.now() });
      setNewKpi({ name: "", value: 0 });
    }
  };

  const handleUpdateKpi = () => {
    if (editKpi) {
      updateKpi(editKpi);
      setEditKpi(null);
    }
  };

  const handleDeleteKpi = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this KPI?",
      onOk: () => deleteKpi(id),
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: KPI) =>
        editKpi?.id === record.id ? (
          <Input
            value={editKpi.name}
            onChange={(e) => setEditKpi({ ...editKpi, name: e.target.value })}
          />
        ) : (
          text
        ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text: number, record: KPI) =>
        editKpi?.id === record.id ? (
          <Input
            type="number"
            value={editKpi.value}
            onChange={(e) =>
              setEditKpi({ ...editKpi, value: Number(e.target.value) })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: KPI) => (
        <div>
          {editKpi?.id === record.id ? (
            <Button type="primary" onClick={handleUpdateKpi}>
              Update
            </Button>
          ) : (
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditKpi(record)}
            />
          )}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteKpi(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="KPI Name"
          value={newKpi.name}
          onChange={(e) => setNewKpi({ ...newKpi, name: e.target.value })}
          style={{ width: 200, marginRight: 8 }}
        />
        <Input
          type="number"
          placeholder="KPI Value"
          value={newKpi.value}
          onChange={(e) =>
            setNewKpi({ ...newKpi, value: Number(e.target.value) })
          }
          style={{ width: 200, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleAddKpi}>
          Add New KPI
        </Button>
      </div>
      <Table columns={columns} dataSource={kpis} rowKey="id" />
    </div>
  );
};

export default KpiList;
