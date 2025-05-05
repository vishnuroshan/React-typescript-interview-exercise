import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { spell: "Expelliarmus", use: "Disarming", index: 1 },
        { spell: "Lumos", use: "Creates light", index: 2 }
      ])
  })
) as jest.Mock;

describe("App", () => {
  it("renders input and spell list", async () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/search spells/i)).toBeInTheDocument();

    // Wait for spells to load
    await waitFor(() => {
      expect(screen.getByText("Expelliarmus")).toBeInTheDocument();
      expect(screen.getByText("Lumos")).toBeInTheDocument();
    });
  });

  it("filters spells on input", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search spells/i);

    fireEvent.change(input, { target: { value: "Lumos" } });

    await waitFor(() => {
      expect(screen.getByText("Lumos")).toBeInTheDocument();
    });
  });
});