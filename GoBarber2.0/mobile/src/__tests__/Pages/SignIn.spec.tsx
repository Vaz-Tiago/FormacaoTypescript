import React from 'react';
import { render } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn Page', () => {
  it('should be contains email/password inputs', () => {
    // getByTestId,
    // Dentro do componente que deseja selecionar adicionar a prop:
    // testID='name'
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('Email')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
