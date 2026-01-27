import { render, screen } from "@testing-library/react";
import { FormField } from "../components/FormField";
import { Input } from "../components/Input";

test("FormField shows label and error", () => {
  render(
    <FormField label="Email" htmlFor="email" error="Required">
      <Input id="email" />
    </FormField>
  );

  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Required")).toBeInTheDocument();
});
