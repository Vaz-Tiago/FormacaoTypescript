import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// type ocorre quando a interface extend algum outro elemento e nenhum tipo é sobrescrito
// A chamada pode ser simplificada para este modelo
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Children para pegar o conteudo que foi passado dentro do button e replicando aqui
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  // Button deve ter um type definido por padrao
  // porém se chegar outro type nas props o padrão será substituido
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
