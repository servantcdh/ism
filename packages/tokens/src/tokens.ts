export type Tokens = {
  color: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    primaryText: string;
    danger: string;
    border: string;
  };
  space: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  font: {
    sans: string;
  };
};

export const tokens: Tokens = {
  color: {
    bg: "#f7f6f3",
    surface: "#ffffff",
    text: "#1a1a1a",
    muted: "#6b6b6b",
    primary: "#1d4ed8",
    primaryText: "#ffffff",
    danger: "#dc2626",
    border: "#e4e4e7"
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px"
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px"
  },
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.08)",
    md: "0 6px 16px rgba(15, 23, 42, 0.12)"
  },
  font: {
    sans: "\"Space Grotesk\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  }
};
