import { useEffect, useRef, useState } from 'react';

export function useSpeech() {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const voicesReady = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length) {
        voicesReady.current = true;
        setVoices(list);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    // Some browsers populate voices slightly after load — retry once.
    const retry = window.setTimeout(loadVoices, 350);
    return () => {
      window.clearTimeout(retry);
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  function speak(text: string, slow = false) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('La lecture vocale n’est pas disponible dans ce navigateur. Essaie Safari, Chrome ou Edge.');
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    // Chrome pauses the queue after ~15s; resume guards long words & slow mode.
    try { synth.resume(); } catch { /* ignore */ }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = slow ? 0.35 : 0.85;
    utterance.pitch = 1;

    const list = voicesReady.current ? voices : synth.getVoices();
    const french = list.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith('fr'));
    utterance.voice = french.find(voice => voice.localService) ?? french[0] ?? null;

    setError('');
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = event => {
      setSpeaking(false);
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        setError('Lecture impossible. Vérifie le son et la présence d’une voix française dans les réglages de ton appareil. Hors connexion, une voix locale est nécessaire.');
      }
    };
    synth.speak(utterance);
  }

  return { supported, speaking, error, speak };
}
