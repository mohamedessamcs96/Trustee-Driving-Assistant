import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Path, Line, Rect, Circle } from 'react-native-svg';
import { colors } from '../theme';

const signs = [
  { text: 'Speed limit: 50', type: 'limit' },
  { text: 'Sharp bend ahead', type: 'warning' },
  { text: 'No overtaking zone', type: 'prohibitory' },
  { text: 'Roundabout ahead', type: 'junction' },
];

function signColor(type: string) {
  if (type === 'warning') return '#F5C842';
  if (type === 'prohibitory') return colors.alert;
  return colors.leaf;
}

function signBg(type: string) {
  if (type === 'warning') return 'rgba(245,200,66,0.08)';
  if (type === 'prohibitory') return 'rgba(232,69,69,0.08)';
  return 'rgba(76,175,125,0.08)';
}

function signBorder(type: string) {
  if (type === 'warning') return 'rgba(245,200,66,0.3)';
  if (type === 'prohibitory') return 'rgba(232,69,69,0.3)';
  return 'rgba(76,175,125,0.2)';
}

export function DriveScreen() {
  const [speed, setSpeed] = useState(43);
  const [pedProb, setPedProb] = useState(12);
  const [signIndex, setSignIndex] = useState(0);
  const [showPedAlert, setShowPedAlert] = useState(false);

  const signOpacity = useRef(new Animated.Value(1)).current;
  const pedOpacity = useRef(new Animated.Value(0)).current;
  const pedBarWidth = useRef(new Animated.Value(0)).current;

  // Speed + ped simulation
  useEffect(() => {
    const iv = setInterval(() => {
      setSpeed(s => Math.max(0, Math.min(80, s + (Math.random() - 0.48) * 3)));
      setPedProb(p => {
        const next = Math.max(0, Math.min(100, p + (Math.random() - 0.45) * 8));
        setShowPedAlert(next > 65);
        Animated.timing(pedBarWidth, {
          toValue: next,
          duration: 700,
          useNativeDriver: false,
        }).start();
        return next;
      });
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  // Sign rotation animation
  useEffect(() => {
    const sv = setInterval(() => {
      Animated.sequence([
        Animated.timing(signOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(signOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setSignIndex(i => (i + 1) % signs.length);
    }, 4500);
    return () => clearInterval(sv);
  }, []);

  // Ped alert fade
  useEffect(() => {
    Animated.timing(pedOpacity, {
      toValue: showPedAlert ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showPedAlert]);

  const speedLimit = 50;
  const isSpeeding = speed > speedLimit;
  const sign = signs[signIndex];

  return (
    <View style={styles.container}>
      {/* Status bar */}
      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          <View style={styles.activeDot} />
          <Text style={styles.statusText}>Road AI Active</Text>
        </View>
        <Text style={styles.liveText}>LIVE</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <Svg style={StyleSheet.absoluteFill} viewBox="0 0 340 180" preserveAspectRatio="none">
          <Path d="M 120 180 L 140 80 L 200 80 L 220 180 Z" fill="rgba(30,50,40,0.9)" />
          <Line x1="170" y1="180" x2="170" y2="80" stroke="#F5C842"
            strokeWidth="1.5" strokeDasharray="10,8" opacity={0.6} />
          {[0, 1, 2, 3, 4].map(i => (
            <Rect key={i} x={128 + i * 18} y={130} width={10} height={6}
              fill={showPedAlert ? '#E84545' : 'rgba(214,239,225,0.3)'} rx={1} />
          ))}
          {showPedAlert && (
            <Circle cx="170" cy="145" r="8" fill="rgba(232,69,69,0.25)"
              stroke="#E84545" strokeWidth="1" />
          )}
        </Svg>
        <View style={styles.mapLaneTag}>
          <Text style={styles.mapLaneText}>DRIVING LANE</Text>
        </View>
        <View style={styles.mapNavBtn}>
          <Feather name="navigation" size={14} color={colors.leaf} />
        </View>
        <View style={styles.mapFade} />
      </View>

      {/* Speed row */}
      <View style={styles.speedRow}>
        <View>
          <Text style={[styles.speedNumber, { color: isSpeeding ? colors.alert : colors.charcoal }]}>
            {Math.round(speed)}
          </Text>
          <Text style={styles.speedUnit}>km/h</Text>
        </View>
        <View style={styles.speedLimitCol}>
          <View style={styles.speedLimitCircle}>
            <Text style={styles.speedLimitNumber}>{speedLimit}</Text>
          </View>
          {isSpeeding && (
            <View style={styles.speedingBadge}>
              <Text style={styles.speedingText}>SPEEDING</Text>
            </View>
          )}
        </View>
      </View>

      {/* Sign */}
      <Animated.View
        style={[
          styles.signRow,
          {
            backgroundColor: signBg(sign.type),
            borderColor: signBorder(sign.type),
            opacity: signOpacity,
          },
        ]}
      >
        <Feather name="eye" size={14} color={signColor(sign.type)} />
        <Text style={styles.signText}>{sign.text}</Text>
        <Text style={styles.signTTS}>TTS</Text>
      </Animated.View>

      {/* Ped alert */}
      <Animated.View
        style={[styles.pedAlert, { opacity: pedOpacity }]}
        pointerEvents={showPedAlert ? 'auto' : 'none'}
      >
        <Feather name="alert-triangle" size={14} color={colors.alert} />
        <View style={{ flex: 1 }}>
          <Text style={styles.pedAlertTitle}>Pedestrian likely to cross</Text>
          <View style={styles.pedBarTrack}>
            <Animated.View
              style={[
                styles.pedBarFill,
                {
                  width: pedBarWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.pedPercent}>{Math.round(pedProb)}%</Text>
      </Animated.View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {[
          { icon: 'activity' as const, label: 'HESITATION', value: 'Low' },
          { icon: 'rotate-ccw' as const, label: 'U-TURN RISK', value: 'None' },
          { icon: 'trending-up' as const, label: 'HIGHWAY', value: 'Assist On' },
        ].map(item => (
          <View key={item.label} style={styles.statCard}>
            <Feather name={item.icon} size={14} color={colors.forest} />
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.leaf,
  },
  statusText: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
  },
  liveText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: colors.forest,
  },
  mapContainer: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#162D23',
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.2)',
  },
  mapLaneTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(76,175,125,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,125,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mapLaneText: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.leaf,
  },
  mapNavBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(76,175,125,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,125,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    // gradient effect not possible via StyleSheet, handled by overlay
    backgroundColor: 'transparent',
  },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  speedNumber: {
    fontFamily: 'Courier',
    fontSize: 72,
    fontWeight: '400',
    lineHeight: 72,
  },
  speedUnit: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
    marginTop: 2,
  },
  speedLimitCol: {
    alignItems: 'center',
    gap: 8,
  },
  speedLimitCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: colors.alert,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.alert,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  speedLimitNumber: {
    fontFamily: 'Courier',
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
  },
  speedingBadge: {
    backgroundColor: 'rgba(232,69,69,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(232,69,69,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  speedingText: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: colors.alert,
  },
  signRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  signText: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.charcoal,
    flex: 1,
  },
  signTTS: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: colors.sage,
  },
  pedAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(232,69,69,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(232,69,69,0.3)',
  },
  pedAlertTitle: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.alert,
    fontWeight: '500',
  },
  pedBarTrack: {
    marginTop: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(232,69,69,0.15)',
    overflow: 'hidden',
  },
  pedBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.alert,
  },
  pedPercent: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: colors.alert,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(46,125,82,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.12)',
  },
  statLabel: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: colors.sage,
    textAlign: 'center',
  },
  statValue: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.charcoal,
    fontWeight: '500',
    textAlign: 'center',
  },
});
