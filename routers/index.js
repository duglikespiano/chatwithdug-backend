import express from 'express';
import usersRouter from './usersRouter.js';
import mailRouter from './mailRouter.js';
const router = express.Router();

router.use('/users', usersRouter);
router.use('/mail', mailRouter);

export default router;
