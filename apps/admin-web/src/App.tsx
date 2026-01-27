import { useState } from "react";
import { Button, Card, Dialog, Input } from "@inventory/ui";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Admin Web</h1>
        <Button onClick={() => setOpen(true)}>New Product</Button>
      </header>

      <Card title="Quick Add">
        <div className="app-field">
          <label htmlFor="sku">SKU</label>
          <Input id="sku" placeholder="SKU-001" />
        </div>
        <div className="app-field">
          <label htmlFor="name">Name</label>
          <Input id="name" placeholder="Product name" />
        </div>
        <Button variant="ghost">Save Draft</Button>
      </Card>

      <Dialog open={open} title="Create Product" onOpenChange={setOpen}>
        <p>Draft flow stub. Wire to API next.</p>
        <div className="app-actions">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </Dialog>
    </main>
  );
}
