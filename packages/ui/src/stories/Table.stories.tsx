import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../components/Table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    columns: [
      { key: "sku", header: "SKU" },
      { key: "qty", header: "On Hand" }
    ],
    rows: [
      { sku: "SKU-01", qty: 10 },
      { sku: "SKU-02", qty: 4 }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Basic: Story = {};
