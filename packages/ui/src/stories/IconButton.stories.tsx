import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../components/IconButton";

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    label: "Settings",
    icon: "⚙"
  }
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
