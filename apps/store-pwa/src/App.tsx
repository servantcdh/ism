import { useState } from "react";
import { Button, Card, Input } from "@inventory/ui";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Store PWA</h1>
        <Button size="sm">Scan</Button>
      </header>

      <Card title="Quick Lookup">
        <Input
          placeholder="Scan or type code"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="app-actions">
          <Button variant="ghost">Clear</Button>
          <Button>Search</Button>
        </div>
      </Card>
    </main>
  );
}
