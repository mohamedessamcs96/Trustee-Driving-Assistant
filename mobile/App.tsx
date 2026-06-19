import React, { useRef, useState } from "react";
import { Animated, Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { DMMono_400Regular, DMMono_500Medium } from "@expo-google-fonts/dm-mono";
import { Navigation, Radio, Newspaper, Headphones, Sun } from "lucide-react-native";

import { TrusteeLogo } from "./src/components/TrusteeLogo";
import { DriveScreen } from "./src/screens/DriveScreen";
import { FeedScreen } from "./src/screens/FeedScreen";
import { NewsScreen } from "./src/screens/NewsScreen";
import { AudioScreen } from "./src/screens/AudioScreen";
import { MorningScreen } from "./src/screens/MorningScreen";
import { AuthFlow, UserProfile } from "./src/screens/auth/AuthScreens";
import { theme } from "./src/theme";

const tabs = [
  { id: "drive", label: "Drive", Icon: Navigation },
  { id: "feed", label: "Feed", Icon: Radio },
  { id: "news", label: "News", Icon: Newspaper },
  { id: "audio", label: "Audio", Icon: Headphones },
  { id: "morning", label: "Morning", Icon: Sun },
] as const;

type TabId = typeof tabs[number]["id"];

function MainApp({ profile }: { profile: UserProfile }) {
  const [active, setActive] = useState<TabId>("drive");
  const fade = useRef(new Animated.Value(1)).current;

  const screens: Record<TabId, React.ReactNode> = {
    drive: <DriveScreen />,
    feed: <FeedScreen />,
    news: <NewsScreen />,
    audio: <AudioScreen />,
    morning: <MorningScreen />,
  };

  const selectTab = (id: TabId) => {
    if (id === active) return;
    fade.setValue(0);
    setActive(id);
    Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.mainRoot}>
      <View style={styles.topBar}>
        <TrusteeLogo size="md" />
        <View style={styles.carPill}>
          <View style={styles.carPillDot} />
          <Text style={styles.carPillText}>{profile.carName}</Text>
        </View>
      </View>

      <Animated.View style={[styles.screenArea, { opacity: fade }]}>{screens[active]}</Animated.View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.Icon;
          return (
            <Pressable key={tab.id} onPress={() => selectTab(tab.id)} style={styles.tabButton}>
              {isActive && <View style={styles.tabIndicator} />}
              <View style={[styles.tabIconWrap, isActive && styles.tabIconWrapActive]}>
                <Icon size={16} color={isActive ? theme.colors.trusteeGreen : theme.colors.sageGray} strokeWidth={isActive ? 2 : 1.5} />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    DMMono_400Regular,
    DMMono_500Medium,
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
        <StatusBar barStyle="dark-content" />
        {!profile ? <AuthFlow onComplete={setProfile} /> : <MainApp profile={profile} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainRoot: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46,125,82,0.1)",
  },
  carPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(76,175,125,0.12)",
    borderWidth: 1,
    borderColor: "rgba(76,175,125,0.25)",
  },
  carPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.leafAccent,
  },
  carPillText: {
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.trusteeGreen,
  },
  screenArea: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 10 : 0,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(46,125,82,0.1)",
    backgroundColor: "#ffffff",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  tabIndicator: {
    position: "absolute",
    top: -8,
    left: "50%",
    marginLeft: -12,
    width: 24,
    height: 2,
    borderRadius: 999,
    backgroundColor: theme.colors.trusteeGreen,
  },
  tabIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconWrapActive: {
    backgroundColor: "rgba(46,125,82,0.1)",
  },
  tabLabel: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  tabLabelActive: {
    fontFamily: theme.fonts.sansSemiBold,
    fontSize: 10,
    color: theme.colors.trusteeGreen,
  },
});
