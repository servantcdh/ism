import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { FormField } from "../components/FormField";
import { Input } from "../components/Input";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    label: "Product name",
    htmlFor: "product-name"
  }
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const WithHelp: Story = {
  render: (args) => (
    <FormField {...args} help="Shown to customers">
      <Input id="product-name" placeholder="Bean chips" />
    </FormField>
  )
};

export const WithError: Story = {
  render: (args) => (
    <FormField {...args} error="Required">
      <Input id="product-name" hasError placeholder="Bean chips" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Required")).toBeInTheDocument();
  }
};
