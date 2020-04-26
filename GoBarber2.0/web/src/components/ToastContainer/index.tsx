import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import Toast from './Toast';

// É possível importar as interfaces
import { ToastMessage } from '../../hooks/Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages, // Mensagens
    (message) => message.id, // Caracteristica única de cada mensagem
    {
      // Config de animação
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  return (
    // Mapeamento passa a ser o da transação
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
    // <Container>
    //   {messages.map((message) => (
    //     <Toast key={message.id} message={message} />
    //   ))}
    // </Container>
  );
};

export default ToastContainer;
