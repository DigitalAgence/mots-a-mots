import { useState } from 'react';
import { FilePenLine, Plus } from 'lucide-react';
import type { DicteeController } from '@/hooks/use-dictee';

export function WordsPanel({ controller }: { controller: DicteeController }) {
	const [text, setText] = useState('');
	const [message, setMessage] = useState('');

	return (
		<section className="dict-card" aria-label="Ajouter un mot">
			<div className="section-header">
				<div className="section-icon" aria-hidden="true"><FilePenLine size={24} /></div>
				<div>
					<h2>Ajouter un mot</h2>
					<p>Ajoute les mots que tu veux apprendre.</p>
				</div>
			</div>

			<form
				className="add-box"
				onSubmit={event => {
					event.preventDefault();
					if (controller.addWord(text)) {
						setText('');
						setMessage('Ton mot a été ajouté.');
					} else setMessage('Ce mot existe déjà ou le champ est vide.');
				}}
			>
				<label htmlFor="new-word">Nouveau mot</label>
				<input id="new-word" placeholder="Exemple : extraordinaire" value={text} onChange={event => setText(event.target.value)} maxLength={50} required autoComplete="off" autoCapitalize="sentences" />
				<button className="btn primary full" type="submit"><Plus size={16} strokeWidth={2.6} /> Ajouter le mot</button>
				<p className="message" role="status">{message}</p>
			</form>

			<div className="tip">💡 <strong>Astuce :</strong> commence par le mode avec mot apparent, puis passe au mode sans aide.</div>
		</section>
	);
}
