import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profilerController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.put('/', profilerController.update);
profileRouter.get('/', profilerController.show);

export default profileRouter;
