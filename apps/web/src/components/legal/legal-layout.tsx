import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

type LegalLayoutProps = {
	title: string;
	subtitle?: string;
	children: ReactNode;
};

export function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
	return (
		<div className="dict-page">
			<main className="dict-shell">
				<header className="dict-header">
					<div className="dict-logo" aria-hidden="true">📄</div>
					<h1>{title}</h1>
					{subtitle ? <p>{subtitle}</p> : null}
				</header>

				<Link to="/" className="back-button" style={{ marginBottom: 16 }}>
					<ArrowLeft size={18} strokeWidth={2.4} />
					<span>Retour au jeu</span>
				</Link>

				<article className="dict-card legal-content">{children}</article>

				<footer className="dict-footer">
					<a href="https://www.digitalagence.fr" target="_blank" rel="noopener noreferrer" className="account-button">
						Digital Agence
					</a>
				</footer>
			</main>
		</div>
	);
}
