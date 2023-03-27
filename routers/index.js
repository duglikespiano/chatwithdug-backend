import express from 'express';
import usersRouter from './usersRouter.js';
import validateCodeRouter from './validateCodeRouter.js';
import mailRouter from './mailRouter.js';
const router = express.Router();

router.use('/users', usersRouter);
router.use('/mail', mailRouter);
router.use('/validatecode', validateCodeRouter);

// app.get('/redirect', (req, res) => {
// 	res.status(304).redirect('https://www.naver.com');
// });

export default router;
