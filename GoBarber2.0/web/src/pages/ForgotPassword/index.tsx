// External
import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// Internal
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

// Imagens
import logoImg from '../../assets/logo.svg';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styles
import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

// Interfaces
interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      formRef.current?.setErrors({}); // Seta dicionario vazio
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperação de senha
        await api.post('/password/forgot', { email: data.email });
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });

        // history.push('/dashboard');
      } catch (err) {
        // Confere se o erro é de validação do yup
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
