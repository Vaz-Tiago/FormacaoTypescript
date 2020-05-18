import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersReposotory: IUserRepository,
  ) {}

  public async execute(loggedUserId: string): Promise<User[]> {
    const users = await this.usersReposotory.findAllProviders({
      except_user_id: loggedUserId,
    });

    return users;
  }
}
export default ListProvidersService;
