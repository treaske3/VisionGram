import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { apiPost } from '../lib/api';

export default function Home({ navigation }: any) {
  const [prompt, setPrompt] = useState('in shape man on the beach in a tropical location holding a birthday cake');
  const [loading, setLoading] = useState(false);

  async function getPreview() {
    try {
      setLoading(true);
      const r = await apiPost('/preview', { prompt });
      navigation.navigate('Preview', { frames: r.frames || [], prompt });
    } catch (e:any) {
      Alert.alert('Error', e?.message || 'Preview failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.brand}>◼︎ VisionGram</Text>
      <Text style={styles.tip}>Tip: The more detail in your prompt, the better the results.</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your greeting..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        maxLength={240}
      />
      <Text style={styles.counter}>{prompt.length}/240</Text>
      <Button title={loading ? 'Generating...' : 'Generate Preview'} onPress={getPreview} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Help')} style={{marginTop: 20}}>
        <Text style={{color: '#22c55e'}}>Help & FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')} style={{marginTop: 10}}>
        <Text style={{color: '#22c55e'}}>About VisionGram</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  brand: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  tip: { fontSize: 14, marginBottom: 12, color: '#666' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 100, marginBottom: 6 },
  counter: { alignSelf: 'flex-end', color: '#999', marginBottom: 12 }
});
