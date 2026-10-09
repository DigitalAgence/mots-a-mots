import type { SavedState } from '@/lib/dictee-types';
const DB_NAME = 'mot-a-mot';
function openStore(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('progress');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function readProgress(): Promise<SavedState | null> {
  const db = await openStore();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('progress', 'readonly');
    const request = transaction.objectStore('progress').get('state');
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}
let saving = Promise.resolve();
export function writeProgress(state: SavedState): Promise<void> {
  saving = saving.catch(() => undefined).then(async () => {
    const db = await openStore();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('progress', 'readwrite');
      transaction.objectStore('progress').put(state, 'state');
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
  });
  return saving;
}
