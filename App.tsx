import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AudioService } from './app/services/AudioService'
import { StubVoiceApi } from './app/services/VoiceApi'
import { ClarificationBanner } from './app/components/ClarificationBanner'
import { ErrorBanner } from './app/components/ErrorBanner'
import { TranscriptList } from './app/components/TranscriptList'
import { PTTButton } from './app/components/PTTButton'
import { Overlay } from './app/components/Overlay'
import { useAudioPlayer } from 'expo-audio'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const audioSourceOne = require('./assets/audiofile1.mp3')
const audioSourceTwo = require('./assets/audiofile2.mp3')

type State = 'idle' | 'listening' | 'processing'
type Scenario = 'success' | 'clarify' | 'networkError' | 'serverError'

export default function App() {
  const [state, setState] = useState<State>('idle')
  const [transcripts, setTranscripts] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [clarification, setClarification] = useState<string | null>(null)
  const [scenario, setScenario] = useState<Scenario>('success')
  const audio = useRef(new AudioService()).current

  const playerOne = useAudioPlayer(audioSourceOne)
  const playerTwo = useAudioPlayer(audioSourceTwo)
  const [nextAudioIndex, setNextAudioIndex] = useState(0)

  // Cancel ref
  const cancelledRef = useRef(false)

  // Handles recording listening to the user
  const handlePressIn = async () => {
    setError(null)
    setState('listening')
    cancelledRef.current = false
    try {
      await audio.startRecording()
    } catch (e: any) {
      setError('Microphone permission denied.')
      setState('idle')
    }
  }

  // Handles stop recording and start processing
  const handlePressOut = async () => {
    if (state !== 'listening') return
    setState('processing')
    try {
      const uri = await audio.stopRecording()
      const result = await new StubVoiceApi({ scenario }).processVoice({
        audioUri: uri,
        mimeType: 'audio/m4a',
        clientTs: new Date().toISOString(),
      })

      // Don't continue if cancelled
      if (cancelledRef.current) {
        console.log('Recording cancelled — skipping transcript update.')
        setState('idle')
        return
      }

      if (result.kind === 'ok') {
        setTranscripts(prev => [...prev, result.transcript])
        setClarification(null)

        if (nextAudioIndex === 0) {
          playerOne.pause()
          playerOne.seekTo(0)
          playerOne.play()
          setNextAudioIndex(1)
        } else {
          playerTwo.pause()
          playerTwo.seekTo(0)
          playerTwo.play()
          setNextAudioIndex(0)
        }

        setState('idle')
      } else if (result.kind === 'clarification') {
        setClarification(result.prompt)
        setState('idle')
      }
    } catch (err: any) {
      if (!cancelledRef.current) {
        console.log('err', err)
        setError(err.message)
      }
      setState('idle')
    }
  }

  // Handles if the user cancels
  const handleCancel = () => {
    cancelledRef.current = true; 
    setState('idle')
    setClarification(null)
    setError(null)
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, paddingVertical: 50, padding: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Press-To-Talk</Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Text style={{ marginRight: 8 }}>Simulate:</Text>
            {(['success', 'clarify', 'networkError', 'serverError'] as Scenario[]).map(m => (
              <TouchableOpacity
                key={m}
                onPress={() => setScenario(m)}
                style={[
                  {
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    margin: 4,
                  },
                  scenario === m && { backgroundColor: '#273c75', borderColor: '#273c75' },
                ]}
              >
                <Text style={{ color: scenario === m ? 'white' : 'black' }}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {clarification && <ClarificationBanner prompt={clarification} />}
          {error && <ErrorBanner message={error} />}

          <TranscriptList transcripts={transcripts} />

          <PTTButton
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={state !== 'idle'}
          />
        </View>
      </View>

      {(state === 'listening' || state === 'processing') && (
        <Overlay state={state} onCancel={handleCancel} />
      )}
    </SafeAreaProvider>
  )
}
