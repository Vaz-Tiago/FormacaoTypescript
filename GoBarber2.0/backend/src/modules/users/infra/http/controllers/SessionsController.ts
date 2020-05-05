import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

// Index, Show, Create, Update, Delete

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticationUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;

    return res.json({ user, token });
  }
}

export default SessionsController;
