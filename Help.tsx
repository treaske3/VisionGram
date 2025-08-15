import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Help() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Help & FAQ</Text>
      <Text style={styles.q}>How do I get better results?</Text>
      <Text style={styles.a}>Be specific: include people/objects, setting, action, mood, and colors.</Text>
      <Text style={styles.q}>Why are previews images?</Text>
      <Text style={styles.a}>To minimize costs. Final purchased videos are full quality with audio.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  q: { fontWeight: '600', marginTop: 8 },
  a: { color: '#444' }
});
