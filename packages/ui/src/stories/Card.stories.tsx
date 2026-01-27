import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Inventory Snapshot"
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args}>
      <p>156 items tracked</p>
    </Card>
  )
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} footer={<span>Updated 2m ago</span>}>
      <p>Low stock alerts pending</p>
    </Card>
  )
};
