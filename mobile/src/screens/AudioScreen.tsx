import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Lock, Unlock, Play, Pause, SkipForward, Music, Headphones, BookOpen } from "lucide-react-native";
import { theme } from "../theme";

const conditions = [
  { key: "quiet", label: "Quiet Street", desc: "Traffic density below threshold", met: true },
  { key: "solo", label: "Solo Driver", desc: "No active conversation detected", met: true },
  { key: "stable", label: "Stable Route", desc: "No recent U-turns or erratic movement", met: true },
  { key: "speed", label: "Safe Speed", desc: "Driving within permitted limit", met: false },
];

const tracks = [
  { id: 1, title: "The Ezra Klein Show", author: "Ezra Klein · NYT", type: "podcast", duration: "1h 12m" },
  { id: 2, title: "Atomic Habits", author: "James Clear · Audiobook", type: "book", duration: "5h 35m" },
  { id: 3, title: "Huberman Lab #190", author: "Andrew Huberman", type: "podcast", duration: "2h 04m" },
];

export function AudioScreen() {
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);

  const allMet = conditions.every((c) => c.met);
  const metCount = conditions.filter((c) => c.met).length;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Audio</Text>
        <Text style={styles.subtitle}>Unlocks when all 4 conditions are met</Text>
      </View>

      <View style={styles.conditionsCard}>
        {conditions.map((c, i) => (
          <View key={c.key} style={[styles.conditionRow, i < conditions.length - 1 && styles.conditionRowBorder]}>
            <View style={[styles.conditionDot, { backgroundColor: c.met ? "rgba(76,175,125,0.15)" : "rgba(232,69,69,0.1)" }]}>
              {c.met ? <Unlock size={10} color={theme.colors.trusteeGreen} /> : <Lock size={10} color={theme.colors.alertRed} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.conditionLabel}>{c.label}</Text>
              <Text style={styles.conditionDesc}>{c.desc}</Text>
            </View>
            <View style={[styles.conditionStatusDot, { backgroundColor: c.met ? theme.colors.leafAccent : theme.colors.alertRed }]} />
          </View>
        ))}
      </View>

      <View
        style={[
          styles.statusBanner,
          {
            backgroundColor: allMet ? "rgba(76,175,125,0.08)" : "rgba(245,200,66,0.08)",
            borderColor: allMet ? "rgba(76,175,125,0.25)" : "rgba(245,200,66,0.3)",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.statusTitle, { color: allMet ? theme.colors.trusteeGreen : theme.colors.roadGoldDark }]}>
            {allMet ? "Audio Unlocked" : `${metCount}/4 conditions met`}
          </Text>
          {!allMet && <Text style={styles.statusHint}>Reduce speed to unlock</Text>}
        </View>
        {allMet ? <Headphones size={18} color={theme.colors.trusteeGreen} /> : <Lock size={16} color={theme.colors.roadGoldDark} />}
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.trackList} showsVerticalScrollIndicator={false}>
        {tracks.map((t, i) => {
          const isSelected = selected === i && allMet;
          return (
            <Pressable
              key={t.id}
              disabled={!allMet}
              onPress={() => allMet && setSelected(i)}
              style={[
                styles.trackRow,
                {
                  backgroundColor: isSelected ? "rgba(46,125,82,0.08)" : theme.colors.cardBg,
                  borderColor: isSelected ? "rgba(46,125,82,0.3)" : "rgba(46,125,82,0.1)",
                  opacity: allMet ? 1 : 0.5,
                },
              ]}
            >
              <View style={styles.trackIcon}>
                {t.type === "book" ? <BookOpen size={16} color={theme.colors.trusteeGreen} /> : <Music size={16} color={theme.colors.trusteeGreen} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.trackTitle} numberOfLines={1}>{t.title}</Text>
                <Text style={styles.trackAuthor} numberOfLines={1}>{t.author}</Text>
              </View>
              <Text style={styles.trackDuration}>{t.duration}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {allMet && (
        <View style={styles.player}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.playerTitle} numberOfLines={1}>{tracks[selected].title}</Text>
            <View style={styles.playerBarTrack}>
              <View style={styles.playerBarFill} />
            </View>
          </View>
          <View style={styles.playerControls}>
            <Pressable style={styles.playButton} onPress={() => setPlaying((p) => !p)}>
              {playing ? <Pause size={14} color="#fff" /> : <Play size={14} color="#fff" />}
            </Pressable>
            <Pressable style={styles.skipButton}>
              <SkipForward size={13} color={theme.colors.trusteeGreen} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
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
    fontSize: 12,
    color: theme.colors.sageGray,
    marginTop: 2,
  },
  conditionsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.15)",
    backgroundColor: theme.colors.cardBg,
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  conditionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46,125,82,0.08)",
  },
  conditionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  conditionLabel: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 12,
    color: theme.colors.charcoal,
  },
  conditionDesc: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  conditionStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
  },
  statusTitle: {
    fontFamily: theme.fonts.sansSemiBold,
    fontSize: 13,
  },
  statusHint: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
    marginTop: 2,
  },
  trackList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    marginBottom: 8,
  },
  trackIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(46,125,82,0.1)",
  },
  trackTitle: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 13,
    color: theme.colors.charcoal,
  },
  trackAuthor: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
  },
  trackDuration: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.fieldBg,
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.2)",
  },
  playerTitle: {
    fontFamily: theme.fonts.sansSemiBold,
    fontSize: 12,
    color: theme.colors.trusteeGreen,
  },
  playerBarTrack: {
    marginTop: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(46,125,82,0.15)",
  },
  playerBarFill: {
    width: "38%",
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.leafAccent,
  },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.trusteeGreen,
  },
  skipButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(46,125,82,0.12)",
  },
});
