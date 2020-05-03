import React from 'react';
// Sinal de Loading já fornecido pelo framework
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff9000" />
      </View>
    );
  }

  // Carrega um sistema de rotas para cada situção.
  // Na web, existem as duas rotas e de acordo com o status do usuario
  // há um redirecionamento.
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
