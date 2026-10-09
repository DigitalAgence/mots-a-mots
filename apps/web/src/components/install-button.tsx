import { useEffect, useState } from 'react';
import { ArrowDownToLine, Check, WifiOff } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export function InstallButton() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setInstalled(window.matchMedia('(display-mode: standalone)').matches);
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const onInstalled = () => { setInstalled(true); setPrompt(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    const onMessage = (event: MessageEvent) => { if (event.data === 'OFFLINE_READY') setOfflineReady(true); };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', onMessage);
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(() => navigator.serviceWorker.ready).then(registration => {
        const urls = performance.getEntriesByType('resource').map(entry => entry.name).filter(value => new URL(value).origin === window.location.origin);
        registration.active?.postMessage({ type: 'CACHE_RESOURCES', urls });
      }).catch(() => setError('Le mode hors connexion n’est pas disponible ici. Ouvre le site publié en HTTPS pour l’activer.'));
    } else setError('Ce navigateur ne permet pas le mode hors connexion.');
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      navigator.serviceWorker?.removeEventListener('message', onMessage);
    };
  }, []);
  async function install() {
    if (!prompt) { setHelp(true); return; }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') setInstalled(true);
    } catch { setHelp(true); }
    setPrompt(null);
  }
  return <><button className="install-button" onClick={() => void install()}>{installed ? <Check size={17} /> : <ArrowDownToLine size={17} />}{installed ? 'Application installée' : 'Installer l’application'}</button><Dialog open={help} onOpenChange={setHelp}><DialogContent className="app-dialog"><DialogTitle className="dialog-title">Tes mots, partout avec toi.</DialogTitle><DialogDescription>Installe Mot à mot sur ton écran d’accueil pour retrouver tes dictées en un geste.</DialogDescription><ol className="install-steps"><li><strong>Sur iPhone ou iPad</strong><p>Ouvre le site dans Safari, touche Partager, puis « Sur l’écran d’accueil ».</p></li><li><strong>Sur Android</strong><p>Dans Chrome, ouvre le menu ⋮ puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».</p></li><li><strong>Sur ordinateur</strong><p>Dans Chrome ou Edge, utilise l’icône d’installation à droite de la barre d’adresse.</p></li></ol><p className="offline-status"><WifiOff size={18} />{offlineReady ? 'L’application est prête pour le mode hors connexion.' : error || 'Préparation du mode hors connexion…'}</p><p className="fine-print">Pour écouter hors connexion, installe une voix française locale dans les réglages de ton appareil. Certaines voix ont besoin d’Internet. Les sauvegardes en ligne nécessitent une connexion.</p></DialogContent></Dialog></>;
}
