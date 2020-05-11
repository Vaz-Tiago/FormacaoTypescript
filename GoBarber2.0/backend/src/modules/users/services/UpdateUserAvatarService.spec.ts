import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to upload a avatar image', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'user.jpg',
    });

    expect(user.avatar).toBe('user.jpg');
  });

  it('should not be able to upload when user is not logged in', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'fakeuser',
        avatarFileName: 'user.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a old avatar image when the user update a new one', async () => {
    // verify method triggered and put on a variable
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'user.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'user2.jpg',
    });

    // check the variable has been called with the param
    expect(deleteFile).toHaveBeenCalledWith('user.jpg');
  });
});
