import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticationUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
});

export default sessionsRouter;
