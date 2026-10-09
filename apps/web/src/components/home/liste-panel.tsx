import { BookOpen, Trash2, Volume2 } from 'lucide-react';
import type { View } from '@/lib/dictee-types';
import type { DicteeController } from '@/hooks/use-dictee';
import { useSpeech } from '@/hooks/use-speech';
import { ProgressPanel } from '@/components/home/progress-panel';

export function ListePanel({ controller, onView }: { controller: DicteeController; onView: (view: View) => void }) {
	const speech = useSpeech();
	const words = controller.state.customWords;

	return (
		<section className="dict-card" aria-label="Liste des mots">
			<div className="section-header">
				<div className="section-icon" aria-hidden="true"><BookOpen size={24} /></div>
				<div>
					<h2>Mes mots</h2>
					<p>{words.length} mot(s) enregistré(s)</p>
				</div>
			</div>

			{!words.length ? (
				<div className="empty">
					<div className="empty-icon" aria-hidden="true">📖</div>
					<h3>Aucun mot pour le moment</h3>
					<p>Ajoute tes premiers mots pour commencer.</p>
					<button className="btn primary" type="button" onClick={() => onView('mots')}>Ajouter un mot</button>
				</div>
			) : (
				<div className="word-list">
					{words.map((word, index) => (
						<div className="word-item" key={word.id}>
							<span className="word-number">{index + 1}</span>
							<strong>{word.text}</strong>
							<div className="word-actions">
								<button className="listen-small" aria-label={`Écouter le mot ${word.text}`} onClick={() => speech.speak(word.text)}><Volume2 size={16} /></button>
								<button className="delete-word" aria-label={`Supprimer le mot ${word.text}`} onClick={() => controller.setState(current => ({ ...current, customWords: current.customWords.filter(item => item.id !== word.id), errors: current.errors.filter(item => item.id !== word.id) }))}><Trash2 size={16} /></button>
							</div>
						</div>
					))}
				</div>
			)}
			{speech.error && <p role="alert" className="error-message">{speech.error}</p>}
			<ProgressPanel controller={controller} onView={onView} />
		</section>
	);
}
