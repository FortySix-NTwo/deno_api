import { Pool } from 'pg';

import { hash } from '../utils/bcrypt.ts';

const pool = new Pool({
  hostname: '0.0.0.0',
  password: '123456',
  port: 5432,
});

export const pgConnect = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `create table if not exists users (
        user_id           TEXT NOT NULL PRIMARY KEY,
        full_name         VARCHAR(100) NOT NULL,
        user_name         VARCHAR(100) NOT NULL,
        email             TEXT NOT NULL UNIQUE,
        hashed_password   TEXT NOT NULL UNIQUE,
        created_at        DATE,
        updated_at        DATE)`
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};

export const findOneById = async (id: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`SELECT * FROM users WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};

export const findAnyByNameOrEmail = async (name?: string, email?: string) => {
  const client = await pool.connect();
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
    await client.release();
  }
};

export const findAndUpdateEmailById = async (id: string, email: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`UPDATE users SET email=${email}, updated_at=${Date.now} WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};

export const findAndUpdatePasswordById = async (id: string, password: string) => {
  const client = await pool.connect();
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
    await client.release();
  }
};

export const findAndUpdateUsernameById = async (id: string, name: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`UPDATE users SET user_name=${name}, updated_at=${Date.now} WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};

export const saveUser = async (fullName: string, userName: string, email: string, password: string) => {
  const client = await pool.connect();
  const hashedPassword = hash(password);
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO users (full_name, user_name, email, hashed_password, created_at, updated_at) VALUES (${fullName}, ${userName}, ${email}, ${hashedPassword}, ${Date.now}, ${Date.now})`
    );
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};

export const removeUser = async (id: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`DELETE FROM users WHERE user_id=${id}`);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    return new Error(error);
  } finally {
    await client.release();
  }
};
