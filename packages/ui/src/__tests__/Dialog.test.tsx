import { render, screen } from "@testing-library/react";
import { Dialog } from "../components/Dialog";

test("Dialog renders when open", () => {
  const { rerender } = render(
    <Dialog open title="Dialog Title" onOpenChange={() => {}}>
      <p>Body</p>
    </Dialog>
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByText("Body")).toBeInTheDocument();

  rerender(
    <Dialog open={false} title="Dialog Title" onOpenChange={() => {}}>
      <p>Body</p>
    </Dialog>
  );

  expect(screen.queryByRole("dialog")).toBeNull();
});
