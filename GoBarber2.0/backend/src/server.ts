import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Trativa de Erros Deve ser chamada DEPOIS das rotas
// 4 params:
// 1. Error     : tipo Error do javascript
// 2. Request   : tipo Request do express
// 3. Response  : tipo Reponse do express
// 4. Next      : tipo NextFunction do express
// Adicionado o _ no lugar do next, pois ela não foi utilizada e variaveis com nome _
// São ignoradas pelo estlint
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  // Verifica se o Erro que está vindo fé uma instancia da classe de erro criada
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server start!');
});
