import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "../components/Toast";

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    title: "Stock synced",
    description: "3 items updated"
  }
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Neutral: Story = {};

export const Success: Story = {
  args: { tone: "success", title: "Sale posted", description: "$56.00" }
};
