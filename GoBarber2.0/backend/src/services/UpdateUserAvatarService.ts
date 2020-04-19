import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';

import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

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
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
