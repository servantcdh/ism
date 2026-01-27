import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Input } from "../components/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type here"
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type here");
    await userEvent.type(input, "Hello");
    await expect(input).toHaveValue("Hello");
  }
};

export const WithValue: Story = {
  args: {
    value: "Preset"
  }
};
