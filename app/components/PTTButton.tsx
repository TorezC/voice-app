import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface Props {
  onPressIn: () => void
  onPressOut: () => void
  disabled?: boolean
}

export const PTTButton: React.FC<Props> = ({ onPressIn, onPressOut, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && { opacity: 0.6 }]}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    disabled={disabled}
    accessibilityLabel="Press and hold to talk"
  >
    <Text style={styles.text}> Hold to Talk</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: { color: '#fff', fontWeight: 'bold' },
})
