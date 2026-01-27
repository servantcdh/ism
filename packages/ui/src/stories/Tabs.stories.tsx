import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Tabs } from "../components/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    items: [
      { id: "stock", label: "Stock", content: "Stock list" },
      { id: "sales", label: "Sales", content: "Sales list" }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Stock list")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("tab", { name: "Sales" }));
    await expect(canvas.getByText("Sales list")).toBeInTheDocument();
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "sales"
  }
};
