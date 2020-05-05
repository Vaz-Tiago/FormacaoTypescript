import { injectable, inject } from 'tsyringe';

import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Deletando avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // retorna o status de um arquivo, porém apenas se ele existir.
      // O que torna possível a verificação se existe ou não
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarExists) {
        // Deletando o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Salvando as alterações

    user.avatar = avatarFileName;

    // Caso não existe cria
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
