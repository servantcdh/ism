import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../components/Input";

test("Input calls onChange", () => {
  const handleChange = jest.fn();
  render(<Input placeholder="Name" onChange={handleChange} />);

  const input = screen.getByPlaceholderText("Name");
  fireEvent.change(input, { target: { value: "Ada" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
