import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Draft",
    tone: "neutral"
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};

export const Primary: Story = {
  args: { tone: "primary", children: "Live" }
};
