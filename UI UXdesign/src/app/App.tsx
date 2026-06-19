import { useState } from "react";
import { Navigation, Radio, Newspaper, Headphones, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TrusteeLogo } from "./components/TrusteeLogo";
import { DriveScreen } from "./components/DriveScreen";
import { FeedScreen } from "./components/FeedScreen";
import { NewsScreen } from "./components/NewsScreen";
import { AudioScreen } from "./components/AudioScreen";
import { MorningScreen } from "./components/MorningScreen";
import { AuthFlow } from "./components/AuthScreens";

const tabs = [
  { id: "drive", label: "Drive", icon: Navigation },
  { id: "feed", label: "Feed", icon: Radio },
  { id: "news", label: "News", icon: Newspaper },
  { id: "audio", label: "Audio", icon: Headphones },
  { id: "morning", label: "Morning", icon: Sun },
] as const;

type TabId = typeof tabs[number]["id"];

interface UserProfile {
  email: string;
  carName: string;
  color: string;
}

export default function App() {
  const [active, setActive] = useState<TabId>("drive");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const screens: Record<TabId, React.ReactNode> = {
    drive: <DriveScreen />,
    feed: <FeedScreen />,
    news: <NewsScreen />,
    audio: <AudioScreen />,
    morning: <MorningScreen />,
  };

  return (
    <div
      className="size-full flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, #D6EFE1 0%, #f0f4f2 60%, #e8efea 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 375,
          height: 780,
          backgroundColor: "#ffffff",
          borderRadius: 44,
          border: "1px solid rgba(46,125,82,0.18)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.15), 0 8px 32px rgba(46,125,82,0.1), 0 0 0 1px rgba(46,125,82,0.06)",
        }}
      >
        {/* Notch */}
        <div className="flex-shrink-0 flex items-center justify-center pt-3 pb-1">
          <div
            style={{
              width: 120, height: 30, borderRadius: 20,
              backgroundColor: "#1C2826",
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!profile ? (
            <motion.div
              key="auth"
              className="flex-1 min-h-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28 }}
            >
              <AuthFlow onComplete={p => setProfile(p)} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              className="flex-1 min-h-0 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top bar */}
              <div className="flex-shrink-0 flex items-center justify-between px-5 pb-2 pt-1"
                style={{ borderBottom: "1px solid rgba(46,125,82,0.1)" }}>
                <TrusteeLogo size="md" />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(76,175,125,0.12)", border: "1px solid rgba(76,175,125,0.25)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4CAF7D" }} />
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#2E7D52" }}>
                      {profile.carName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Screen content */}
              <div className="flex-1 min-h-0 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute inset-0 overflow-hidden"
                  >
                    {screens[active]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom nav */}
              <div
                className="flex-shrink-0 flex items-end pb-6 pt-2 px-3"
                style={{
                  borderTop: "1px solid rgba(46,125,82,0.1)",
                  backgroundColor: "#ffffff",
                }}
              >
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActive(tab.id)}
                      className="flex-1 flex flex-col items-center gap-1 relative py-1"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                          style={{ backgroundColor: "#2E7D52" }}
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ backgroundColor: isActive ? "rgba(46,125,82,0.1)" : "transparent" }}
                      >
                        <Icon
                          size={16}
                          color={isActive ? "#2E7D52" : "#6B8C7E"}
                          strokeWidth={isActive ? 2 : 1.5}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 10,
                          color: isActive ? "#2E7D52" : "#6B8C7E",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
