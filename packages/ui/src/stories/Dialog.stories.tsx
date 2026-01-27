import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Dialog } from "../components/Dialog";
import { Button } from "../components/Button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Create Movement"
  }
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Open: Story = {
  render: (args) => (
    <Dialog {...args} onOpenChange={() => {}}>
      <p>Confirm adjustment.</p>
      <Button variant="ghost">Cancel</Button>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await expect(canvas.getByText("Confirm adjustment.")).toBeInTheDocument();
  }
};

export const Closed: Story = {
  args: {
    open: false
  },
  render: (args) => (
    <Dialog {...args} onOpenChange={() => {}}>
      <p>Hidden</p>
    </Dialog>
  )
};
