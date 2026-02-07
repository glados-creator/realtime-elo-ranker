import { jest } from "@jest/globals";
import { downloadFile } from "./download-file.mjs";


describe("downloadFile http", () => {
  it("should download file from url with http", async () => {
    // given
    const filenameinp = "bacon";
    const url = "https://baconipsum.com/api/?type=meat-and-filler";

    // when
    const spiedhttpget = jest.spyOn(global, "fetch").mockImplementation((url, param) => 
      new Promise((resolve,reject) =>{
        resolve( {
          headers : {
            'content-disposition' : filenameinp ,
            'content-type' : "text/plain"
          },
          body : "test",
          status : 200,
        });
      })
    );
    let fileStream,filename = await downloadFile(url);
    const ret = "";
    fileStream.on("data", (data) => ret = data);
    // then
    expect(spiedhttpget).toHaveBeenCalledTimes(1);
    expect(ret).toBe("test");
    expect(filename).toBe(filenameinp);
  });

  it("should download file from url with http", async () => {
    // given
    const filenameinp = "bacon";
    const url = "http://baconipsum.com/api/?type=meat-and-filler";

    // when
    const spiedhttpget = jest.spyOn(global, "fetch").mockImplementation((url, param) => 
      new Promise((resolve,reject) =>{
        resolve( {
          headers : {
            'content-disposition' : filenameinp ,
            'content-type' : "text/plain"
          },
          body : "test",
          status : 200,
        });
      })
    );
    let fileStream,filename = await downloadFile(url);
    const ret = "";
    fileStream.on("data", (data) => ret = data);
    // then
    expect(spiedhttpget).toHaveBeenCalledTimes(1);
    expect(ret).toBe("test");
    expect(filename).toBe("bacon.txt");
  });

  it("should download file from url with https (no filename)", async () => {
    // given
    // const filenameinp = "bacon";
    const url = "https://baconipsum.com/api/?type=meat-and-filler";

    // when
    const spiedhttpget = jest.spyOn(global, "fetch").mockImplementation((url, param) => 
      new Promise((resolve,reject) =>{
        resolve( {
          headers : {
            'content-type' : "text/plain"
          },
          body : "test",
          status : 200,
        });
      })
    );
    let fileStream,filename = await downloadFile(url);
    const ret = "";
    fileStream.on("data", (data) => ret = data);
    // then
    expect(ret).toBe("test");
  });

  it("should download file from url with https (no filename no extension)", async () => {
    // given
    // const filenameinp = "bacon";
    const url = "https://baconipsum.com/api/?type=meat-and-filler";

    // when
    const spiedhttpget = jest.spyOn(global, "fetch").mockImplementation((url, param) => 
      new Promise((resolve,reject) =>{
        resolve( {
          headers : {
          },
          body : "test",
          status : 200,
        });
      })
    );
    let fileStream,filename = await downloadFile(url);
    const ret = "";
    fileStream.on("data", (data) => ret = data);
    // then
    expect(spiedhttpget).toHaveBeenCalledTimes(1);
    expect(ret).toBe("test");
  });
}
  it("should download file err", async () => {
    // given
    // const filenameinp = "bacon";
    const url = "https://baconipsum.com/api/?type=meat-and-filler";

    // when
    const spiedhttpget = jest.spyOn(global, "fetch").mockImplementation((url, param) => 
      new Promise((resolve,reject) =>{
        resolve( {
          headers : {
          },
          body : "test",
          status : 404,
        });
      })
    );
    let fileStream,filename = await downloadFile(url);
    const ret = "";
    fileStream.on("data", (data) => ret = data);
    // then
    expect(spiedhttpget).toHaveBeenCalledTimes(1);
    expect(ret).toBe("test");
  });
});