import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

const initialPosts = [
  {
    id: 1, car: 'SilverWren', color: '#2E7D52', time: '2 min ago',
    text: 'Jam on Ring 2, avoid Schönhauser Allee. Adding ~12 min.',
    dist: '1.2 km', tag: 'Congestion',
  },
  {
    id: 2, car: 'BluePine', color: '#F5C842', time: '7 min ago',
    text: 'Road works past Tempelhof exit — left lane closed, merge right early.',
    dist: '2.8 km', tag: 'Road Works',
  },
  {
    id: 3, car: 'IronMoss', color: '#6B8C7E', time: '11 min ago',
    text: 'Police checkpoint on A100 southbound just before Kreuz Schöneberg.',
    dist: '3.4 km', tag: 'Police',
  },
  {
    id: 4, car: 'DawnReed', color: '#4CAF7D', time: '18 min ago',
    text: 'Clear run on the city ring right now if you need to loop west. No queues.',
    dist: '4.1 km', tag: 'All Clear',
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Congestion: { bg: 'rgba(232,69,69,0.1)', text: '#E84545' },
  'Road Works': { bg: 'rgba(245,200,66,0.12)', text: '#C49B0A' },
  Police: { bg: 'rgba(107,140,126,0.12)', text: '#6B8C7E' },
  'All Clear': { bg: 'rgba(76,175,125,0.1)', text: '#2E7D52' },
};

export function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState('');

  const submit = () => {
    if (!draft.trim()) return;
    setPosts(p => [
      {
        id: Date.now(), car: 'GreenDart', color: '#2E7D52',
        time: 'just now', text: draft, dist: '0 km', tag: 'All Clear',
      },
      ...p,
    ]);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nearby Drivers</Text>
          <View style={styles.subtitleRow}>
            <Feather name="radio" size={11} color={colors.leaf} />
            <Text style={styles.subtitle}>WITHIN 5 KM · 4 ACTIVE</Text>
          </View>
        </View>
        <View style={styles.pinBtn}>
          <Feather name="map-pin" size={14} color={colors.leaf} />
        </View>
      </View>

      {/* Compose */}
      <View style={styles.compose}>
        <Text style={styles.composeHandle}>GreenDart</Text>
        <Text style={styles.composeSep}>|</Text>
        <TextInput
          style={styles.composeInput}
          value={draft}
          onChangeText={setDraft}
          placeholder="What's happening nearby?"
          placeholderTextColor={colors.sage}
          onSubmitEditing={submit}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={submit}
          style={[
            styles.sendBtn,
            { backgroundColor: draft.trim() ? colors.forest : 'rgba(46,125,82,0.15)' },
          ]}
        >
          <Feather name="send" size={12} color={draft.trim() ? '#fff' : colors.sage} />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {posts.map(post => {
          const tc = tagColors[post.tag] ?? tagColors['All Clear'];
          return (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postAuthorRow}>
                  <View style={[styles.avatar, { backgroundColor: `${post.color}20` }]}>
                    <Text style={[styles.avatarText, { color: post.color }]}>{post.car[0]}</Text>
                  </View>
                  <Text style={[styles.carName, { color: post.color }]}>{post.car}</Text>
                </View>
                <View style={[styles.tagBadge, { backgroundColor: tc.bg }]}>
                  <Text style={[styles.tagText, { color: tc.text }]}>{post.tag}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postMeta}>
                <View style={styles.metaItem}>
                  <Feather name="clock" size={10} color={colors.sage} />
                  <Text style={styles.metaText}>{post.time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="map-pin" size={10} color={colors.sage} />
                  <Text style={styles.metaText}>{post.dist}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: colors.charcoal,
    fontWeight: '400',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  subtitle: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
  },
  pinBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(76,175,125,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,125,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compose: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.bgLight,
    borderWidth: 1.5,
    borderColor: 'rgba(46,125,82,0.2)',
    gap: 8,
  },
  composeHandle: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: colors.forest,
  },
  composeSep: {
    color: 'rgba(46,125,82,0.3)',
    fontSize: 14,
  },
  composeInput: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 13,
    color: colors.charcoal,
    padding: 0,
  },
  sendBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    flex: 1,
    paddingHorizontal: 16,
  },
  feedContent: {
    gap: 10,
    paddingBottom: 8,
  },
  postCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.12)',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  postAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Courier',
    fontSize: 10,
    fontWeight: '700',
  },
  carName: {
    fontFamily: 'Courier',
    fontSize: 11,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tagText: {
    fontFamily: 'System',
    fontSize: 10,
  },
  postText: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.charcoal,
    lineHeight: 19,
  },
  postMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
  },
});
