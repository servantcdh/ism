import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
};

export function Tabs({ items, defaultValue }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultValue ?? items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="ui-tabs">
      <div role="tablist" className="ui-tabs__list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={cn(
              "ui-tabs__tab",
              item.id === active?.id && "ui-tabs__tab--active"
            )}
            aria-selected={item.id === active?.id}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="ui-tabs__panel" role="tabpanel">
        {active?.content}
      </div>
    </div>
  );
}
