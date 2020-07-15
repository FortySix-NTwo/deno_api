import { connectPg } from 'pgc4d';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { hash } from 'hash';
import { loadEnvironment } from 'environment';

const url = `postgres://${loadEnvironment.POSTGRES_USER}:${loadEnvironment.POSTGRES_PASSWORD}@${loadEnvironment.PG_HOST}/${loadEnvironment.POSTGRES_DB}`;

export const pgConnect = async () => {
  const db = await connectPg(url);
  try {
    await db.query('BEGIN');
    await db.query(
      `create table if not exists users (
        user_id           TEXT NOT NULL PRIMARY KEY,
        full_name         VARCHAR(100) NOT NULL,
        user_name         VARCHAR(100) NOT NULL,
        email             TEXT NOT NULL UNIQUE,
        hashed_password   TEXT NOT NULL UNIQUE,
        created_at        DATE,
        updated_at        DATE)`
    );
    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const findOneById = async (id: string) => {
  const db = await connectPg(url);

  try {
    await db.query('BEGIN');
    const result = await db.query(`SELECT * FROM users WHERE user_id=${id}`);
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const findAnyByNameOrEmail = async (name?: string, email?: string) => {
  const db = await connectPg(url);

  let result;
  try {
    if (name != undefined) {
      await db.query('BEGIN');
      result = await db.query(`SELECT * FROM users WHERE full_name=${name}`);
      await db.query('COMMIT');
      return result;
    } else {
      await db.query('BEGIN');
      result = await db.query(`SELECT * FROM users WHERE email=${email}`);
      await db.query('COMMIT');
      return result;
    }
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const findAndUpdateEmailById = async (id: string, email: string) => {
  const db = await connectPg(url);

  try {
    await db.query('BEGIN');
    const result = await db.query(`UPDATE users SET email=${email}, updated_at=${Date.now} WHERE user_id=${id}`);
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const findAndUpdatePasswordById = async (id: string, password: string) => {
  const db = await connectPg(url);

  try {
    await db.query('BEGIN');
    const result = await db.query(`UPDATE users SET password=${password}, updated_at=${Date.now} WHERE user_id=${id}`);
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const findAndUpdateUsernameById = async (id: string, name: string) => {
  const db = await connectPg(url);

  try {
    await db.query('BEGIN');
    const result = await db.query(`UPDATE users SET user_name=${name}, updated_at=${Date.now} WHERE user_id=${id}`);
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const saveUser = async (fullName: string, userName: string, email: string, password: string) => {
  const db = await connectPg(url);

  const hashedPassword = hash(password);
  const uid = v4.generate();
  try {
    await db.query('BEGIN');
    const result = await db.query(
      `INSERT INTO users (user_id, full_name, user_name, email, hashed_password, created_at, updated_at) VALUES (${uid}, ${fullName}, ${userName}, ${email}, ${hashedPassword}, ${Date.now}, ${Date.now})`
    );
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};

export const removeUser = async (id: string) => {
  const db = await connectPg(url);

  try {
    await db.query('BEGIN');
    const result = await db.query(`DELETE FROM users WHERE user_id=${id}`);
    await db.query('COMMIT');
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    return new Error(error);
  } finally {
    await db.close();
  }
};
