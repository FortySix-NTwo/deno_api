import {
  findOneById,
  findAnyByNameOrEmail,
  findAndUpdateEmailById,
  findAndUpdatePasswordById,
  findAndUpdateUsernameById,
  saveUser,
  removeUser,
} from './pg.ts';

/**
 * @endpoint /api/v1/users/:id
 * @method GET
 * @param userID
 */

export const getUser = async ({ params, response }: { params: { id: string }; response: any }) => {
  const id = params.id;
  try {
    const result = await findOneById(id);
    response.status = 200;
    response.body = {
      message: 'OK',
      data: result,
    };
  } catch (error) {
    response.status = 401;
    response.body = {
      message: 'Invalid Credentials',
      data: error,
    };
  }
};

export const getUsers = async ({ request, response }: { request: any; response: any }) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: 'Update Field Not Provided',
      data: undefined,
    };
  }
  const body = await request.body();
  const name = body.value.name;
  const email = body.value.email;
  try {
    const users = await findAnyByNameOrEmail(name, email);
    response.status = 200;
    response.body = {
      message: 'OK',
      data: users,
    };
  } catch (error) {
    response.status = 401;
    response.body = {
      message: 'Invalid Credentials',
      data: error,
    };
  }
};

/**
 * @method PUT
 */

export const updateUser = async ({ request, response }: { response: any; request: any }) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: 'Update Field Not Provided',
      data: undefined,
    };
  }
  const body = await request.body();
  const key = body.key;
  const value = body.value;
  const id = body.id;
  let user;

  try {
    switch (key) {
      case 'email':
        user = await findAndUpdateEmailById(id, value);
        break;
      case 'password':
        user = await findAndUpdatePasswordById(id, value);
        break;
      case 'name':
        user = await findAndUpdateUsernameById(id, value);
        break;
    }
    response.status = 200;
    response.body = {
      message: 'OK',
      data: user,
    };
  } catch (error) {
    response.status = 401;
    response.body = {
      message: 'Invalid Credentials',
      data: error,
    };
  }
};

/**
 * @method POST
 */

export const createUser = async ({ request, response }: { request: any; response: any }) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: 'Invalid Credentials',
      data: undefined,
    };
  }
  try {
    const body = await request.body();
    console.log(body.value);
    const newUser = await saveUser(body.value.fullName, body.value.userName, body.value.email, body.value.password);
    response.status = 200;
    response.body = {
      message: 'OK',
      data: newUser,
    };
  } catch (error) {
    response.status = 401;
    response.body = {
      message: 'Invalid Credentials',
      data: error,
    };
  }
};

/**
 * @method DElETE
 */

export const deleteUser = async ({ params, response }: { params: { id: string }; response: any }) => {
  try {
    const user = await removeUser(params.id);
    response.status = 200;
    response.body = {
      message: 'OK',
      data: user,
    };
  } catch (error) {
    response.status = 401;
    response.body = {
      message: 'Invalid Credentials',
      data: error,
    };
  }
};
