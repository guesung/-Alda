export const makeTTS = (message: string) => {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
};
