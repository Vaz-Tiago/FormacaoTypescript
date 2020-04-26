import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
// Para utilizar um input
import { useField } from '@unform/core';

// Faz a importação das propriedades de um icone que foi passado como argumento
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

// Interface para passar as props para o input
// Extendendo de um elemento html tradicional
// Pois são estes argumentos que ele deve receber
// Só colocar algo se desejar sobrescrever
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // Para passar um componente como tipo
}
// Renomear o arumento icon para Icon - com I maiusculo
// Pois todo componente React deve iniciar com letra maiuscula
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // Lidando com refencia
  // Acessa direto o value do objeto no dom, pula o state do react
  const inputRef = useRef<HTMLInputElement>(null);
  // Lidando com o input
  const { fieldName, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, // É dentro de current que ficam os dados
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setisFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      {/* Propriedade ref para facilitar o acesso direto na dom */}
      <input
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
