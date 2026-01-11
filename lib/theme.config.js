// Theme color palette source of truth

const theme = {
  // Primary palette for site branding
  primary: {
    50: "#EFF6FF", // Lightest - backgrounds
    100: "#DBEAFE", // Light hover states
    200: "#BFDBFE", // Light accents
    300: "#93C5FD", // Borders, dividers
    400: "#60A5FA", // Secondary buttons
    500: "#3B82F6", // Bright blue - hover state
    600: "#2563EB", // MAIN PRIMARY - buttons, links ⭐
    700: "#1D4ED8", // Active/pressed state
    800: "#1E40AF", // Dark accents
    900: "#1E3A8A", // Darkest - text on light
  },
  // Complementary palette synced to primary
  secondary: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },

  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    500: "#22C55E", // Main success
    600: "#16A34A",
    700: "#15803D",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B", // Main warning
    600: "#D97706",
    700: "#B45309",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444", // Main error
    600: "#DC2626",
    700: "#B91C1C",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6", // Same as primary
    600: "#2563EB",
    700: "#1D4ED8",
  },

  neutral: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },
};

// Export for use in components if needed
module.exports = {theme};
