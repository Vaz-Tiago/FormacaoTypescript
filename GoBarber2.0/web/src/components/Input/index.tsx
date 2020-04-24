import React, { InputHTMLAttributes } from 'react';

// Faz a importação das propriedades de um icone que foi passado como argumento
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

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
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
