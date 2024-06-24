import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { KPI, Variable } from "../types/KPI";
import { v4 as uuidv4 } from "uuid";

interface KpiModalProps {
  visible: boolean;
  onOk: (kpi: Partial<KPI>) => void;
  onCancel: () => void;
  initialKpi: Partial<KPI> | null;
}

const KpiModal: React.FC<KpiModalProps> = ({
  visible,
  onOk,
  onCancel,
  initialKpi,
}) => {
  const [kpi, setKpi] = useState<Partial<KPI>>(initialKpi || {});
  const [variables, setVariables] = useState<Variable[]>(
    initialKpi?.variables || []
  );

  useEffect(() => {
    setKpi(initialKpi || {});
    setVariables(initialKpi?.variables || []);
  }, [initialKpi]);

  const addVariable = () => {
    setVariables([
      ...variables,
      { id: uuidv4(), displayName: `v${variables.length + 1}`, value: 0 },
    ]);
  };

  const removeVariable = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this variable?",
      onOk: () =>
        setVariables(variables.filter((variable) => variable.id !== id)),
    });
  };

  const handleOk = () => {
    onOk({ ...kpi, variables });
  };

  return (
    <Modal
      title={kpi.id ? "Edit KPI" : "Add KPI"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input
            value={kpi.name}
            onChange={(e) => setKpi({ ...kpi, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Customer">
          <Input
            value={kpi.customer}
            onChange={(e) => setKpi({ ...kpi, customer: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Variables">
          {variables.map((variable, index) => (
            <div
              key={variable.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Input
                placeholder="Variable Name"
                value={variable.displayName}
                onChange={(e) => {
                  const newVariables = [...variables];
                  newVariables[index].displayName = e.target.value;
                  setVariables(newVariables);
                }}
                style={{ marginRight: "8px" }}
              />
              <Input
                placeholder="Variable Value"
                type="number"
                value={variable.value}
                onChange={(e) => {
                  const newVariables = [...variables];
                  newVariables[index].value = Number(e.target.value);
                  setVariables(newVariables);
                }}
                style={{ marginRight: "8px" }}
              />
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => removeVariable(variable.id)}
              />
            </div>
          ))}
          <Button type="dashed" onClick={addVariable} icon={<PlusOutlined />}>
            Add Variable
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KpiModal;
