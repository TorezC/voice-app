import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const ClarificationBanner = ({ prompt }: { prompt: string }) => (
  <View style={styles.banner}>
    <Text style={styles.text}>{prompt}</Text>
  </View>
)

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  text: { color: '#856404' },
})
