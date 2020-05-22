import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheRepository: FakeCacheRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheRepository = new FakeCacheRepository();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheRepository,
    );
  });

  it('Should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'loggeduser@example.com',
      password: '123456',
    });

    const provider01 = await fakeUsersRepository.create({
      name: 'Provider 01',
      email: 'provider01@example.com',
      password: '123456',
    });

    const provider02 = await fakeUsersRepository.create({
      name: 'Provider 02',
      email: 'provider02@example.com',
      password: '123456',
    });

    const provider03 = await fakeUsersRepository.create({
      name: 'Provider 03',
      email: 'provider03@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([provider01, provider02, provider03]);
  });
});
