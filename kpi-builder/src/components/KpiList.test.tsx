import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KpiList from "./KpiList";

// Mock uuid
jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));

// Mock Zustand store
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

describe("KpiList component", () => {
  test("renders KPI list correctly", () => {
    render(<KpiList />);

    expect(screen.getByText("KPI 1")).toBeInTheDocument();
    expect(screen.getByText("Customer 1")).toBeInTheDocument();
    expect(screen.getByText("v1: 10")).toBeInTheDocument();
    expect(screen.getByText("KPI 2")).toBeInTheDocument();
    expect(screen.getByText("Customer 2")).toBeInTheDocument();
    expect(screen.getByText("v2: 20")).toBeInTheDocument();
  });

  test("adds a new KPI", () => {
    render(<KpiList />);

    fireEvent.click(screen.getByText("Add New KPI"));
    fireEvent.change(screen.getByPlaceholderText("Variable Name"), {
      target: { value: "New KPI" },
    });
    fireEvent.change(screen.getByPlaceholderText("Variable Value"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Customer Name"), {
      target: { value: "New Customer" },
    });
    fireEvent.click(screen.getByText("Add Variable"));
    fireEvent.change(screen.getByPlaceholderText("v1"), {
      target: { value: "New Variable" },
    });
    fireEvent.click(screen.getByText("Add New KPI"));

    expect(screen.getByText("New KPI")).toBeInTheDocument();
    expect(screen.getByText("New Customer")).toBeInTheDocument();
    expect(screen.getByText("New Variable: 100")).toBeInTheDocument();
  });

  test("updates an existing KPI", () => {
    render(<KpiList />);

    fireEvent.click(screen.getAllByLabelText("Edit KPI")[0]);

    fireEvent.change(screen.getByDisplayValue("KPI 1"), {
      target: { value: "Updated KPI 1" },
    });
    fireEvent.change(screen.getByDisplayValue("Customer 1"), {
      target: { value: "Updated Customer 1" },
    });
    fireEvent.change(screen.getByDisplayValue("v1"), {
      target: { value: "Updated Variable 1" },
    });
    fireEvent.change(screen.getByDisplayValue("10"), {
      target: { value: "150" },
    });
    fireEvent.click(screen.getByText("Update"));

    expect(screen.getByText("Updated KPI 1")).toBeInTheDocument();
    expect(screen.getByText("Updated Customer 1")).toBeInTheDocument();
    expect(screen.getByText("Updated Variable 1: 150")).toBeInTheDocument();
  });

  test("deletes an existing KPI", () => {
    render(<KpiList />);

    fireEvent.click(screen.getAllByLabelText("Delete KPI")[0]);

    fireEvent.click(screen.getByText("OK"));

    expect(screen.queryByText("KPI 1")).not.toBeInTheDocument();
  });
});
