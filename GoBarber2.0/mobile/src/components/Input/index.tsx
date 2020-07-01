import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

// Criada para pegar o value do input
interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// Referencia é recebida como segundo parametro das props
// Componentes do tipo FC não aceitam ref como parametro
// Para isso o componente deve ser do tipo RefForwardingComponent
// Recebe dois parametros como interface, o das props e o da ref
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  // Definindo que o input seja preenchido de acordo com uma ação do usuário
  // necessário o tipo any porque é uma propriedade nativa
  const inputElementRef = useRef<any>(null);
  // definindo a referencia do valor como vazia
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value', // Onde Vai buscar o valor do input
      // setValue(ref: any, value) {
      setValue(value) {
        // Seta o valor do input
        inputValueRef.current.value = value;
        // Define a propriedade texto do input para que seja exibido em tela
        inputElementRef.current.setNativeProp({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error} style={containerStyle}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark" // Apenas IOS
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
