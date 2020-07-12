import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="email" />,
    );

    expect(getByPlaceholderText('email')).toBeTruthy();
  });

  it('should be able to get focused config', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" />,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should be able to get filled config', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" />,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'test@email.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
