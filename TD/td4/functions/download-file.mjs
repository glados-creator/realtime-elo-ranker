import stream from 'stream';
import crypto from 'crypto';
import mime from 'mime-types';
import { Worker } from 'worker_threads';

/**
 * Délègue le travail de téléchargement d'un fichier distant à un worker
 * 
 * @description Le worker va envoyer des messages de progression.
 * 
 * @param {{ url: string, downloadDirPath: string, requestedFilename: string }} workerData - Paramètres du worker 
 * @returns {Promise<Worker>} Une promesse de la référence au worker réalisant le travail
 */
export function delegateDownloadWork(workerData) {
  return Promise.resolve(new Worker("./works/download-file.work.mjs", {
    workerData
  }));
}

/**
 * Sert à télécharger un fichier distant
 * 
 * Le fichier est téléchargé sous forme de flux.
 * Si une erreur survient, elle est affichée dans la console mais devra être gérée par l'appelant.
 * 
 * @param {*} url - URL du fichier à télécharger
 * @returns Une promesse de fichier sous forme de flux accompagné du nom du fichier
 */
export async function downloadFile(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {})
      .then((response) => {
        if (response.status !== 200) {
          console.error(`Erreur lors du téléchargement du fichier: ${response.status} ${response.statusText}`);
          reject();
          return;
        }
        const contentDisposition = response.headers.get('content-disposition');
        const contentType = response.headers.get('content-type');
        const fileSize = parseInt(response.headers.get('content-length'), 10) || 0;
        // Code pour extraire le nom du fichier. Utilise un nom aléatoire si le nom du fichier n'est pas spécifié
        const filename = contentDisposition?.split(';')[1].split('=')[1] ||
          (crypto.randomUUID().toString() + (contentType ? '.' + mime.extension(contentType) : ''));
        resolve({ fileStream: stream.Readable.fromWeb(response.body), filename, fileSize }); 
      });
  });
}