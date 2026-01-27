import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../components/Tabs";

test("Tabs switches content", () => {
  render(
    <Tabs
      items={[
        { id: "one", label: "One", content: <div>First</div> },
        { id: "two", label: "Two", content: <div>Second</div> }
      ]}
    />
  );

  expect(screen.getByText("First")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("tab", { name: "Two" }));
  expect(screen.getByText("Second")).toBeInTheDocument();
});
