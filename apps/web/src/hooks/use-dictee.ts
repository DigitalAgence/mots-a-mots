import { useEffect, useState } from 'react';
import { emptyState, type SavedState, type Word, type Game, type Attempt } from '@/lib/dictee-types';
import { readProgress, writeProgress } from '@/lib/local-progress';

const normalize = (value: string) => value.normalize('NFC').trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ');
export function useDictee() {
  const [state, setState] = useState<SavedState>(emptyState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [feedback, setFeedback] = useState<Attempt | null>(null);
  useEffect(() => {
    readProgress().then(saved => {
      if (saved && Array.isArray(saved.results) && Array.isArray(saved.customWords) && Array.isArray(saved.errors)) setState(saved);
    }).catch(() => setStorageError('La sauvegarde sur cet appareil n’est pas disponible. Tu peux jouer, mais tes résultats risquent de ne pas être conservés.')).finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready) void writeProgress(state).catch(() => setStorageError('La sauvegarde locale a échoué. Vérifie l’espace disponible sur ton appareil.'));
  }, [state, ready]);
  function start(review = false) {
    const pool = review ? state.errors : state.customWords;
    if (!pool.length) return;
    const shuffled = [...pool];
    if (!review) for (let index = shuffled.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    const selected = shuffled;
    const game: Game = { words: selected, index: 0, lives: 3, score: 0, streak: 0, bestStreak: 0, attempts: [], finished: false, level: state.level, review };
    setFeedback(null);
    setState(current => ({ ...current, game }));
  }
  function check(answer: string) {
    const game = state.game;
    if (!game || game.finished || feedback || !answer.trim()) return;
    const word = game.words[game.index];
    const correct = normalize(answer) === normalize(word.text);
    const attempt = { word, answer: answer.trim(), correct };
    const streak = correct ? game.streak + 1 : 0;
    const next = { ...game, lives: game.lives - (correct ? 0 : 1), score: game.score + (correct ? 100 + Math.min(game.streak, 5) * 20 : 0), streak, bestStreak: Math.max(game.bestStreak, streak), attempts: [...game.attempts, attempt] };
    setFeedback(attempt);
    setState(current => ({ ...current, game: next, errors: correct ? current.errors.filter(item => normalize(item.text) !== normalize(word.text)) : [...current.errors.filter(item => normalize(item.text) !== normalize(word.text)), word] }));
  }
  function next() {
    const game = state.game;
    if (!game || !feedback) return;
    setFeedback(null);
    if (game.index + 1 >= game.words.length) {
      const result = { id: crypto.randomUUID(), date: new Date().toISOString(), score: game.score, correct: game.attempts.filter(item => item.correct).length, total: game.attempts.length, bestStreak: game.bestStreak, level: game.level, attempts: game.attempts };
      setState(current => ({ ...current, game: { ...game, finished: true }, results: [result, ...current.results].slice(0, 200) }));
    } else setState(current => ({ ...current, game: { ...game, index: game.index + 1 } }));
  }
  function addWord(text: string) {
    const trimmed = text.trim().normalize('NFC');
    if (!trimmed || state.customWords.some(word => normalize(word.text) === normalize(trimmed))) return false;
    const word: Word = { id: crypto.randomUUID(), text: trimmed, level: 'facile', tip: 'Observe bien les lettres et les accents de ce mot.' };
    setState(current => ({ ...current, customWords: [...current.customWords, word] }));
    return true;
  }
  // A checked answer is persisted with its attempt, so restore feedback after reopening.
  useEffect(() => {
    if (state.game && !state.game.finished && state.game.attempts.length > state.game.index) setFeedback(state.game.attempts[state.game.index]);
  }, [state.game]);
  return { state, setState, ready, storageError, feedback, start, check, next, addWord };
}
export type DicteeController = ReturnType<typeof useDictee>;
