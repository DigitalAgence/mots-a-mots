import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Brain, Check, Eye, Headphones, Plus, RotateCcw, Star, Volume2 } from 'lucide-react';
import { useSpeech } from '@/hooks/use-speech';
import type { DicteeController } from '@/hooks/use-dictee';
import type { View } from '@/lib/dictee-types';

export function GamePanel({ controller, onView }: { controller: DicteeController; onView: (view: View) => void }) {
	const { state, ready, feedback, check, next, start } = controller;
	const game = state.game;
	const speech = useSpeech();
	const [answer, setAnswer] = useState('');
	const [reveal, setReveal] = useState(true);
	const [playing, setPlaying] = useState(false);
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => { setAnswer(''); }, [game?.index, game?.words]);
	useEffect(() => { if (feedback) setAnswer(feedback.answer); }, [feedback]);

	const word = game?.words[game.index];
	const total = game?.words.length ?? 0;
	const finished = Boolean(game?.finished);
	const correctCount = game?.attempts.filter(item => item.correct).length ?? 0;

	// En mode « sans mot apparent », le mot se prononce automatiquement dès qu'il apparaît.
	useEffect(() => {
		if (!playing || reveal || !word || feedback || !speech.supported) return;
		speech.speak(word.text);
		// speech est recréé à chaque rendu ; on ne le dépend pas pour éviter les boucles.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game?.index, playing, reveal, feedback]);

	function begin(visible: boolean) {
		if (!state.customWords.length) return;
		setReveal(visible);
		setPlaying(true);
		window.speechSynthesis?.cancel();
		start();
	}

	if (!playing || !game) {
		return (
			<section className="dict-card" aria-label="Choisir un mode de dictée">
				<div className="section-header centered">
					<div className="section-icon" aria-hidden="true"><Headphones size={24} /></div>
					<h2>Choisis ton mode de dictée</h2>
					<p>Apprends d’abord, puis teste ta mémoire.</p>
				</div>
				{!state.customWords.length ? (
					<div className="empty">
						<h3>Ajoute tes mots !</h3>
						<p>Tu n’as pas encore de mots. Ajoute-les, puis reviens jouer.</p>
						<button className="btn primary" type="button" onClick={() => onView('mots')}><Plus size={16} /> Ajouter mes mots</button>
					</div>
				) : (
					<div className="mode-grid">
						<button type="button" className="mode-card" disabled={!ready} onClick={() => begin(true)}>
							<div className="mode-icon" aria-hidden="true"><Eye size={26} /></div>
							<div className="mode-content">
								<h3>Avec mot apparent</h3>
								<p>Le mot reste visible pendant l’écoute. Idéal pour mémoriser.</p>
								<span>⭐ Niveau apprentissage</span>
							</div>
							<b className="arrow">→</b>
						</button>
						<button type="button" className="mode-card" disabled={!ready} onClick={() => begin(false)}>
							<div className="mode-icon" aria-hidden="true"><Brain size={26} /></div>
							<div className="mode-content">
								<h3>Sans mot apparent</h3>
								<p>Écoute seulement le mot et écris-le de mémoire.</p>
								<span>🏆 Niveau défi</span>
							</div>
							<b className="arrow">→</b>
						</button>
					</div>
				)}
			</section>
		);
	}

	if (finished) {
		const correct = game.attempts.filter(item => item.correct).length;
		const percent = game.attempts.length ? Math.round((correct / game.attempts.length) * 100) : 0;
		return (
			<section className="dict-card result" aria-label="Résultat">
				<div className="result-icon" aria-hidden="true">🎉</div>
				<h2>Bien joué !</h2>
				<p className="result-mode">{reveal ? 'Mode avec mot apparent' : 'Mode sans aide'}</p>
				<div className="final-score">{percent}<span>%</span></div>
				<p className="percentage">{correct} / {game.attempts.length} mots</p>
				<div className="result-actions">
					<button className="btn primary" type="button" onClick={() => { setPlaying(false); }}><RotateCcw size={16} /> Nouvelle dictée</button>
					{state.errors.length > 0 && <button className="btn secondary" type="button" onClick={() => { start(true); setReveal(false); }}>Rejouer mes erreurs</button>}
				</div>
			</section>
		);
	}

	return (
		<section className="dict-card game" aria-label="Ta dictée">
			<div className="game-top">
				<button type="button" className="back-button" onClick={() => { window.speechSynthesis?.cancel(); setPlaying(false); }}><ArrowLeft size={16} /> Changer de mode</button>
				<div className="score"><Star size={16} /> {correctCount}</div>
			</div>
			<p className="game-mode-title">{reveal ? 'Avec mot apparent' : 'Sans mot apparent'}</p>
			<div className="progress-info"><span>Mot {game.index + 1}</span><span>/ {total}</span></div>
			<div className="progress" role="progressbar" aria-valuenow={game.attempts.length} aria-valuemin={0} aria-valuemax={total}><div className="progress-bar" style={{ width: `${total ? (game.attempts.length / total) * 100 : 0}%` }} /></div>
			<div className="listen" aria-hidden="true">🎧</div>
			{reveal && word && <div className="visible-word">{word.text}</div>}
			<p className="mode-help">{speech.speaking ? 'Écoute bien…' : 'Écoute le mot, puis écris-le.'}</p>
			<button className="btn listen-button" type="button" disabled={!word || !speech.supported} onClick={() => word && speech.speak(word.text)}><Volume2 size={18} /> Écouter</button>
			<button className="btn secondary full" type="button" disabled={!word || !speech.supported} onClick={() => word && speech.speak(word.text, true)}>Répéter lentement</button>
			{(!speech.supported || speech.error) && <p className="error-message" role="alert">{speech.error || 'La synthèse vocale n’est pas disponible dans ce navigateur.'}</p>}
			<form className="answer-container" onSubmit={event => { event.preventDefault(); if (feedback) { next(); input.current?.focus(); } else check(answer); }}>
				<label className="sr-only" htmlFor="word-answer">Écris le mot</label>
				<input ref={input} id="word-answer" className="answer-input" type="text" placeholder="Écris le mot…" value={answer} onChange={event => setAnswer(event.target.value)} disabled={!word || Boolean(feedback)} autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} maxLength={100} />
				{feedback && <div className={feedback.correct ? 'feedback correct' : 'feedback wrong'} role="status"><span className="feedback-star" aria-hidden="true"><Star size={34} fill="currentColor" strokeWidth={0} /></span><strong>{feedback.correct ? 'Bravo !' : 'Presque…'}</strong>{!feedback.correct && <p className="correct-word">Le bon mot : <strong>{feedback.word.text}</strong></p>}</div>}
				<button type="submit" className="btn primary check-button" disabled={!feedback && !answer.trim()}>{feedback ? 'Mot suivant' : 'Vérifier'} {feedback ? <ArrowRight size={16} /> : <Check size={16} />}</button>
			</form>
		</section>
	);
}
