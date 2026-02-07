import { jest } from "@jest/globals";
import fs from "fs";
import stream from "stream";
import saveFileStream from "./save-file-stream.mjs";

describe("saveFileStream", () => {
    beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should create directory and write file", async () => {
    // given
    const inputStream = new stream.Readable();
    inputStream.push("test");
    inputStream.push(null);
    const path = "test";
    const filename = "test.txt";

    // when
    const spiedMkdir = jest.spyOn(fs, "mkdir").mockImplementation((_path, _options, callback) => {
      callback();
    });
    const spiedCreateWriteStream = jest.spyOn(fs, "createWriteStream").mockReturnValue(new stream.PassThrough());
    saveFileStream(inputStream, path, filename);

    // then
    expect(spiedMkdir).toHaveBeenCalledTimes(1);
    expect(spiedCreateWriteStream).toHaveBeenCalledTimes(1);
  });

  it("should NOT create directory", async () => {
    // given
    const inputStream = new stream.Readable();
    inputStream.push("test");
    inputStream.push(null);
    const path = "test";
    const filename = "test.txt";

    // when
    const spiedMkdir = jest.spyOn(fs, "mkdir").mockImplementation((_path, _options, callback) => {
      callback("uhshfsjkdhfskhj");
    });
    const spiedCreateWriteStream = jest.spyOn(fs, "createWriteStream").mockReturnValue(new stream.PassThrough());
    await expect(saveFileStream(inputStream, path, filename)).rejects.toBe("Erreur lors de la création du répertoire");

    // then
    expect(spiedMkdir).toHaveBeenCalledTimes(1);
    expect(spiedCreateWriteStream).not.toHaveBeenCalled();
  });

  // it("error path", async () => {
  //   /// given
  //   const inputStream = new stream.Readable();
  //   inputStream.push("test");
  //   const path = "test";
  //   const filename = "test.txt";
// 
  //   // when
  //   const spiedMkdir = jest.spyOn(fs, "mkdir").mockImplementation((_path, _options, callback) => {
  //     callback("uhshfsjkdhfskhj");
  //   });
  //   const spiedCreateWriteStream = jest.spyOn(fs, "createWriteStream").mockReturnValue(new stream.PassThrough());
// 
  //   const promise = saveFileStream(inputStream, path, filename);
  //   // emit error on the write stream (this is handled by saveFileStream)
  //   inputStream.emit('error', new Error('Write stream error TEST'));
  //   inputStream.push(null);
  //   await expect(promise).rejects.toThrow(new Error('Write stream error TEST'));
// 
  //   // then
  //   expect(spiedMkdir).toHaveBeenCalledTimes(1);
  //   expect(spiedCreateWriteStream).toHaveBeenCalled();
  // });
});