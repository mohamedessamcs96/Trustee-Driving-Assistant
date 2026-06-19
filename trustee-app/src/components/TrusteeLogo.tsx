import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

export function TrusteeLogo({ size = 'md' }: Props) {
  const fontSize = size === 'lg' ? 32 : size === 'md' ? 22 : 16;
  const dotSize = size === 'lg' ? 20 : size === 'md' ? 14 : 10;
  const dotTop = size === 'lg' ? -12 : size === 'md' ? -8 : -6;

  return (
    <View style={styles.row}>
      <View style={styles.relative}>
        <Text style={[styles.dot, { fontSize: dotSize, top: dotTop }]}>·</Text>
        <Text style={[styles.tGreen, { fontSize }]}>t</Text>
      </View>
      <Text style={[styles.rustee, { fontSize }]}>rustee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  relative: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    color: colors.gold,
    fontWeight: 'bold',
    lineHeight: 14,
    left: 1,
    zIndex: 1,
  },
  tGreen: {
    fontFamily: 'Georgia',
    color: colors.leaf,
    fontWeight: '400',
    lineHeight: undefined,
  },
  rustee: {
    fontFamily: 'Georgia',
    color: colors.textLight,
    fontWeight: '400',
    lineHeight: undefined,
  },
});
