
export class HashManagerMock {
  public hash = async (plaintext: string) => {
    let result:string = ""
    if(plaintext === "mvptest"){
        result = "mvptest-hash"
    }
    return result;
  };

  public compareHash = async (plaintext: string, hash: string) => {
    if(plaintext === "mvptest" && hash === "mvptest-hash"){
        return true
    }
    return false
  };
}
