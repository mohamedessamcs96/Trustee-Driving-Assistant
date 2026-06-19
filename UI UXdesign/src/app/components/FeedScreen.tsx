import { useState } from "react";
import { MapPin, Clock, Send, Radio } from "lucide-react";

const initialPosts = [
  {
    id: 1, car: "SilverWren", color: "#2E7D52", time: "2 min ago",
    text: "Jam on Ring 2, avoid Schönhauser Allee. Adding ~12 min.",
    dist: "1.2 km", tag: "Congestion",
  },
  {
    id: 2, car: "BluePine", color: "#F5C842", time: "7 min ago",
    text: "Road works past Tempelhof exit — left lane closed, merge right early.",
    dist: "2.8 km", tag: "Road Works",
  },
  {
    id: 3, car: "IronMoss", color: "#6B8C7E", time: "11 min ago",
    text: "Police checkpoint on A100 southbound just before Kreuz Schöneberg.",
    dist: "3.4 km", tag: "Police",
  },
  {
    id: 4, car: "DawnReed", color: "#4CAF7D", time: "18 min ago",
    text: "Clear run on the city ring right now if you need to loop west. No queues.",
    dist: "4.1 km", tag: "All Clear",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Congestion: { bg: "rgba(232,69,69,0.1)", text: "#E84545" },
  "Road Works": { bg: "rgba(245,200,66,0.12)", text: "#C49B0A" },
  Police: { bg: "rgba(107,140,126,0.12)", text: "#6B8C7E" },
  "All Clear": { bg: "rgba(76,175,125,0.1)", text: "#2E7D52" },
};

export function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (!draft.trim()) return;
    setPosts(p => [{
      id: Date.now(), car: "GreenDart", color: "#2E7D52",
      time: "just now", text: draft, dist: "0 km", tag: "All Clear",
    }, ...p]);
    setDraft("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-3 flex items-center justify-between">
        <div>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#1C2826", fontSize: 20, fontWeight: 400 }}>
            Nearby Drivers
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Radio size={11} color="#4CAF7D" />
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>
              WITHIN 5 KM · 4 ACTIVE
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(76,175,125,0.1)", border: "1px solid rgba(76,175,125,0.2)" }}>
          <MapPin size={14} color="#4CAF7D" />
        </div>
      </div>

      {/* Compose */}
      <div className="mx-4 mb-3 flex gap-2 items-center px-3 py-2.5 rounded-xl"
        style={{ backgroundColor: "#F4F8F6", border: "1.5px solid rgba(46,125,82,0.2)" }}>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#2E7D52", whiteSpace: "nowrap" }}>
          GreenDart
        </span>
        <span style={{ color: "rgba(46,125,82,0.3)" }}>|</span>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="What's happening nearby?"
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C2826" }}
        />
        <button onClick={submit} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: draft.trim() ? "#2E7D52" : "rgba(46,125,82,0.15)" }}>
          <Send size={12} color={draft.trim() ? "#fff" : "#6B8C7E"} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-2 flex flex-col gap-2.5" style={{ scrollbarWidth: "none" }}>
        {posts.map(post => {
          const tc = tagColors[post.tag] ?? tagColors["All Clear"];
          return (
            <div key={post.id} className="rounded-xl px-3.5 py-3"
              style={{ backgroundColor: "#F9FCFA", border: "1px solid rgba(46,125,82,0.12)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${post.color}20`, color: post.color,
                      fontFamily: "DM Mono, monospace", fontSize: 10, fontWeight: 700 }}>
                    {post.car[0]}
                  </div>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: post.color }}>
                    {post.car}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: tc.bg, color: tc.text, fontFamily: "Inter, sans-serif", fontSize: 10 }}>
                  {post.tag}
                </span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C2826", lineHeight: 1.5 }}>
                {post.text}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Clock size={10} color="#6B8C7E" />
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>{post.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={10} color="#6B8C7E" />
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>{post.dist}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
