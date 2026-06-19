import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme';

const articles = [
  {
    id: 1, tag: 'Feature Launch', tagIcon: 'zap' as const, tagColor: '#C49B0A',
    title: 'Morning Mode v2.0: Tasks now sync with Google Calendar',
    excerpt: 'Your voice-captured reminders now flow directly into your calendar so nothing slips through after you arrive.',
    date: 'Jun 4, 2026', read: '2 min',
  },
  {
    id: 2, tag: 'Safety', tagIcon: 'shield' as const, tagColor: '#2E7D52',
    title: "How Trustee's pedestrian detection was trained on 40M road hours",
    excerpt: "A look inside the on-device model that predicts crossing intent before a single foot leaves the kerb.",
    date: 'May 28, 2026', read: '5 min',
  },
  {
    id: 3, tag: 'Update', tagIcon: 'star' as const, tagColor: '#6B8C7E',
    title: 'Traffic sign database now covers 34 European countries',
    excerpt: 'Version 3.8 ships with 2,400 new sign variants and improved OCR for partially obscured signs.',
    date: 'May 19, 2026', read: '3 min',
  },
  {
    id: 4, tag: 'Safety', tagIcon: 'shield' as const, tagColor: '#2E7D52',
    title: '5 habits that Trustee data shows make the biggest difference',
    excerpt: 'Analysis of 1.2M driving sessions surfaces the behaviours strongly correlated with zero-incident months.',
    date: 'May 12, 2026', read: '6 min',
  },
];

export function NewsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ṫrustee News</Text>
          <Text style={styles.subtitle}>Official updates & road safety</Text>
        </View>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>4 NEW</Text>
        </View>
      </View>

      {/* Featured card */}
      <View style={styles.featured}>
        <View style={styles.featuredHero}>
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 340 80">
            <Circle cx="300" cy="10" r="80" fill="#4CAF7D" opacity={0.1} />
          </Svg>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>★ Featured</Text>
          </View>
        </View>
        <View style={styles.featuredBody}>
          <Text style={styles.featuredTitle}>{articles[0].title}</Text>
          <Text style={styles.featuredExcerpt}>{articles[0].excerpt}</Text>
          <View style={styles.featuredMeta}>
            <Text style={styles.metaDate}>{articles[0].date} · {articles[0].read} read</Text>
            <Feather name="chevron-right" size={14} color={colors.leaf} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {articles.slice(1).map(a => (
          <TouchableOpacity key={a.id} style={styles.articleCard} activeOpacity={0.7}>
            <View style={{ flex: 1 }}>
              <View style={styles.tagRow}>
                <Feather name={a.tagIcon} size={10} color={a.tagColor} />
                <Text style={[styles.tagText, { color: a.tagColor }]}>{a.tag}</Text>
              </View>
              <Text style={styles.articleTitle}>{a.title}</Text>
              <Text style={styles.articleExcerpt}>{a.excerpt}</Text>
              <Text style={styles.articleDate}>{a.date} · {a.read} read</Text>
            </View>
            <Feather name="chevron-right" size={14} color={colors.sage} style={{ marginTop: 4 }} />
          </TouchableOpacity>
        ))}
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
    alignItems: 'flex-end',
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
  subtitle: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: 'rgba(46,125,82,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  newBadgeText: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: colors.forest,
  },
  featured: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1A4731',
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.3)',
  },
  featuredHero: {
    height: 72,
    backgroundColor: '#0F2C1A',
    overflow: 'hidden',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 14,
    backgroundColor: 'rgba(245,200,66,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(245,200,66,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  featuredBadgeText: {
    fontFamily: 'System',
    fontSize: 10,
    color: '#F5C842',
  },
  featuredBody: {
    padding: 14,
  },
  featuredTitle: {
    fontFamily: 'Georgia',
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  featuredExcerpt: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
    marginTop: 4,
    lineHeight: 17,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  metaDate: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    gap: 10,
    paddingBottom: 8,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(46,125,82,0.1)',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: 'System',
    fontSize: 10,
  },
  articleTitle: {
    fontFamily: 'Georgia',
    fontSize: 13,
    color: colors.charcoal,
    lineHeight: 18,
  },
  articleExcerpt: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
    marginTop: 3,
    lineHeight: 16,
  },
  articleDate: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: colors.sage,
    marginTop: 4,
  },
});
