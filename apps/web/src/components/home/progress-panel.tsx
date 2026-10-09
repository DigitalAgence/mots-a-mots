import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { View } from '@/lib/dictee-types';
import type { DicteeController } from '@/hooks/use-dictee';

export function ProgressPanel({ controller, onView }: { controller: DicteeController; onView: (view: View) => void }) {
	const { results } = controller.state;
	const total = results.reduce((sum, result) => sum + result.total, 0);
	const correct = results.reduce((sum, result) => sum + result.correct, 0);

	function deleteResult(id: string) {
		controller.setState(current => ({ ...current, results: current.results.filter(item => item.id !== id) }));
	}

	if (!results.length) return null;
	return (
		<div className="history-block">
			<div className="history-heading"><h3>Tes dictées</h3><span>{correct}/{total || 0}</span></div>
			<div className="history-list">
				<AnimatePresence initial={false}>
					{results.slice(0, 8).map((result, index) => (
						<motion.details
							key={result.id}
							layout
							initial={{ opacity: 0, y: 12, height: 0 }}
							animate={{ opacity: 1, y: 0, height: 'auto' }}
							exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
							transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.03 }}
						>
							<summary>
								<strong>{new Date(result.date).toLocaleDateString('fr-FR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' })}</strong>
								<span>{result.correct}/{result.total}</span>
								<strong>{result.total ? Math.round((result.correct / result.total) * 100) : 0}%</strong>
								<button
									type="button"
									className="delete-dictee"
									aria-label="Supprimer cette dictée"
									onClick={event => { event.preventDefault(); event.stopPropagation(); deleteResult(result.id); }}
								>
									<Trash2 size={15} />
								</button>
							</summary>
							<motion.ul
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
							>
								{result.attempts.map((attempt, i) => (
									<li key={`${result.id}-${i}`}>
										<span className={attempt.correct ? 'result-good' : 'result-bad'}>{attempt.correct ? 'Correct' : 'À revoir'}</span>
										<strong>{attempt.word.text}</strong>
									</li>
								))}
							</motion.ul>
						</motion.details>
					))}
				</AnimatePresence>
			</div>
			<button className="btn secondary full" type="button" onClick={() => onView('dictee')}>Rejouer une dictée</button>
		</div>
	);
}
