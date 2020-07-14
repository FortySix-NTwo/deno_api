import { Router } from 'oak';

import { getUser, getUsers, updateUser, createUser, deleteUser } from '../model/users.ts';

const router = new Router();

router
  .get('/api/v1/users', getUsers)
  .get('/api/v1/users/:id', getUser)
  .post('/api/v1/users/newUser', createUser)
  .put('/api/v1/users/:id', updateUser)
  .delete('/api/v1/users/:id', deleteUser);

export default router;
