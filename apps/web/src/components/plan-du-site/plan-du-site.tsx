import { Link } from 'react-router';
import { ArrowLeft, BookOpen, FileText, Cookie, ScrollText, Shield, Map } from 'lucide-react';
import { LegalLayout } from '@/components/legal/legal-layout';

const pages = [
	{
		title: 'Jeu de dictée',
		description: 'Écoute, écris et progresse en orthographe avec tes propres mots.',
		to: '/',
		icon: BookOpen,
	},
	{
		title: 'Mentions légales',
		description: 'Éditeur du site, coordonnées et hébergeur.',
		to: '/mentions-legales',
		icon: FileText,
	},
	{
		title: 'Politique de confidentialité',
		description: 'Traitement et protection de tes données personnelles.',
		to: '/politique-confidentialite',
		icon: Shield,
	},
	{
		title: 'Gestion des cookies',
		description: 'Stockage local du navigateur et suppression des données.',
		to: '/gestion-cookies',
		icon: Cookie,
	},
	{
		title: 'Conditions générales d’utilisation',
		description: 'Règles d’utilisation du jeu de dictée.',
		to: '/cgu',
		icon: ScrollText,
	},
];

export function PlanDuSite() {
	return (
		<LegalLayout title="Plan du site" subtitle="Toutes les pages du jeu de dictée, réunies au même endroit.">
			<Link to="/" className="back-button" style={{ marginBottom: 16 }}>
				<ArrowLeft size={18} strokeWidth={2.4} />
				<span>Retour au jeu</span>
			</Link>

			<section>
				<div className="section-header">
					<span className="section-icon"><Map size={26} strokeWidth={2.2} /></span>
					<div>
						<h2>Pages du site</h2>
						<p>Accède rapidement à chaque section.</p>
					</div>
				</div>

				<ul className="word-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
					{pages.map(page => {
						const Icon = page.icon;
						return (
							<li key={page.to} className="word-item">
								<span className="word-number"><Icon size={16} strokeWidth={2.2} /></span>
								<Link to={page.to} style={{ minWidth: 0, flex: 1 }}>
									<strong>{page.title}</strong>
									<div className="word-level">{page.description}</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</LegalLayout>
	);
}
