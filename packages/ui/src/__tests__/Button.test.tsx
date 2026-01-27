import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../components/Button";

test("Button disabled prevents clicks", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  render(
    <Button disabled onClick={handleClick}>
      Save
    </Button>
  );

  const button = screen.getByRole("button", { name: "Save" });
  expect(button).toBeDisabled();

  await user.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});
