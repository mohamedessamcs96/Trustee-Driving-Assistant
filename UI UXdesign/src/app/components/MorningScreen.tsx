import { useState, useEffect } from "react";
import { Mic, MicOff, CheckCircle2, Circle, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const seedTasks = [
  { id: 1, text: "Call Marcus about the Q3 report", done: false },
  { id: 2, text: "Pick up prescription from pharmacy", done: false },
  { id: 3, text: "Return library books before 6pm", done: true },
];

export function MorningScreen() {
  const [recording, setRecording] = useState(false);
  const [tasks, setTasks] = useState(seedTasks);

  useEffect(() => {
    if (!recording) return;
    const timeout = setTimeout(() => {
      setRecording(false);
      setTasks(t => [...t, { id: Date.now(), text: "Book dentist appointment for Thursday", done: false }]);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [recording]);

  const toggleTask = (id: number) =>
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const pending = tasks.filter(t => !t.done).length;

  return (
    <div className="flex flex-col h-full px-4">
      <div className="pt-3 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sun size={16} color="#F5C842" />
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#C49B0A" }}>
            MORNING MODE
          </span>
        </div>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#1C2826", fontSize: 22, fontWeight: 400, lineHeight: 1.3 }}>
          Good morning,<br />
          <span style={{ color: "#2E7D52" }}>GreenDart</span>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 4 }}>
          Friday, June 5 · {pending} task{pending !== 1 ? "s" : ""} pending
        </p>
      </div>

      {/* Mic */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative flex items-center justify-center">
          {recording && (
            <>
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute w-24 h-24 rounded-full"
                style={{ backgroundColor: "rgba(76,175,125,0.2)" }} />
              <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                className="absolute w-20 h-20 rounded-full"
                style={{ backgroundColor: "rgba(76,175,125,0.25)" }} />
            </>
          )}
          <motion.button whileTap={{ scale: 0.94 }}
            onClick={() => setRecording(r => !r)}
            className="relative w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: recording ? "#2E7D52" : "#F4F8F6",
              border: `2px solid ${recording ? "#2E7D52" : "rgba(46,125,82,0.3)"}`,
              boxShadow: recording ? "0 4px 20px rgba(46,125,82,0.3)" : "none",
            }}>
            {recording ? <Mic size={24} color="#fff" /> : <MicOff size={24} color="#6B8C7E" />}
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {recording ? (
            <motion.p key="rec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#2E7D52" }}>
              Listening… speak your task
            </motion.p>
          ) : (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E" }}>
              Tap to capture a voice note
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex items-center justify-between mb-2.5">
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6B8C7E" }}>TODAY'S TASKS</span>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#2E7D52" }}>
            {tasks.filter(t => t.done).length}/{tasks.length}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div key={task.id}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer"
                style={{
                  backgroundColor: task.done ? "rgba(46,125,82,0.04)" : "#F9FCFA",
                  border: `1px solid ${task.done ? "rgba(46,125,82,0.1)" : "rgba(46,125,82,0.15)"}`,
                }}>
                {task.done
                  ? <CheckCircle2 size={16} color="#4CAF7D" />
                  : <Circle size={16} color="#6B8C7E" />
                }
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13,
                  color: task.done ? "#6B8C7E" : "#1C2826",
                  textDecoration: task.done ? "line-through" : "none",
                  lineHeight: 1.4,
                }}>
                  {task.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
