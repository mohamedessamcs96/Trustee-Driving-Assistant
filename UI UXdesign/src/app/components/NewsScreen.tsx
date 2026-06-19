import { ChevronRight, Zap, Shield, Star } from "lucide-react";

const articles = [
  {
    id: 1, tag: "Feature Launch", tagIcon: <Zap size={10} />, tagColor: "#C49B0A",
    title: "Morning Mode v2.0: Tasks now sync with Google Calendar",
    excerpt: "Your voice-captured reminders now flow directly into your calendar so nothing slips through after you arrive.",
    date: "Jun 4, 2026", read: "2 min",
  },
  {
    id: 2, tag: "Safety", tagIcon: <Shield size={10} />, tagColor: "#2E7D52",
    title: "How Trustee's pedestrian detection was trained on 40M road hours",
    excerpt: "A look inside the on-device model that predicts crossing intent before a single foot leaves the kerb.",
    date: "May 28, 2026", read: "5 min",
  },
  {
    id: 3, tag: "Update", tagIcon: <Star size={10} />, tagColor: "#6B8C7E",
    title: "Traffic sign database now covers 34 European countries",
    excerpt: "Version 3.8 ships with 2,400 new sign variants and improved OCR for partially obscured signs.",
    date: "May 19, 2026", read: "3 min",
  },
  {
    id: 4, tag: "Safety", tagIcon: <Shield size={10} />, tagColor: "#2E7D52",
    title: "5 habits that Trustee data shows make the biggest difference",
    excerpt: "Analysis of 1.2M driving sessions surfaces the behaviours strongly correlated with zero-incident months.",
    date: "May 12, 2026", read: "6 min",
  },
];

export function NewsScreen() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-3 flex items-end justify-between">
        <div>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#1C2826", fontSize: 20, fontWeight: 400 }}>
            ṫrustee News
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E", marginTop: 2 }}>
            Official updates & road safety
          </p>
        </div>
        <span style={{
          fontFamily: "DM Mono, monospace", fontSize: 9, color: "#2E7D52",
          backgroundColor: "rgba(46,125,82,0.1)", padding: "3px 8px", borderRadius: 999,
          border: "1px solid rgba(46,125,82,0.2)",
        }}>4 NEW</span>
      </div>

      {/* Featured */}
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#1A4731", border: "1px solid rgba(46,125,82,0.3)" }}>
        <div className="h-20 relative"
          style={{ background: "linear-gradient(135deg, #1A4731 0%, #0F2C1A 60%)" }}>
          <svg className="absolute top-0 right-0 w-32 h-20 opacity-10" viewBox="0 0 128 80">
            <circle cx="100" cy="10" r="60" fill="#4CAF7D" />
          </svg>
          <div className="absolute top-3 left-3.5">
            <span className="px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(245,200,66,0.25)", color: "#F5C842",
                fontFamily: "Inter, sans-serif", fontSize: 10, border: "1px solid rgba(245,200,66,0.4)" }}>
              ★ Featured
            </span>
          </div>
        </div>
        <div className="px-3.5 py-3">
          <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#E8F2EC", lineHeight: 1.4 }}>
            {articles[0].title}
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 4, lineHeight: 1.5 }}>
            {articles[0].excerpt}
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>
              {articles[0].date} · {articles[0].read} read
            </span>
            <ChevronRight size={14} color="#4CAF7D" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2.5 pb-2" style={{ scrollbarWidth: "none" }}>
        {articles.slice(1).map(a => (
          <div key={a.id} className="flex gap-3 px-3.5 py-3 rounded-xl cursor-pointer"
            style={{ backgroundColor: "#F9FCFA", border: "1px solid rgba(46,125,82,0.1)" }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span style={{ color: a.tagColor }}>{a.tagIcon}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: a.tagColor }}>{a.tag}</span>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: "#1C2826", lineHeight: 1.4 }}>
                {a.title}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E", marginTop: 3, lineHeight: 1.4 }}>
                {a.excerpt}
              </p>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E", marginTop: 4, display: "block" }}>
                {a.date} · {a.read} read
              </span>
            </div>
            <ChevronRight size={14} color="#6B8C7E" className="flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
