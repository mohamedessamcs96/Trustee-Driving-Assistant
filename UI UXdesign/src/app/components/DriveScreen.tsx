import { useState, useEffect } from "react";
import { AlertTriangle, Navigation, Eye, Gauge, TrendingUp, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const signs = [
  { text: "Speed limit: 50", type: "limit" },
  { text: "Sharp bend ahead", type: "warning" },
  { text: "No overtaking zone", type: "prohibitory" },
  { text: "Roundabout ahead", type: "junction" },
];

export function DriveScreen() {
  const [speed, setSpeed] = useState(43);
  const [pedProb, setPedProb] = useState(12);
  const [signIndex, setSignIndex] = useState(0);
  const [showPedAlert, setShowPedAlert] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setSpeed(s => Math.max(0, Math.min(80, s + (Math.random() - 0.48) * 3)));
      setPedProb(p => {
        const next = Math.max(0, Math.min(100, p + (Math.random() - 0.45) * 8));
        setShowPedAlert(next > 65);
        return next;
      });
    }, 1200);
    const sv = setInterval(() => setSignIndex(i => (i + 1) % signs.length), 4500);
    return () => { clearInterval(iv); clearInterval(sv); };
  }, []);

  const speedLimit = 50;
  const isSpeeding = speed > speedLimit;
  const sign = signs[signIndex];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Status */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4CAF7D" }} />
          <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#6B8C7E" }}>
            Road AI Active
          </span>
        </div>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#2E7D52" }}>
          LIVE
        </span>
      </div>

      {/* Map */}
      <div className="mx-4 rounded-2xl overflow-hidden relative"
        style={{
          height: 180,
          background: "linear-gradient(160deg, #1A4731 0%, #162D23 40%, #0F2019 100%)",
          border: "1px solid rgba(46,125,82,0.2)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
          <path d="M 120 180 L 140 80 L 200 80 L 220 180 Z" fill="rgba(30,50,40,0.9)" />
          <line x1="170" y1="180" x2="170" y2="80" stroke="#F5C842" strokeWidth="1.5" strokeDasharray="10,8" opacity="0.6" />
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={128 + i * 18} y={130} width={10} height={6}
              fill={showPedAlert ? "#E84545" : "rgba(214,239,225,0.3)"} rx="1" />
          ))}
          {showPedAlert && (
            <circle cx="170" cy="145" r="8" fill="rgba(232,69,69,0.25)" stroke="#E84545" strokeWidth="1" />
          )}
        </svg>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded"
            style={{ backgroundColor: "rgba(76,175,125,0.2)", color: "#4CAF7D",
              fontFamily: "DM Mono, monospace", fontSize: 10, border: "1px solid rgba(76,175,125,0.3)" }}>
            DRIVING LANE
          </span>
        </div>
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(76,175,125,0.2)", border: "1px solid rgba(76,175,125,0.3)" }}>
          <Navigation size={14} color="#4CAF7D" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.15), transparent)" }} />
      </div>

      {/* Speed row */}
      <div className="flex items-end justify-between mx-4 mt-3">
        <div>
          <div style={{
            fontFamily: "DM Mono, monospace", fontSize: 72, fontWeight: 400,
            color: isSpeeding ? "#E84545" : "#1C2826", lineHeight: 1,
          }}>
            {Math.round(speed)}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 2 }}>km/h</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center"
            style={{ border: "3px solid #E84545", backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(232,69,69,0.2)" }}>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 18, fontWeight: 500, color: "#1C2826" }}>
              {speedLimit}
            </span>
          </div>
          {isSpeeding && (
            <span className="px-2 py-0.5 rounded" style={{
              backgroundColor: "rgba(232,69,69,0.1)", color: "#E84545",
              fontFamily: "DM Mono, monospace", fontSize: 9,
              border: "1px solid rgba(232,69,69,0.3)",
            }}>SPEEDING</span>
          )}
        </div>
      </div>

      {/* Sign */}
      <AnimatePresence mode="wait">
        <motion.div key={signIndex}
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
          className="mx-4 mt-3 flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{
            backgroundColor: sign.type === "warning" ? "rgba(245,200,66,0.08)" :
              sign.type === "prohibitory" ? "rgba(232,69,69,0.08)" : "rgba(76,175,125,0.08)",
            border: `1px solid ${sign.type === "warning" ? "rgba(245,200,66,0.3)" :
              sign.type === "prohibitory" ? "rgba(232,69,69,0.3)" : "rgba(76,175,125,0.2)"}`,
          }}>
          <Eye size={14} color={sign.type === "warning" ? "#F5C842" : sign.type === "prohibitory" ? "#E84545" : "#4CAF7D"} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C2826" }}>{sign.text}</span>
          <span className="ml-auto" style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#6B8C7E" }}>TTS</span>
        </motion.div>
      </AnimatePresence>

      {/* Ped alert */}
      <AnimatePresence>
        {showPedAlert && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="mx-4 mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ backgroundColor: "rgba(232,69,69,0.07)", border: "1px solid rgba(232,69,69,0.3)" }}>
            <AlertTriangle size={14} color="#E84545" />
            <div className="flex-1">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E84545", fontWeight: 500 }}>
                Pedestrian likely to cross
              </p>
              <div className="mt-1 h-1 rounded-full" style={{ backgroundColor: "rgba(232,69,69,0.15)" }}>
                <div className="h-1 rounded-full transition-all duration-700"
                  style={{ width: `${pedProb}%`, backgroundColor: "#E84545" }} />
              </div>
            </div>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#E84545" }}>
              {Math.round(pedProb)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Behaviour stats */}
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: <Gauge size={14} />, label: "Hesitation", value: "Low" },
          { icon: <RotateCcw size={14} />, label: "U-Turn Risk", value: "None" },
          { icon: <TrendingUp size={14} />, label: "Highway", value: "Assist On" },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl"
            style={{ backgroundColor: "rgba(46,125,82,0.06)", border: "1px solid rgba(46,125,82,0.12)" }}>
            <span style={{ color: "#2E7D52" }}>{item.icon}</span>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#6B8C7E" }}>{item.label.toUpperCase()}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#1C2826", fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
