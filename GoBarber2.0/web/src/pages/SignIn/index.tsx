// External
import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// Internal
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

// Imagens
import logoImg from '../../assets/logo.svg';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styles
import { Container, Content, AnimationContainer, Background } from './styles';

// Interfaces
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({}); // Seta dicionario vazio
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          // Retorna todos os erros do yup
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        // Confere se o erro é de validação do yup
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifique email e senha',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
