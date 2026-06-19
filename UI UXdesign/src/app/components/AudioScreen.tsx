import { useState } from "react";
import { Lock, Unlock, Play, Pause, SkipForward, Music, Headphones, BookOpen } from "lucide-react";
import { motion } from "motion/react";

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

  const allMet = conditions.every(c => c.met);
  const metCount = conditions.filter(c => c.met).length;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-3">
        <h2 style={{ fontFamily: "Georgia, serif", color: "#1C2826", fontSize: 20, fontWeight: 400 }}>
          Smart Audio
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 2 }}>
          Unlocks when all 4 conditions are met
        </p>
      </div>

      <div className="mx-4 rounded-2xl overflow-hidden mb-4"
        style={{ border: "1px solid rgba(46,125,82,0.15)", backgroundColor: "#F9FCFA" }}>
        {conditions.map((c, i) => (
          <div key={c.key} className="flex items-center gap-3 px-3.5 py-2.5"
            style={{ borderBottom: i < conditions.length - 1 ? "1px solid rgba(46,125,82,0.08)" : "none" }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: c.met ? "rgba(76,175,125,0.15)" : "rgba(232,69,69,0.1)" }}>
              {c.met ? <Unlock size={10} color="#2E7D52" /> : <Lock size={10} color="#E84545" />}
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#1C2826", fontWeight: 500 }}>
                {c.label}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#6B8C7E" }}>{c.desc}</p>
            </div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.met ? "#4CAF7D" : "#E84545" }} />
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mx-4 mb-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          backgroundColor: allMet ? "rgba(76,175,125,0.08)" : "rgba(245,200,66,0.08)",
          border: `1px solid ${allMet ? "rgba(76,175,125,0.25)" : "rgba(245,200,66,0.3)"}`,
        }}>
        <div className="flex-1">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            color: allMet ? "#2E7D52" : "#C49B0A" }}>
            {allMet ? "Audio Unlocked" : `${metCount}/4 conditions met`}
          </p>
          {!allMet && (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E", marginTop: 2 }}>
              Reduce speed to unlock
            </p>
          )}
        </div>
        {allMet ? <Headphones size={18} color="#2E7D52" /> : <Lock size={16} color="#C49B0A" />}
      </div>

      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2" style={{ scrollbarWidth: "none" }}>
        {tracks.map((t, i) => (
          <motion.div key={t.id} whileTap={{ scale: 0.98 }}
            onClick={() => allMet && setSelected(i)}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer"
            style={{
              backgroundColor: selected === i && allMet ? "rgba(46,125,82,0.08)" : "#F9FCFA",
              border: `1px solid ${selected === i && allMet ? "rgba(46,125,82,0.3)" : "rgba(46,125,82,0.1)"}`,
              opacity: allMet ? 1 : 0.5,
            }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(46,125,82,0.1)" }}>
              {t.type === "book" ? <BookOpen size={16} color="#2E7D52" /> : <Music size={16} color="#2E7D52" />}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C2826", fontWeight: 500 }} className="truncate">
                {t.title}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E" }} className="truncate">
                {t.author}
              </p>
            </div>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>{t.duration}</span>
          </motion.div>
        ))}
      </div>

      {allMet && (
        <div className="mx-4 mb-3 mt-3 px-4 py-3 rounded-2xl flex items-center gap-3"
          style={{ backgroundColor: "#F4F8F6", border: "1px solid rgba(46,125,82,0.2)" }}>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#2E7D52", fontWeight: 600 }} className="truncate">
              {tracks[selected].title}
            </p>
            <div className="mt-1.5 h-1 rounded-full" style={{ backgroundColor: "rgba(46,125,82,0.15)" }}>
              <div className="h-1 rounded-full" style={{ width: "38%", backgroundColor: "#4CAF7D" }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(p => !p)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#2E7D52" }}>
              {playing ? <Pause size={14} color="#fff" /> : <Play size={14} color="#fff" />}
            </button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(46,125,82,0.12)" }}>
              <SkipForward size={13} color="#2E7D52" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
