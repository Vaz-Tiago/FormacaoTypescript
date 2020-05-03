import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

// Necessário uma interface com os dados que ficarão disponíveis
interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

// hack para passar um objeto vazio no construtor do context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Necessário para isoar métodos dentro do contexto
const AuthProvider: React.FC = ({ children }) => {
  // Incializa com função
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);
      // Multiget retorna um array com chave valor;
      // por isso é definido a posição [1], ela armazena o valor
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // Como é assíncrono não é possível setar o state diretamente como na web.
  // Para isso inicia-se o state vazio e depois seta os seus valores com o useEffect

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // await AsyncStorage.setItem('@GoBarber:token', token);
    // await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:token', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    // Removendo mais de uma key ao mesmo tempo:
    // Web
    // localstorage.removeItem('@GoBarber:token');
    // localstorage.removeItem('@GoBarber:user');
    // Mobile
    await AsyncStorage.multiRemove(['@GoBarber:token', 'GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
