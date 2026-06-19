import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { ChevronRight, Zap, Shield, Star } from "lucide-react-native";
import { theme } from "../theme";

const articles = [
  {
    id: 1, tag: "Feature Launch", TagIcon: Zap, tagColor: "#C49B0A",
    title: "Morning Mode v2.0: Tasks now sync with Google Calendar",
    excerpt: "Your voice-captured reminders now flow directly into your calendar so nothing slips through after you arrive.",
    date: "Jun 4, 2026", read: "2 min",
  },
  {
    id: 2, tag: "Safety", TagIcon: Shield, tagColor: "#2E7D52",
    title: "How Trustee's pedestrian detection was trained on 40M road hours",
    excerpt: "A look inside the on-device model that predicts crossing intent before a single foot leaves the kerb.",
    date: "May 28, 2026", read: "5 min",
  },
  {
    id: 3, tag: "Update", TagIcon: Star, tagColor: "#6B8C7E",
    title: "Traffic sign database now covers 34 European countries",
    excerpt: "Version 3.8 ships with 2,400 new sign variants and improved OCR for partially obscured signs.",
    date: "May 19, 2026", read: "3 min",
  },
  {
    id: 4, tag: "Safety", TagIcon: Shield, tagColor: "#2E7D52",
    title: "5 habits that Trustee data shows make the biggest difference",
    excerpt: "Analysis of 1.2M driving sessions surfaces the behaviours strongly correlated with zero-incident months.",
    date: "May 12, 2026", read: "6 min",
  },
];

export function NewsScreen() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ṫrustee News</Text>
          <Text style={styles.subtitle}>Official updates & road safety</Text>
        </View>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>4 NEW</Text>
        </View>
      </View>

      <FlatList
        data={rest}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.featuredCard}>
            <LinearGradient colors={["#1A4731", "#0F2C1A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.featuredHero}>
              <Svg style={styles.featuredHeroSvg} viewBox="0 0 128 80">
                <Circle cx={100} cy={10} r={60} fill={theme.colors.leafAccent} opacity={0.1} />
              </Svg>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>★ Featured</Text>
              </View>
            </LinearGradient>
            <View style={styles.featuredBody}>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredExcerpt}>{featured.excerpt}</Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.metaText}>{featured.date} · {featured.read} read</Text>
                <ChevronRight size={14} color={theme.colors.leafAccent} />
              </View>
            </View>
          </View>
        }
        renderItem={({ item: a }) => (
          <View style={styles.articleCard}>
            <View style={{ flex: 1 }}>
              <View style={styles.articleTagRow}>
                <a.TagIcon size={10} color={a.tagColor} />
                <Text style={[styles.articleTagText, { color: a.tagColor }]}>{a.tag}</Text>
              </View>
              <Text style={styles.articleTitle}>{a.title}</Text>
              <Text style={styles.articleExcerpt}>{a.excerpt}</Text>
              <Text style={styles.metaText}>{a.date} · {a.read} read</Text>
            </View>
            <ChevronRight size={14} color={theme.colors.sageGray} style={{ marginTop: 4 }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.serif,
    fontSize: 20,
    color: theme.colors.charcoal,
    fontWeight: "400",
  },
  subtitle: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
    marginTop: 2,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "rgba(46,125,82,0.1)",
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.2)",
  },
  newBadgeText: {
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.trusteeGreen,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  featuredCard: {
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#1A4731",
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.3)",
  },
  featuredHero: {
    height: 80,
    position: "relative",
  },
  featuredHeroSvg: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 128,
    height: 80,
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    left: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(245,200,66,0.25)",
    borderWidth: 1,
    borderColor: "rgba(245,200,66,0.4)",
  },
  featuredBadgeText: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
    color: theme.colors.roadGold,
  },
  featuredBody: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  featuredTitle: {
    fontFamily: theme.fonts.serif,
    fontSize: 14,
    color: theme.colors.mistText,
    lineHeight: 19,
  },
  featuredExcerpt: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
    marginTop: 4,
    lineHeight: 18,
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metaText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  articleCard: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.sm,
    marginBottom: 10,
    backgroundColor: theme.colors.cardBg,
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.1)",
  },
  articleTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  articleTagText: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
  },
  articleTitle: {
    fontFamily: theme.fonts.serif,
    fontSize: 13,
    color: theme.colors.charcoal,
    lineHeight: 18,
  },
  articleExcerpt: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
    marginTop: 3,
    lineHeight: 16,
  },
});
