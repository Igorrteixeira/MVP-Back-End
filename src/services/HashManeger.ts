import { genSalt, hash, compare } from "bcryptjs";

export class HashManager {
  public hash = async (plaintext: string) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await genSalt(rounds);
    const result = await hash(plaintext, salt);
    return result;
  };

  public compareHash = async (plaintext: string, hash: string) => {
    const result = await compare(plaintext, hash);
    return result;
  };
}
