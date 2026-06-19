import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

type Size = "sm" | "md" | "lg";

const FONT_SIZES: Record<Size, number> = { sm: 18, md: 24, lg: 36 };
const DOT_SIZES: Record<Size, number> = { sm: 12, md: 16, lg: 24 };
const DOT_OFFSETS: Record<Size, { top: number; left: number }> = {
  sm: { top: -7, left: 1 },
  md: { top: -10, left: 1 },
  lg: { top: -14, left: 2 },
};

export function TrusteeLogo({ size = "md" }: { size?: Size }) {
  const fontSize = FONT_SIZES[size];
  const dotSize = DOT_SIZES[size];
  const offset = DOT_OFFSETS[size];

  return (
    <View style={styles.row}>
      <View>
        <Text
          style={[
            styles.dot,
            { fontSize: dotSize, top: offset.top, left: offset.left },
          ]}
        >
          ·
        </Text>
        <Text style={[styles.t, { fontSize }]}>t</Text>
      </View>
      <Text style={[styles.rest, { fontSize }]}>rustee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  t: {
    fontFamily: theme.fonts.serif,
    color: theme.colors.leafAccent,
    fontWeight: "400",
  },
  rest: {
    fontFamily: theme.fonts.serif,
    color: theme.colors.mistText,
    fontWeight: "400",
  },
  dot: {
    position: "absolute",
    fontFamily: theme.fonts.serif,
    color: theme.colors.roadGold,
    fontWeight: "700",
  },
});
