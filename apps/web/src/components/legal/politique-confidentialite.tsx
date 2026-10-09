import { LegalLayout } from '@/components/legal/legal-layout';

export function PolitiqueConfidentialite() {
	return (
		<LegalLayout title="Politique de confidentialité" subtitle="Comment vos données sont traitées et protégées.">
			<section>
				<h2>Responsable du traitement</h2>
				<p>
					Le responsable du traitement des données est <strong>Digital Agence</strong>{' '}
					(digitalagence28@gmail.com).
				</p>
			</section>

			<section>
				<h2>Données collectées</h2>
				<p>
					Le jeu de dictée fonctionne principalement dans votre navigateur. Les mots que
					vous ajoutez et vos résultats de dictée sont enregistrés localement sur votre
					appareil (stockage du navigateur). Ils ne sont pas transmis à un serveur et
					restent sous votre contrôle.
				</p>
				<p>
					Aucune donnée personnelle nominative n’est collectée automatiquement lors d’une
					utilisation simple du site.
				</p>
			</section>

			<section>
				<h2>Utilisation des données</h2>
				<p>
					Les informations stockées localement servent uniquement à faire fonctionner le
					jeu : afficher vos mots, enregistrer votre progression et proposer des
					dictées personnalisées.
				</p>
			</section>

			<section>
				<h2>Cookies et technologies similaires</h2>
				<p>
					Le site utilise le stockage local du navigateur pour mémoriser vos mots et
					résultats. Ces informations ne sont pas des cookies de suivi publicitaire. Pour
					plus de détails, consultez la page <a href="/gestion-cookies">Gestion des cookies</a>.
				</p>
			</section>

			<section>
				<h2>Conservation</h2>
				<p>
					Les données locales sont conservées tant que vous ne les supprimez pas. Vous
					pouvez à tout moment effacer les données de votre navigateur pour les retirer
					définitivement.
				</p>
			</section>

			<section>
				<h2>Vos droits</h2>
				<p>
					Conformément au Règlement Général sur la Protection des Données (RGPD), vous
					disposez d’un droit d’accès, de rectification et de suppression des données vous
					concernant. Pour exercer ces droits, écrivez à{' '}
					<a href="mailto:digitalagence28@gmail.com">digitalagence28@gmail.com</a>.
				</p>
			</section>

			<section>
				<h2>Hébergement</h2>
				<p>
					Le site est hébergé par <strong>Hostinger</strong>, qui assure la disponibilité
					du site sur Internet.
				</p>
			</section>
		</LegalLayout>
	);
}
