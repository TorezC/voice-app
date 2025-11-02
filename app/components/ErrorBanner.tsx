import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const ErrorBanner = ({ message }: { message: string }) => (
  <View style={styles.banner}>
    <Text style={styles.text}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F8D7DA',
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  text: { color: '#721C24' },
})
