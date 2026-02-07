import fs from "fs";
import path from 'path';
import process from 'process';
import { STORAGE_PATH } from "../constants.mjs";
import { delegateDownloadWork } from "./download-file.mjs";

describe("downloadFile integration", () => {
  it("should download file from url and save to disk", async () => {
    const url = "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1";
    const DOWNLOADS_PATH = 'downloads';
    const downloadDirPath = path.join(process.cwd(), 'run/storage/downloads/');
    const requestedFilename = "bacon.txt";
    const savedPath = path.join(downloadDirPath, requestedFilename);
    const result = await delegateDownloadWork({
        url : url,
        downloadDirPath: path.join(process.cwd(), STORAGE_PATH + '/' + DOWNLOADS_PATH),
        requestedFilename : requestedFilename,
      });
    expect(result).toHaveProperty('filename', requestedFilename);
    const content = fs.readFileSync(savedPath, 'utf8');
    expect(() => content.startsWith("Bacon ipsum dolor amet")).toBeTruthy();
  });
});
