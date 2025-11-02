export type ProcessVoiceInput = {
  audioUri: string
  mimeType: string
  clientTs: string
  context?: Record<string, unknown>
}

export type ProcessVoiceResult =
  | { kind: 'ok'; transcript: string }
  | { kind: 'clarification'; prompt: string }

export type ProcessVoiceError = {
  kind: 'error'
  code: 'NETWORK' | 'SERVER'
  message: string
}

export interface VoiceApi {
  processVoice(input: ProcessVoiceInput): Promise<ProcessVoiceResult>
}

export class StubVoiceApi implements VoiceApi {
  constructor(
    private opts?: {
      delayMs?: number
      scenario?: 'success' | 'clarify' | 'networkError' | 'serverError'
    }
  ) {}

  async processVoice(input: ProcessVoiceInput): Promise<ProcessVoiceResult> {
    const delay = this.opts?.delayMs ?? 1000
    await new Promise((r) => setTimeout(r, delay))

    switch (this.opts?.scenario) {
      case 'clarify':
        return { kind: 'clarification', prompt: 'What time should I set it for?' }
      case 'networkError':
        throw { kind: 'error', code: 'NETWORK', message: 'Network error. Please try again.' }
      case 'serverError':
        throw { kind: 'error', code: 'SERVER', message: 'Something went wrong. Please try again.' }
      case 'success':
      default:
        return { kind: 'ok', transcript: "Added ‘milk’ to your shopping list." }
    }
  }
}
