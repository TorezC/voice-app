import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'

interface Props {
  state: 'listening' | 'processing'
  onCancel?: () => void
}

export const Overlay: React.FC<Props> = ({ state, onCancel }) => (
  <View style={styles.overlay}>
    {state === 'listening' ? (
      <>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Listening...</Text>
      </>
    ) : (
      <>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Processing...</Text>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
)

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: 'white', marginTop: 8 },
  cancel: { color: '#FF5C5C', marginTop: 16, fontWeight: 'bold' },
})
