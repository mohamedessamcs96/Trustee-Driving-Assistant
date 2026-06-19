import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';
import { TrusteeLogo } from '../components/TrusteeLogo';
import { AuthFlow } from './AuthScreens';
import { DriveScreen } from './DriveScreen';
import { FeedScreen } from './FeedScreen';
import { NewsScreen } from './NewsScreen';
import { AudioScreen } from './AudioScreen';
import { MorningScreen } from './MorningScreen';

type TabId = 'drive' | 'feed' | 'news' | 'audio' | 'morning';

const tabs: { id: TabId; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'drive', label: 'Drive', icon: 'navigation' },
  { id: 'feed', label: 'Feed', icon: 'radio' },
  { id: 'news', label: 'News', icon: 'file-text' },
  { id: 'audio', label: 'Audio', icon: 'headphones' },
  { id: 'morning', label: 'Morning', icon: 'sun' },
];

interface UserProfile {
  email: string;
  carName: string;
  color: string;
}

function ScreenContent({ tab }: { tab: TabId }) {
  switch (tab) {
    case 'drive': return <DriveScreen />;
    case 'feed': return <FeedScreen />;
    case 'news': return <NewsScreen />;
    case 'audio': return <AudioScreen />;
    case 'morning': return <MorningScreen />;
  }
}

export function MainApp() {
  const [active, setActive] = useState<TabId>('drive');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const insets = useSafeAreaInsets();

  if (!profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar barStyle="dark-content" />
        <AuthFlow onComplete={p => setProfile(p)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TrusteeLogo size="md" />
          <View style={styles.carPill}>
            <View style={styles.carPillDot} />
            <Text style={styles.carPillText}>{profile.carName}</Text>
          </View>
        </View>

        {/* Screen content */}
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <ScreenContent tab={active} />
        </View>

        {/* Bottom nav */}
        <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActive(tab.id)}
                style={styles.tabBtn}
                activeOpacity={0.7}
              >
                {isActive && (
                  <View style={styles.tabIndicator} />
                )}
                <View style={[
                  styles.tabIconBox,
                  { backgroundColor: isActive ? 'rgba(46,125,82,0.1)' : 'transparent' },
                ]}>
                  <Feather
                    name={tab.icon}
                    size={16}
                    color={isActive ? colors.forest : colors.sage}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </View>
                <Text style={[
                  styles.tabLabel,
                  {
                    color: isActive ? colors.forest : colors.sage,
                    fontWeight: isActive ? '600' : '400',
                  },
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46,125,82,0.1)',
  },
  carPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(76,175,125,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,125,0.25)',
  },
  carPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.leaf,
  },
  carPillText: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.forest,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(46,125,82,0.1)',
    backgroundColor: colors.white,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.forest,
  },
  tabIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: 'System',
    fontSize: 10,
  },
});
