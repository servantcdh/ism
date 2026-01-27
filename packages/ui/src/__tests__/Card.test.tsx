import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card";

test("Card renders content", () => {
  render(
    <Card title="Summary">
      <p>Content</p>
    </Card>
  );

  expect(screen.getByText("Summary")).toBeInTheDocument();
  expect(screen.getByText("Content")).toBeInTheDocument();
});
