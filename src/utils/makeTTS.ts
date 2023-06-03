export const makeTTS = (message: string) => {
  const tts = new SpeechSynthesisUtterance(message);
  tts.lang = "ko-KR";
  tts.pitch = 1;
  tts.rate = 0.8;
  window.speechSynthesis.speak(tts);
};
