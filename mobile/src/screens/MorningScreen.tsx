import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Mic, MicOff, CheckCircle2, Circle, Sun } from "lucide-react-native";
import { theme } from "../theme";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const seedTasks: Task[] = [
  { id: 1, text: "Call Marcus about the Q3 report", done: false },
  { id: 2, text: "Pick up prescription from pharmacy", done: false },
  { id: 3, text: "Return library books before 6pm", done: true },
];

function PulseRing({ active, delay, size }: { active: boolean; delay: number; size: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (!active) {
      scale.setValue(1);
      opacity.setValue(0.3);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.5, duration: 600, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.3, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [active]);

  if (!active) return null;

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        { width: size, height: size, borderRadius: size / 2, transform: [{ scale }], opacity },
      ]}
    />
  );
}

export function MorningScreen() {
  const [recording, setRecording] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const micScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!recording) return;
    const timeout = setTimeout(() => {
      setRecording(false);
      setTasks((t) => [...t, { id: Date.now(), text: "Book dentist appointment for Thursday", done: false }]);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [recording]);

  const toggleTask = (id: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const pending = tasks.filter((t) => !t.done).length;

  const onMicPress = () => {
    Animated.sequence([
      Animated.timing(micScale, { toValue: 0.94, duration: 80, useNativeDriver: true }),
      Animated.timing(micScale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    setRecording((r) => !r);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.modeRow}>
          <Sun size={16} color={theme.colors.roadGold} />
          <Text style={styles.modeText}>MORNING MODE</Text>
        </View>
        <Text style={styles.greeting}>
          Good morning,{"\n"}
          <Text style={{ color: theme.colors.trusteeGreen }}>GreenDart</Text>
        </Text>
        <Text style={styles.dateText}>
          Friday, June 5 · {pending} task{pending !== 1 ? "s" : ""} pending
        </Text>
      </View>

      <View style={styles.micSection}>
        <View style={styles.micWrap}>
          <PulseRing active={recording} delay={0} size={96} />
          <PulseRing active={recording} delay={300} size={80} />
          <Animated.View style={{ transform: [{ scale: micScale }] }}>
            <Pressable
              onPress={onMicPress}
              style={[
                styles.micButton,
                {
                  backgroundColor: recording ? theme.colors.trusteeGreen : theme.colors.fieldBg,
                  borderColor: recording ? theme.colors.trusteeGreen : "rgba(46,125,82,0.3)",
                },
              ]}
            >
              {recording ? <Mic size={24} color="#fff" /> : <MicOff size={24} color={theme.colors.sageGray} />}
            </Pressable>
          </Animated.View>
        </View>
        <Text style={recording ? styles.recordingLabel : styles.idleLabel}>
          {recording ? "Listening… speak your task" : "Tap to capture a voice note"}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksHeaderLabel}>TODAY'S TASKS</Text>
          <Text style={styles.tasksHeaderCount}>
            {tasks.filter((t) => t.done).length}/{tasks.length}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {tasks.map((task) => (
            <Pressable
              key={task.id}
              onPress={() => toggleTask(task.id)}
              style={[
                styles.taskRow,
                {
                  backgroundColor: task.done ? "rgba(46,125,82,0.04)" : theme.colors.cardBg,
                  borderColor: task.done ? "rgba(46,125,82,0.1)" : "rgba(46,125,82,0.15)",
                },
              ]}
            >
              {task.done ? <CheckCircle2 size={16} color={theme.colors.leafAccent} /> : <Circle size={16} color={theme.colors.sageGray} />}
              <Text
                style={[
                  styles.taskText,
                  {
                    color: task.done ? theme.colors.sageGray : theme.colors.charcoal,
                    textDecorationLine: task.done ? "line-through" : "none",
                  },
                ]}
              >
                {task.text}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  modeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  modeText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.roadGoldDark,
  },
  greeting: {
    fontFamily: theme.fonts.serif,
    fontSize: 22,
    color: theme.colors.charcoal,
    fontWeight: "400",
    lineHeight: 29,
  },
  dateText: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
    marginTop: 4,
  },
  micSection: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
  },
  micWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 96,
  },
  pulseRing: {
    position: "absolute",
    backgroundColor: "rgba(76,175,125,0.2)",
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  recordingLabel: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.trusteeGreen,
  },
  idleLabel: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
  },
  tasksHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tasksHeaderLabel: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  tasksHeaderCount: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.trusteeGreen,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
  },
  taskText: {
    flex: 1,
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    lineHeight: 18,
  },
});
