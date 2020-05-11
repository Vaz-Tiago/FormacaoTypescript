import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute(id);

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const userUpdate = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete userUpdate.password;

    return res.json(userUpdate);
  }
}
