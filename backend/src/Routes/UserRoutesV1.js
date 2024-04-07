import express from 'express';
import passport from 'passport';
import Controller from '../Controllers/UserControllerV1';

const router = express.Router();

router.post('/login', Controller.UserLogin);
router.post('/create-user', Controller.RegisterUser);

router.use(passport.authenticate('jwt', { session: false }));
router.get('/user-listing', Controller.UserListing);

export default router;
