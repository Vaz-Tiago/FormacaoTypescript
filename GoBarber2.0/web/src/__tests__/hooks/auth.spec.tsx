import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'test',
        email: 'test@email.com',
      },
      token: 'token-123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    // localstorage é um alias, acessar dessa forma:
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      // Define o contexto
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@email.com',
      password: '123456',
    });

    // Aguarda que algo mude dentro do hook
    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('test@email.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'test',
            email: 'test@email.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('test@email.com');
  });

  it('should be able to signOut', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'test',
            email: 'test@email.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123',
      name: 'test',
      email: 'test@email.com',
      avatar_url: 'image-test',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
