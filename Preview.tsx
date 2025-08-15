import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function Preview({ route }: any) {
  const { frames = [], prompt = '' } = route.params || {};
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>Preview Frames (static)</Text>
      <Text style={styles.subtitle}>Prompt: {prompt}</Text>
      {frames.length === 0 ? (
        <Text>No frames yet (server placeholder).</Text>
      ) : (
        frames.map((src: string, idx: number) => (
          <Image key={idx} source={{ uri: src }} style={styles.frame} />
        ))
      )}
      <Text style={styles.note}>Note: Final purchased video will be higher quality with audio.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 10 },
  note: { fontSize: 12, color: '#666', marginTop: 12 },
  frame: { width: '100%', height: 240, borderRadius: 12, marginBottom: 12, backgroundColor: '#eee' }
});
