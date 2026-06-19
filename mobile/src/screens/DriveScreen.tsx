import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
import { AlertTriangle, Navigation, Eye, Gauge, TrendingUp, RotateCcw } from "lucide-react-native";
import { theme } from "../theme";

const signs = [
  { text: "Speed limit: 50", type: "limit" },
  { text: "Sharp bend ahead", type: "warning" },
  { text: "No overtaking zone", type: "prohibitory" },
  { text: "Roundabout ahead", type: "junction" },
];

const SIGN_COLORS: Record<string, string> = {
  warning: theme.colors.roadGold,
  prohibitory: theme.colors.alertRed,
  limit: theme.colors.leafAccent,
  junction: theme.colors.leafAccent,
};

const SIGN_BG: Record<string, string> = {
  warning: "rgba(245,200,66,0.08)",
  prohibitory: "rgba(232,69,69,0.08)",
  limit: "rgba(76,175,125,0.08)",
  junction: "rgba(76,175,125,0.08)",
};

const SIGN_BORDER: Record<string, string> = {
  warning: "rgba(245,200,66,0.3)",
  prohibitory: "rgba(232,69,69,0.3)",
  limit: "rgba(76,175,125,0.2)",
  junction: "rgba(76,175,125,0.2)",
};

export function DriveScreen() {
  const [speed, setSpeed] = useState(43);
  const [pedProb, setPedProb] = useState(12);
  const [signIndex, setSignIndex] = useState(0);
  const [showPedAlert, setShowPedAlert] = useState(false);
  const signFade = useRef(new Animated.Value(1)).current;
  const pedBar = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const iv = setInterval(() => {
      setSpeed((s) => Math.max(0, Math.min(80, s + (Math.random() - 0.48) * 3)));
      setPedProb((p) => {
        const next = Math.max(0, Math.min(100, p + (Math.random() - 0.45) * 8));
        setShowPedAlert(next > 65);
        Animated.timing(pedBar, { toValue: next, duration: 700, useNativeDriver: false }).start();
        return next;
      });
    }, 1200);
    const sv = setInterval(() => {
      Animated.sequence([
        Animated.timing(signFade, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(signFade, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      setSignIndex((i) => (i + 1) % signs.length);
    }, 4500);
    return () => {
      clearInterval(iv);
      clearInterval(sv);
    };
  }, []);

  const speedLimit = 50;
  const isSpeeding = speed > speedLimit;
  const sign = signs[signIndex];

  return (
    <View style={styles.root}>
      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Road AI Active</Text>
        </View>
        <Text style={styles.liveText}>LIVE</Text>
      </View>

      <View style={styles.mapWrap}>
        <LinearGradient
          colors={["#1A4731", "#162D23", "#0F2019"]}
          locations={[0, 0.4, 1]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} viewBox="0 0 340 180" preserveAspectRatio="none">
          <Path d="M 120 180 L 140 80 L 200 80 L 220 180 Z" fill="rgba(30,50,40,0.9)" />
          <Line x1="170" y1="180" x2="170" y2="80" stroke={theme.colors.roadGold} strokeWidth={1.5} strokeDasharray="10,8" opacity={0.6} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Rect
              key={i}
              x={128 + i * 18}
              y={130}
              width={10}
              height={6}
              rx={1}
              fill={showPedAlert ? theme.colors.alertRed : "rgba(214,239,225,0.3)"}
            />
          ))}
          {showPedAlert && <Circle cx={170} cy={145} r={8} fill="rgba(232,69,69,0.25)" stroke={theme.colors.alertRed} strokeWidth={1} />}
        </Svg>
        <View style={styles.laneBadge}>
          <Text style={styles.laneBadgeText}>DRIVING LANE</Text>
        </View>
        <View style={styles.navBadge}>
          <Navigation size={14} color={theme.colors.leafAccent} />
        </View>
        <LinearGradient colors={["rgba(255,255,255,0.15)", "transparent"]} style={styles.mapSheen} />
      </View>

      <View style={styles.speedRow}>
        <View>
          <Text style={[styles.speedValue, { color: isSpeeding ? theme.colors.alertRed : theme.colors.charcoal }]}>
            {Math.round(speed)}
          </Text>
          <Text style={styles.speedUnit}>km/h</Text>
        </View>
        <View style={styles.limitCol}>
          <View style={styles.limitCircle}>
            <Text style={styles.limitValue}>{speedLimit}</Text>
          </View>
          {isSpeeding && (
            <View style={styles.speedingBadge}>
              <Text style={styles.speedingText}>SPEEDING</Text>
            </View>
          )}
        </View>
      </View>

      <Animated.View
        style={[
          styles.signBanner,
          { opacity: signFade, backgroundColor: SIGN_BG[sign.type], borderColor: SIGN_BORDER[sign.type] },
        ]}
      >
        <Eye size={14} color={SIGN_COLORS[sign.type]} />
        <Text style={styles.signText}>{sign.text}</Text>
        <Text style={styles.signTag}>TTS</Text>
      </Animated.View>

      {showPedAlert && (
        <View style={styles.pedAlert}>
          <AlertTriangle size={14} color={theme.colors.alertRed} />
          <View style={{ flex: 1 }}>
            <Text style={styles.pedAlertTitle}>Pedestrian likely to cross</Text>
            <View style={styles.pedBarTrack}>
              <Animated.View
                style={[
                  styles.pedBarFill,
                  {
                    width: pedBar.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
                  },
                ]}
              />
            </View>
          </View>
          <Text style={styles.pedPercent}>{Math.round(pedProb)}%</Text>
        </View>
      )}

      <View style={styles.statsRow}>
        {[
          { icon: <Gauge size={14} color={theme.colors.trusteeGreen} />, label: "Hesitation", value: "Low" },
          { icon: <RotateCcw size={14} color={theme.colors.trusteeGreen} />, label: "U-Turn Risk", value: "None" },
          { icon: <TrendingUp size={14} color={theme.colors.trusteeGreen} />, label: "Highway", value: "Assist On" },
        ].map((item) => (
          <View key={item.label} style={styles.statCard}>
            {item.icon}
            <Text style={styles.statLabel}>{item.label.toUpperCase()}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.leafAccent,
  },
  statusText: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
  },
  liveText: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.trusteeGreen,
  },
  mapWrap: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.2)",
  },
  laneBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "rgba(76,175,125,0.2)",
    borderWidth: 1,
    borderColor: "rgba(76,175,125,0.3)",
  },
  laneBadgeText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.leafAccent,
  },
  navBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,175,125,0.2)",
    borderWidth: 1,
    borderColor: "rgba(76,175,125,0.3)",
  },
  mapSheen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
  },
  speedRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 12,
  },
  speedValue: {
    fontFamily: theme.fonts.mono,
    fontSize: 72,
    lineHeight: 76,
  },
  speedUnit: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
    marginTop: 2,
  },
  limitCol: {
    alignItems: "center",
    gap: 8,
  },
  limitCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: theme.colors.alertRed,
  },
  limitValue: {
    fontFamily: theme.fonts.mono,
    fontSize: 18,
    color: theme.colors.charcoal,
  },
  speedingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "rgba(232,69,69,0.1)",
    borderWidth: 1,
    borderColor: "rgba(232,69,69,0.3)",
  },
  speedingText: {
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.alertRed,
  },
  signBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
  },
  signText: {
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.charcoal,
  },
  signTag: {
    marginLeft: "auto",
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.sageGray,
  },
  pedAlert: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(232,69,69,0.07)",
    borderWidth: 1,
    borderColor: "rgba(232,69,69,0.3)",
  },
  pedAlertTitle: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 12,
    color: theme.colors.alertRed,
  },
  pedBarTrack: {
    marginTop: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(232,69,69,0.15)",
  },
  pedBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.alertRed,
  },
  pedPercent: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.alertRed,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(46,125,82,0.06)",
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.12)",
  },
  statLabel: {
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.sageGray,
  },
  statValue: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 11,
    color: theme.colors.charcoal,
  },
});
