import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Headphones, List, Plus, Wifi, WifiOff } from 'lucide-react';
import { InstallButton } from '@/components/install-button';
import { GamePanel } from '@/components/home/game-panel';
import { WordsPanel } from '@/components/home/words-panel';
import { ListePanel } from '@/components/home/liste-panel';
import { useDictee } from '@/hooks/use-dictee';
import type { View } from '@/lib/dictee-types';

const tabs: { id: View; label: string; icon: typeof Plus }[] = [
	{ id: 'mots', label: 'Mes mots', icon: Plus },
	{ id: 'dictee', label: 'Dictée', icon: Headphones },
	{ id: 'liste', label: 'Liste', icon: List },
];

export function DicteeWorkspace() {
	const controller = useDictee();
	const [view, setView] = useState<View>('mots');
	const [online, setOnline] = useState(true);

	useEffect(() => {
		const update = () => setOnline(navigator.onLine);
		update();
		window.addEventListener('online', update);
		window.addEventListener('offline', update);
		return () => {
			window.removeEventListener('online', update);
			window.removeEventListener('offline', update);
		};
	}, []);

	return (
		<div className="dict-page">
			<main className="dict-shell">
				<header className="dict-header">
					<div className="dict-logo" aria-hidden="true">✏️</div>
					<h1>Jeu de dictée</h1>
					<p>Écoute, écris et progresse en orthographe !</p>
				</header>

				<nav className="dict-tabs" aria-label="Navigation">
					{tabs.map(tab => {
						const Icon = tab.icon;
						const active = view === tab.id;
						return (
							<button key={tab.id} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} onClick={() => setView(tab.id)}>
								<Icon size={16} strokeWidth={2.4} />
								<span>{tab.label}</span>
							</button>
						);
					})}
				</nav>

				{controller.storageError && <p className="error-message" role="alert">{controller.storageError}</p>}
				{!controller.ready && <p className="loading-note" role="status">On retrouve tes mots…</p>}

				{view === 'mots' && <WordsPanel controller={controller} />}
				{view === 'dictee' && <GamePanel controller={controller} onView={setView} />}
				{view === 'liste' && <ListePanel controller={controller} onView={setView} />}

				<footer className="dict-footer">
					<span className="connection-indicator">{online ? <Wifi size={14} /> : <WifiOff size={14} />}<span>{online ? 'En ligne' : 'Hors connexion'}</span></span>
					<InstallButton />
					<div className="footer-links">
						<a href="https://www.digitalagence.fr" target="_blank" rel="noopener noreferrer">Digital Agence</a>
						<Link to="/mentions-legales">Mentions légales</Link>
						<Link to="/politique-confidentialite">Confidentialité</Link>
						<Link to="/gestion-cookies">Cookies</Link>
						<Link to="/cgu">CGU</Link>
						<Link to="/plan-du-site">Plan du site</Link>
					</div>
				</footer>
			</main>
		</div>
	);
}
