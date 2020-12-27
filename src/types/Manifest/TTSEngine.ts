declare namespace chromeExtension {
  export interface TTSEngine {
    voices?: Voice[];
  }

  export interface Voice {
    voice_name: string;
    lang: string;
    event_types?: EventType[];
  }

  type EventType =
    /**
   *
    The engine has started speaking the utterance.
   */
    | 'start'
    /**
     * A word boundary was reached. Use `event.charIndex` to
     * determine the current speech position.
     */
    | 'word'
    /**
     * A sentence boundary was reached. Use `event.charIndex` to
     * determine the current speech position.
     */
    | 'sentence'
    /**
     * An SSML marker was reached. Use `event.charIndex` to
     * determine the current speech position.
     */
    | 'marker'
    /**
     * The engine has finished speaking the utterance.
     */
    | 'end'
    /**
     * An engine-specific error occurred and this utterance cannot be spoken.
     * Pass more information in event.errorMessage.
     */
    | 'error';
}
