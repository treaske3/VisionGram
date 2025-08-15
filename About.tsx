import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function About() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>About VisionGram</Text>
      <Text style={styles.p}>
        VisionGram creates short, ultra-realistic video greetings from your prompts.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}>
        <Text style={styles.link}>Rate on the App Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  p: { color: '#444', marginBottom: 16 },
  link: { color: '#22c55e' }
});
