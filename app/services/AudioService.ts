import * as FileSystem from 'expo-file-system'
import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder
} from 'expo-audio'


export class AudioService {
    private recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

// Request permission
    async requestPermission(): Promise<boolean> {
        const { granted } = await AudioModule.requestRecordingPermissionsAsync();
        return granted
    }

    // Start recordinngg
    async startRecording() {
        await this.cleanupOldFiles()
        const permission = await this.requestPermission()
        if (!permission) throw new Error('Permission denied')

        // Create and start the recorder
        await setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
        })
        await this.recorder.prepareToRecordAsync();
        this.recorder.record()
    }

    async stopRecording(): Promise<any> {
        try {
            if (!this.recorder) throw new Error('No recording in progress')
            return await this.recorder.stop()
        } catch (e) {
            throw new Error('No recording in progress' + e)
        }
    }

    // Clean
    async cleanupOldFiles() {
        const cacheDir = FileSystem.Paths.cache
        if (!cacheDir) return

        try {
            const entries = cacheDir.list() 
            for (const entry of entries) {
                if (entry.name.endsWith('.m4a') || entry.name.endsWith('.caf')) {
                    entry.delete() 
                }
            }
        } catch (error) {
            console.error('Error cleaning old files:', error)
        }
    }

}
