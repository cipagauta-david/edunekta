import * as bcrypt from 'bcryptjs';

export const hash = async (plain: string, rounds = 12) => bcrypt.hash(plain, rounds);
export const compare = async (plain: string, hashed: string) => bcrypt.compare(plain, hashed);
