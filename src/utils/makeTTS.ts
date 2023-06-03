export class TTS {
  message: string;
  isPlaying: boolean;
  constructor(message: string) {
    this.message = message;
    this.isPlaying = false;
  }
  play() {
    const tts = new SpeechSynthesisUtterance(this.message);
    tts.lang = "ko-KR";
    tts.pitch = 1;
    tts.rate = 0.8;
    window.speechSynthesis.speak(tts);
    window.speechSynthesis.resume();
    this.isPlaying = true;
  }
  stop() {
    window.speechSynthesis.pause();
    this.isPlaying = false;
  }
}

export const makeTTS = (message: string) => {
  const tts = new SpeechSynthesisUtterance(message);
  tts.lang = "ko-KR";
  tts.pitch = 1;
  tts.rate = 0.8;
  window.speechSynthesis.speak(tts);
};
