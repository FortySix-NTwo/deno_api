import * as bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  const salt = bcrypt.genSaltSync(8);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const compare = async (hashedPassword: string, password: string) => {
  const result = bcrypt.compareSync(password, hashedPassword);
  return result;
};
