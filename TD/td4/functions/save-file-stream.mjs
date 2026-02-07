import fs from 'fs';
import path from 'path';

/**
 * Sauvegarde un fichier dans le système de fichiers
 * 
 * @param {*} readStream - Flux de lecture
 * @param {*} path - Chemin du répertoire de stockage
 * @param {*} filename - Nom du fichier
 * @returns Une promesse de fichier sauvegardé
 */
export default async function saveFileStream(readStream, filepath, filename) {
  return new Promise((resolve, reject) => {
    fs.mkdir(filepath, { recursive: true }, (err) => {
      if (err) {
        return reject('Erreur lors de la création du répertoire');
      }
      const fsFileStream = fs.createWriteStream(path.join(filepath, filename));
      readStream
        .pipe(fsFileStream)
        .on('finish', () => {
          return resolve();
        })
        .on('error', (error) => {
          return reject(error);
        });
    });
  });
}