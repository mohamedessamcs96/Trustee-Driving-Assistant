import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

const seedTasks = [
  { id: 1, text: 'Call Marcus about the Q3 report', done: false },
  { id: 2, text: 'Pick up prescription from pharmacy', done: false },
  { id: 3, text: 'Return library books before 6pm', done: true },
];

export function MorningScreen() {
  const [recording, setRecording] = useState(false);
  const [tasks, setTasks] = useState(seedTasks);

  // Pulse animations for mic
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const pulseOpacity1 = useRef(new Animated.Value(0.3)).current;
  const pulseOpacity2 = useRef(new Animated.Value(0.25)).current;
  const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (recording) {
      pulseAnim.current = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulse1, { toValue: 1.5, duration: 600, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
            Animated.timing(pulse1, { toValue: 1, duration: 600, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(pulseOpacity1, { toValue: 0, duration: 600, useNativeDriver: true }),
            Animated.timing(pulseOpacity1, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.delay(200),
            Animated.timing(pulse2, { toValue: 1.25, duration: 600, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
            Animated.timing(pulse2, { toValue: 1, duration: 600, useNativeDriver: true }),
          ]),
        ])
      );
      pulseAnim.current.start();
    } else {
      pulseAnim.current?.stop();
      pulse1.setValue(1);
      pulse2.setValue(1);
      pulseOpacity1.setValue(0.3);
    }
    return () => pulseAnim.current?.stop();
  }, [recording]);

  // Auto-add task after "recording"
  useEffect(() => {
    if (!recording) return;
    const timeout = setTimeout(() => {
      setRecording(false);
      setTasks(t => [
        ...t,
        { id: Date.now(), text: 'Book dentist appointment for Thursday', done: false },
      ]);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [recording]);

  const toggleTask = (id: number) =>
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.mornRow}>
          <Feather name="sun" size={16} color="#F5C842" />
          <Text style={styles.mornLabel}>MORNING MODE</Text>
        </View>
        <Text style={styles.greeting}>
          Good morning,{'\n'}
          <Text style={styles.greetingName}>GreenDart</Text>
        </Text>
        <Text style={styles.subheading}>
          Friday, June 5 · {pending} task{pending !== 1 ? 's' : ''} pending
        </Text>
      </View>

      {/* Mic area */}
      <View style={styles.micArea}>
        <View style={styles.micOuter}>
          {recording && (
            <>
              <Animated.View
                style={[
                  styles.pulse,
                  styles.pulse1,
                  { transform: [{ scale: pulse1 }], opacity: pulseOpacity1 },
                ]}
              />
              <Animated.View
                style={[
                  styles.pulse,
                  styles.pulse2,
                  { transform: [{ scale: pulse2 }], opacity: pulseOpacity2 },
                ]}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => setRecording(r => !r)}
            activeOpacity={0.9}
            style={[
              styles.micBtn,
              {
                backgroundColor: recording ? colors.forest : colors.bgLight,
                borderColor: recording ? colors.forest : 'rgba(46,125,82,0.3)',
                shadowColor: recording ? colors.forest : 'transparent',
                shadowOpacity: recording ? 0.3 : 0,
                shadowRadius: recording ? 12 : 0,
                shadowOffset: { width: 0, height: 4 },
                elevation: recording ? 8 : 0,
              },
            ]}
          >
            <Feather
              name={recording ? 'mic' : 'mic-off'}
              size={24}
              color={recording ? '#fff' : colors.sage}
            />
          </TouchableOpacity>
        </View>
        <Text style={[
          styles.micLabel,
          { color: recording ? colors.forest : colors.sage, fontFamily: recording ? 'Courier' : 'System' },
        ]}>
          {recording ? 'Listening… speak your task' : 'Tap to capture a voice note'}
        </Text>
      </View>

      {/* Task list */}
      <View style={styles.taskSection}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskHeaderLeft}>TODAY'S TASKS</Text>
          <Text style={styles.taskHeaderRight}>{done}/{tasks.length}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.taskList}
        >
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
              style={[
                styles.taskCard,
                {
                  backgroundColor: task.done ? 'rgba(46,125,82,0.04)' : colors.bgCard,
                  borderColor: task.done ? 'rgba(46,125,82,0.1)' : 'rgba(46,125,82,0.15)',
                },
              ]}
            >
              <Feather
                name={task.done ? 'check-circle' : 'circle'}
                size={16}
                color={task.done ? colors.leaf : colors.sage}
              />
              <Text style={[
                styles.taskText,
                {
                  color: task.done ? colors.sage : colors.charcoal,
                  textDecorationLine: task.done ? 'line-through' : 'none',
                },
              ]}>
                {task.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  mornRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  mornLabel: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#C49B0A',
  },
  greeting: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: colors.charcoal,
    fontWeight: '400',
    lineHeight: 30,
  },
  greetingName: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: colors.forest,
  },
  subheading: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
    marginTop: 4,
  },
  micArea: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  micOuter: {
    position: 'relative',
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(76,175,125,0.2)',
  },
  pulse1: {
    width: 96,
    height: 96,
  },
  pulse2: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(76,175,125,0.25)',
  },
  micBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  micLabel: {
    fontSize: 12,
  },
  taskSection: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskHeaderLeft: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
  },
  taskHeaderRight: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.forest,
  },
  taskList: {
    gap: 8,
    paddingBottom: 8,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  taskText: {
    fontFamily: 'System',
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
