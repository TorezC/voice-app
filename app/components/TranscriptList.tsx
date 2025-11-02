import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export const TranscriptList = ({ transcripts }: { transcripts: string[] }) => {
  return (
    <View style={{flex: 1}}>
        <FlatList
          data={transcripts}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  text: {
    fontSize: 15,
    color: '#222',
  },
})
