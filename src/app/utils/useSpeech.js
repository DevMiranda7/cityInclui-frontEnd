export function speakText(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const speechEnabled = localStorage.getItem("speechEnabled");
  if (speechEnabled === "false") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 1;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

let lastInteractionByKeyboard = false;

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") lastInteractionByKeyboard = true;
  });
  window.addEventListener("mousedown", () => {
    lastInteractionByKeyboard = false;
  });
}

export function handleFocusWithKeyboard(text) {
  if (lastInteractionByKeyboard) {
    speakText(text);
  }
}
