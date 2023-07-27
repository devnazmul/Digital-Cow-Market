import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { cowRoutes } from '../modules/cow/cow.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/cows',
    route: cowRoutes,
  },
];

allRoutes.forEach(route => router.use(route.path, route.route));

export const routes = router;
