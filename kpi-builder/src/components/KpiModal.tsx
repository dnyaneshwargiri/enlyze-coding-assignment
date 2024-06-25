import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { KPI } from "./../../../libraries/dist";
import { v4 as uuidv4 } from "uuid";

interface KpiModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (kpi: KPI) => void;
  editKpi: KPI | null;
}

const KpiModal: React.FC<KpiModalProps> = ({
  visible,
  onCancel,
  onSave,
  editKpi,
}) => {
  const [form] = Form.useForm();
  const [variables, setVariables] = useState<
    Array<{ id: string; displayName: string; value: number }>
  >([]);

  useEffect(() => {
    if (editKpi) {
      form.setFieldsValue(editKpi);
      setVariables(editKpi.variables || []);
    } else {
      form.resetFields();
      setVariables([]);
    }
  }, [editKpi, form]);

  const handleAddVariable = () => {
    setVariables([
      ...variables,
      {
        id: uuidv4(),
        displayName: `Variable ${variables.length + 1}`,
        value: 0,
      },
    ]);
  };

  const handleRemoveVariable = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to remove this variable?",
      onOk: () =>
        setVariables(variables.filter((variable) => variable.id !== id)),
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, id: editKpi ? editKpi.id : uuidv4(), variables });
      form.resetFields();
      setVariables([]);
    });
  };

  return (
    <Modal
      title={editKpi ? "Edit KPI" : "Add KPI"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          {editKpi ? "Update" : "Save"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="KPI Definition"
          rules={[{ required: true, message: "Please input the KPI name!" }]}
        >
          <Input placeholder="E.g. Increase on-time delivery" />
        </Form.Item>
        <Form.Item
          name="customer"
          label="Customer Name"
          rules={[{ required: true, message: "Please input the customer!" }]}
        >
          <Input placeholder="Masteflex" />
        </Form.Item>
        <Form.Item label="Variables">
          <Space direction="vertical" style={{ width: "100%" }}>
            {variables.map((variable) => (
              <Space
                key={variable.id}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Input
                  placeholder="Variable Display Name"
                  value={variable.displayName}
                  onChange={(e) => {
                    const newVariables = variables.map((v) =>
                      v.id === variable.id
                        ? { ...v, displayName: e.target.value }
                        : v
                    );
                    setVariables(newVariables);
                  }}
                />
                <Input
                  placeholder="Variable Value"
                  type="number"
                  value={variable.value}
                  onChange={(e) => {
                    const newVariables = variables.map((v) =>
                      v.id === variable.id
                        ? { ...v, value: parseFloat(e.target.value) }
                        : v
                    );
                    setVariables(newVariables);
                  }}
                />
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleRemoveVariable(variable.id)}
                />
              </Space>
            ))}
            <Button type="dashed" onClick={handleAddVariable}>
              + Add Variable
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KpiModal;
