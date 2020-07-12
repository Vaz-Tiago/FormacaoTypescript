import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';
// Contexto também reaproveitado da web
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import logo from '../../assets/logo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();

  // Função de Login aproveitada da web
  const handleSignIn = useCallback(
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
      } catch (err) {
        // Confere se o erro é de validação do yup
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique email e senha',
        );

        // addToast({
        //   type: 'error',
        //   title: 'Erro na autenticação',
        //   description:
        //     'Ocorreu um erro ao fazer login, verifique email e senha',
        // });
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false} // Não corrige o texto
                autoCapitalize="none" // Não inicia com maiuscula
                keyboardType="email-address" // Mostra o @ no teclado
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next" // Altera aparencia do button de contexto
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry // Define que é password
                returnKeyType="send" // Altera aparencia do button de contexto
                name="password"
                icon="lock"
                placeholder="Senha"
                onSubmitEditing={() => {
                  // Necessário para enviar a infor
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            <ForgotPassword
              onPress={() => {
                console.log('forgot');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
