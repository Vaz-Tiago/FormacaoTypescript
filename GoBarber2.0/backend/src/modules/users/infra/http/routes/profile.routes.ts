import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profilerController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.put('/', profilerController.update);
profileRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().min(5),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profilerController.show,
);

export default profileRouter;
