import "@testing-library/jest-dom";
import {
  fetchKpisHelper,
  handleAddKpiHelper,
  handleEditKpiHelper,
  handleDeleteKpiHelper,
} from "./KpiList";
import { KPI } from "../../../libraries/dist";
import { Modal } from "antd";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));

jest.mock("../store/useKpiStore", () => ({
  useKpiStore: jest.fn(() => ({
    kpis: [
      {
        id: "1",
        name: "KPI 1",
        customer: "Customer 1",
        variables: [{ id: "var1", displayName: "v1", value: 10 }],
      },
      {
        id: "2",
        name: "KPI 2",
        customer: "Customer 2",
        variables: [{ id: "var2", displayName: "v2", value: 20 }],
      },
    ],
    addKpi: jest.fn(),
    updateKpi: jest.fn(),
    deleteKpi: jest.fn(),
  })),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Modal: {
    confirm: jest.fn(),
  },
}));

describe("KpiList functions", () => {
  test("fetchKpisHelper calls fetchKpis", async () => {
    const fetchKpisMock = jest.fn();
    await fetchKpisHelper(fetchKpisMock);
    expect(fetchKpisMock).toHaveBeenCalled();
  });

  test("handleAddKpiHelper sets modal visibility and clears editKpi", () => {
    const setEditKpiMock = jest.fn();
    const setIsModalVisibleMock = jest.fn();
    handleAddKpiHelper(setEditKpiMock, setIsModalVisibleMock);
    expect(setEditKpiMock).toHaveBeenCalledWith(null);
    expect(setIsModalVisibleMock).toHaveBeenCalledWith(true);
  });

  test("handleEditKpiHelper sets editKpi and modal visibility", () => {
    const setEditKpiMock = jest.fn();
    const setIsModalVisibleMock = jest.fn();
    const kpi: KPI = {
      id: "1",
      name: "KPI 1",
      customer: "Customer 1",
      variables: [{ id: "var1", displayName: "v1", value: 10 }],
    };
    handleEditKpiHelper(kpi, setEditKpiMock, setIsModalVisibleMock);
    expect(setEditKpiMock).toHaveBeenCalledWith(kpi);
    expect(setIsModalVisibleMock).toHaveBeenCalledWith(true);
  });

  test("handleDeleteKpiHelper calls deleteKpi", () => {
    const deleteKpiMock = jest.fn();
    const id = "1";

    const confirmMock = Modal.confirm as jest.MockedFunction<
      typeof Modal.confirm
    >;
    confirmMock.mockImplementation((options) => {
      if (options.onOk) {
        return options.onOk();
      }
    });

    handleDeleteKpiHelper(id, deleteKpiMock);

    expect(deleteKpiMock).toHaveBeenCalledWith(id);
  });
});
