import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ Message: 'Hello world!' }));

export default routes;
