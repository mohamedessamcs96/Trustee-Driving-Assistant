import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

const conditions = [
  { key: 'quiet', label: 'Quiet Street', desc: 'Traffic density below threshold', met: true },
  { key: 'solo', label: 'Solo Driver', desc: 'No active conversation detected', met: true },
  { key: 'stable', label: 'Stable Route', desc: 'No recent U-turns or erratic movement', met: true },
  { key: 'speed', label: 'Safe Speed', desc: 'Driving within permitted limit', met: false },
];

const tracks = [
  { id: 1, title: 'The Ezra Klein Show', author: 'Ezra Klein · NYT', type: 'podcast', duration: '1h 12m' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear · Audiobook', type: 'book', duration: '5h 35m' },
  { id: 3, title: 'Huberman Lab #190', author: 'Andrew Huberman', type: 'podcast', duration: '2h 04m' },
];

export function AudioScreen() {
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);

  const allMet = conditions.every(c => c.met);
  const metCount = conditions.filter(c => c.met).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Smart Audio</Text>
        <Text style={styles.subtitle}>Unlocks when all 4 conditions are met</Text>
      </View>

      {/* Conditions list */}
      <View style={styles.conditionsCard}>
        {conditions.map((c, i) => (
          <View
            key={c.key}
            style={[
              styles.conditionRow,
              i < conditions.length - 1 && styles.conditionBorder,
            ]}
          >
            <View style={[
              styles.conditionIcon,
              { backgroundColor: c.met ? 'rgba(76,175,125,0.15)' : 'rgba(232,69,69,0.1)' },
            ]}>
              <Feather
                name={c.met ? 'unlock' : 'lock'}
                size={10}
                color={c.met ? colors.forest : colors.alert}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.conditionLabel}>{c.label}</Text>
              <Text style={styles.conditionDesc}>{c.desc}</Text>
            </View>
            <View style={[
              styles.conditionDot,
              { backgroundColor: c.met ? colors.leaf : colors.alert },
            ]} />
          </View>
        ))}
      </View>

      {/* Unlock status */}
      <View style={[
        styles.statusCard,
        {
          backgroundColor: allMet ? 'rgba(76,175,125,0.08)' : 'rgba(245,200,66,0.08)',
          borderColor: allMet ? 'rgba(76,175,125,0.25)' : 'rgba(245,200,66,0.3)',
        },
      ]}>
        <View style={{ flex: 1 }}>
          <Text style={[
            styles.statusTitle,
            { color: allMet ? colors.forest : '#C49B0A' },
          ]}>
            {allMet ? 'Audio Unlocked' : `${metCount}/4 conditions met`}
          </Text>
          {!allMet && (
            <Text style={styles.statusSubtitle}>Reduce speed to unlock</Text>
          )}
        </View>
        <Feather
          name={allMet ? 'headphones' : 'lock'}
          size={allMet ? 18 : 16}
          color={allMet ? colors.forest : '#C49B0A'}
        />
      </View>

      {/* Track list */}
      <ScrollView
        style={styles.trackList}
        contentContainerStyle={styles.trackListContent}
        showsVerticalScrollIndicator={false}
      >
        {tracks.map((t, i) => (
          <TouchableOpacity
            key={t.id}
            onPress={() => allMet && setSelected(i)}
            activeOpacity={allMet ? 0.7 : 1}
            style={[
              styles.trackCard,
              {
                backgroundColor: selected === i && allMet ? 'rgba(46,125,82,0.08)' : colors.bgCard,
                borderColor: selected === i && allMet ? 'rgba(46,125,82,0.3)' : 'rgba(46,125,82,0.1)',
                opacity: allMet ? 1 : 0.5,
              },
            ]}
          >
            <View style={styles.trackIcon}>
              <Feather
                name={t.type === 'book' ? 'book-open' : 'music'}
                size={16}
                color={colors.forest}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.trackTitle} numberOfLines={1}>{t.title}</Text>
              <Text style={styles.trackAuthor} numberOfLines={1}>{t.author}</Text>
            </View>
            <Text style={styles.trackDuration}>{t.duration}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Player */}
      {allMet && (
        <View style={styles.player}>
          <View style={{ flex: 1 }}>
            <Text style={styles.playerTitle} numberOfLines={1}>
              {tracks[selected].title}
            </Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <View style={styles.playerControls}>
            <TouchableOpacity
              onPress={() => setPlaying(p => !p)}
              style={styles.playBtn}
            >
              <Feather name={playing ? 'pause' : 'play'} size={14} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipBtn}>
              <Feather name="skip-forward" size={13} color={colors.forest} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: colors.charcoal,
    fontWeight: '400',
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
    marginTop: 2,
  },
  conditionsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.15)',
    backgroundColor: colors.bgCard,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  conditionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46,125,82,0.08)',
  },
  conditionIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionLabel: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.charcoal,
    fontWeight: '500',
  },
  conditionDesc: {
    fontFamily: 'System',
    fontSize: 10,
    color: colors.sage,
  },
  conditionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusTitle: {
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '600',
  },
  statusSubtitle: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
    marginTop: 2,
  },
  trackList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  trackListContent: {
    gap: 8,
    paddingBottom: 8,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  trackIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(46,125,82,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackTitle: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.charcoal,
    fontWeight: '500',
  },
  trackAuthor: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
  },
  trackDuration: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.2)',
  },
  playerTitle: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.forest,
    fontWeight: '600',
  },
  progressTrack: {
    marginTop: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(46,125,82,0.15)',
    overflow: 'hidden',
  },
  progressFill: {
    width: '38%',
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.leaf,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(46,125,82,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
