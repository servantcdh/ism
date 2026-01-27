import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Select } from "../components/Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <option value="in">In</option>
        <option value="sale">Sale</option>
      </>
    )
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "sale");
    await expect(select).toHaveValue("sale");
  }
};
