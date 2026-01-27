import type { Preview } from "@storybook/react";
import "@inventory/tokens/src/tokens.css";
import "@inventory/ui/src/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true }
  }
};

export default preview;
