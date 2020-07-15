import { Client } from 'postgres';
import { v4 } from 'v4';
import { hash } from 'hash';

export const pgConnect = async (client: Client) => {
  await client.connect();
  try {
    await client.query(`create table if not exists users (
    user_id           TEXT NOT NULL PRIMARY KEY,
    full_name         VARCHAR(100) NOT NULL,
    user_name         VARCHAR(100) NOT NULL,
    email             TEXT NOT NULL UNIQUE,
    hashed_password   TEXT NOT NULL UNIQUE,
    created_at        DATE,
    updated_at        DATE
  )`);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const findOneById = async (client: Client, id: string) => {
  await client.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`SELECT * FROM users WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const findAnyByNameOrEmail = async (client: Client, name?: string, email?: string) => {
  await client.connect();
  let result;
  try {
    if (name != undefined) {
      await client.query('BEGIN');
      result = await client.query(`SELECT * FROM users WHERE full_name=${name}`);
      await client.query('COMMIT');
      return result;
    } else {
      await client.query('BEGIN');
      result = await client.query(`SELECT * FROM users WHERE email=${email}`);
      await client.query('COMMIT');
      return result;
    }
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const findAndUpdateEmailById = async (client: Client, id: string, email: string) => {
  await client.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`UPDATE users SET email=${email}, updated_at=${Date.now} WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const findAndUpdatePasswordById = async (client: Client, id: string, password: string) => {
  await client.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `UPDATE users SET password=${password}, updated_at=${Date.now} WHERE user_id=${id}`
    );
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const findAndUpdateUsernameById = async (client: Client, id: string, name: string) => {
  await client.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`UPDATE users SET user_name=${name}, updated_at=${Date.now} WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const saveUser = async (client: Client, fullName: string, userName: string, email: string, password: string) => {
  await client.connect();
  const hashedPassword = hash(password);
  const uid = v4.generate();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO users VALUES (${uid}, ${fullName}, ${userName}, ${email}, ${hashedPassword}, ${Date.now}, ${Date.now})`
    );
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};

export const removeUser = async (client: Client, id: string) => {
  await client.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`DELETE FROM users WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.end();
  }
};
