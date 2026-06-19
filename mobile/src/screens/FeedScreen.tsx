import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MapPin, Clock, Send, Radio } from "lucide-react-native";
import { theme } from "../theme";

interface Post {
  id: number;
  car: string;
  color: string;
  time: string;
  text: string;
  dist: string;
  tag: string;
}

const initialPosts: Post[] = [
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
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (!draft.trim()) return;
    setPosts((p) => [
      { id: Date.now(), car: "GreenDart", color: "#2E7D52", time: "just now", text: draft, dist: "0 km", tag: "All Clear" },
      ...p,
    ]);
    setDraft("");
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nearby Drivers</Text>
          <View style={styles.subtitleRow}>
            <Radio size={11} color={theme.colors.leafAccent} />
            <Text style={styles.subtitleText}>WITHIN 5 KM · 4 ACTIVE</Text>
          </View>
        </View>
        <View style={styles.pinBadge}>
          <MapPin size={14} color={theme.colors.leafAccent} />
        </View>
      </View>

      <View style={styles.composeRow}>
        <Text style={styles.composeHandle}>GreenDart</Text>
        <Text style={styles.composeDivider}>|</Text>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={submit}
          placeholder="What's happening nearby?"
          placeholderTextColor={theme.colors.sageGray}
          style={styles.composeInput}
        />
        <Pressable
          onPress={submit}
          style={[styles.sendButton, { backgroundColor: draft.trim() ? theme.colors.trusteeGreen : "rgba(46,125,82,0.15)" }]}
        >
          <Send size={12} color={draft.trim() ? "#fff" : theme.colors.sageGray} />
        </Pressable>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: post }) => {
          const tc = tagColors[post.tag] ?? tagColors["All Clear"];
          return (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postAuthor}>
                  <View style={[styles.postAvatar, { backgroundColor: `${post.color}20` }]}>
                    <Text style={[styles.postAvatarText, { color: post.color }]}>{post.car[0]}</Text>
                  </View>
                  <Text style={[styles.postCar, { color: post.color }]}>{post.car}</Text>
                </View>
                <View style={[styles.postTag, { backgroundColor: tc.bg }]}>
                  <Text style={[styles.postTagText, { color: tc.text }]}>{post.tag}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postMetaRow}>
                <View style={styles.postMetaItem}>
                  <Clock size={10} color={theme.colors.sageGray} />
                  <Text style={styles.postMetaText}>{post.time}</Text>
                </View>
                <View style={styles.postMetaItem}>
                  <MapPin size={10} color={theme.colors.sageGray} />
                  <Text style={styles.postMetaText}>{post.dist}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.serif,
    fontSize: 20,
    color: theme.colors.charcoal,
    fontWeight: "400",
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  subtitleText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  pinBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,175,125,0.1)",
    borderWidth: 1,
    borderColor: "rgba(76,175,125,0.2)",
  },
  composeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.fieldBg,
    borderWidth: 1.5,
    borderColor: "rgba(46,125,82,0.2)",
  },
  composeHandle: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.trusteeGreen,
  },
  composeDivider: {
    color: "rgba(46,125,82,0.3)",
  },
  composeInput: {
    flex: 1,
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.charcoal,
    padding: 0,
  },
  sendButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  postCard: {
    borderRadius: theme.radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: theme.colors.cardBg,
    borderWidth: 1,
    borderColor: "rgba(46,125,82,0.12)",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  postAuthor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  postAvatarText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    fontWeight: "700",
  },
  postCar: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
  },
  postTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  postTagText: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
  },
  postText: {
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.charcoal,
    lineHeight: 19,
  },
  postMetaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  postMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postMetaText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
});
