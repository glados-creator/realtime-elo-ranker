import path from 'path';
import process from 'process';
import { STORAGE_PATH } from "../constants.mjs";
import { delegateDownloadWork } from "./download-file.mjs";

const DOWNLOADS_PATH = 'downloads';

/**
 * Télécharge un fichier distant et le sauvegarde localement
 * 
* @param {import('express').Request} req - Requête
 * @param {import('express').Response} res - Réponse
 * @returns {Promise<import('express').Response>} Une promesse de réponse HTTP
*/
export default async function serveDownloadRemoteFile(req, res) {
  // Récupère l'URL du fichier à télécharger et le nom du fichier demandé
  const { url, filename: requestedFilename } = req.body;
  if (!url) {
    res.status(400).send('Il est nécessaire de spécifier l\'URL du fichier à télécharger');
    return;
  }

  // Délègue le travail de téléchargement à un worker
  delegateDownloadWork({
    url,
    downloadDirPath: path.join(process.cwd(), STORAGE_PATH + '/' + DOWNLOADS_PATH),
    requestedFilename
  }).then((download) => {
    // Initialise le stream de réponse SSE
    res.writeHead(202, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    // Écoute les messages du worker pour les transmettre au client
    download.on('message', (message) => {
      // Envoie un message SSE avec les informations du téléchargement
      res.write(JSON.stringify(message));
      if (message.type === 'error') {
        // En cas d'erreur (notamment si l'URL est invalide / s'il y a une erreur de réseau), coupe le worker et envoie une erreur
        download.terminate();
        res.end();
      }
      if (message.type === 'done') {
        // Termine le stream de réponse SSE et laisse le worker se terminer
        res.end();
      }
    });
    // Envoie une erreur en cas de problème avec le worker
    download.on('error', (error) => {
      res.write({ type: 'error', error });
      // Coupe le worker
      download.terminate();
      res.end();
    });
  })
    .catch((error) => {
      // En cas d'erreur lors de la délégation du travail, envoie une erreur
      res.status(500).send(error);
    });
}
