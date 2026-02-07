import { parentPort, workerData } from 'worker_threads';
import stream from 'stream';
import { downloadFile  } from '../functions/download-file.mjs';
import saveFileStream from '../functions/save-file-stream.mjs';

// Récupération des paramètres
const { url, downloadDirPath, requestedFilename } = workerData;

// Téléchargement du fichier
downloadFile(url)
  .then( 
    ({ fileStream, filename, fileSize: totalSize }) => { 
    // Sauvegarde du fichier
    var fileSize = 0;
    const finalFilename = requestedFilename || filename;
    const spyStream = new stream.PassThrough();
    const saveStream = new stream.PassThrough();
    // Export des informations du fichier
    parentPort.postMessage({ type: 'start', filename: finalFilename, totalSize }); 
    spyStream.on('data', (chunk) => {
      fileSize += chunk.length;
      // Export de la progression
      parentPort.postMessage({ type: 'progress', fileSize }); 
    });
    // Pipe pour observer le flux et le sauvegarder
    fileStream.pipe(spyStream).pipe(saveStream);
    return saveFileStream(saveStream, downloadDirPath, finalFilename)
      .then(() => {
        // Export des informations finales du fichier
        parentPort.postMessage({
          type: 'done', 
          filename: finalFilename,
          fileSize
        });
        
      });
  });