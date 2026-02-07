import fs from 'fs';
import path from 'path';
import process from 'process';
import { STORAGE_PATH } from '../constants.mjs';

/**
 * Sert à télécharger un fichier du serveur
 * 
 * @param {*} req - Requête
 * @param {*} res - Réponse
 * @returns Une promesse de réponse HTTP
 */
export default async function serveDownload(req, res) {
  const { filename } = req.params;
    // Code pour télécharger un fichier
    fs.createReadStream(path.join(process.cwd(), STORAGE_PATH, filename))
      .pipe(res)
      .on('end', () => {
        res.end();
      });
}