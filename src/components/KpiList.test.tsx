import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // optional, for better jest assertions
import { KPI } from "../types/KPI"; // adjust path as needed
import KpiList from "./KpiList";

// Mock Zustand store
jest.mock("../store/useKpiStore", () => {
  const kpis: KPI[] = [
    { id: 1, name: "KPI 1", value: 100 },
    { id: 2, name: "KPI 2", value: 200 },
  ];

  return {
    useKpiStore: () => ({
      kpis,
      addKpi: jest.fn(),
      updateKpi: jest.fn(),
      deleteKpi: jest.fn(),
    }),
  };
});

describe("KpiList component", () => {
  test("renders KPI list correctly", () => {
    render(<KpiList />);

    // Check if initial KPIs are rendered
    expect(screen.getByText("KPI 1")).toBeInTheDocument();
    expect(screen.getByText("KPI 2")).toBeInTheDocument();
  });

  test("adds a new KPI", () => {
    render(<KpiList />);

    // Add new KPI
    fireEvent.change(screen.getByPlaceholderText("KPI Name"), {
      target: { value: "New KPI" },
    });
    fireEvent.change(screen.getByPlaceholderText("KPI Value"), {
      target: { value: "300" },
    });
    fireEvent.click(screen.getByText("Add New KPI"));

    // Check if new KPI is added
    expect(screen.getByText("New KPI")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  test("updates an existing KPI", () => {
    render(<KpiList />);

    // Click edit button for KPI 1
    fireEvent.click(screen.getAllByLabelText("Edit KPI")[0]);

    // Update the KPI
    fireEvent.change(screen.getByDisplayValue("KPI 1"), {
      target: { value: "Updated KPI 1" },
    });
    fireEvent.change(screen.getByDisplayValue("100"), {
      target: { value: "150" },
    });
    fireEvent.click(screen.getByText("Update"));

    // Check if KPI is updated
    expect(screen.getByText("Updated KPI 1")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("deletes an existing KPI", () => {
    render(<KpiList />);

    // Click delete button for KPI 1
    fireEvent.click(screen.getAllByLabelText("Delete KPI")[0]);

    // Confirm delete in modal (if using Modal for delete confirmation)
    fireEvent.click(screen.getByText("OK"));

    // Check if KPI is deleted
    expect(screen.queryByText("KPI 1")).not.toBeInTheDocument();
  });
});
