import { Platform } from "react-native";

export const theme = {
  colors: {
    deepForest: "#1A4731",
    trusteeGreen: "#2E7D52",
    leafAccent: "#4CAF7D",
    mintMist: "#D6EFE1",
    roadGold: "#F5C842",
    roadGoldDark: "#C49B0A",
    alertRed: "#E84545",
    charcoal: "#1C2826",
    sageGray: "#6B8C7E",
    surface: "#F6FBF8",
    fieldBg: "#F4F8F6",
    cardBg: "#F9FCFA",
    mistText: "#E8F2EC",
    white: "#FFFFFF",
  },
  radius: {
    xl: 28,
    lg: 20,
    md: 16,
    sm: 12,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fonts: {
    sans: "Inter_400Regular",
    sansMedium: "Inter_500Medium",
    sansSemiBold: "Inter_600SemiBold",
    sansBold: "Inter_700Bold",
    mono: "DMMono_400Regular",
    monoMedium: "DMMono_500Medium",
    serif: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
  },
};
