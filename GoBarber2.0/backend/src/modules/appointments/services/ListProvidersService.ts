import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersReposotory: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(loggedUserId: string): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${loggedUserId}`,
    );

    if (!users) {
      users = await this.usersReposotory.findAllProviders({
        except_user_id: loggedUserId,
      });

      await this.cacheProvider.save(`providers-list:${loggedUserId}`, users);
    }

    return users;
  }
}
export default ListProvidersService;
