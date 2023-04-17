import express from 'express';
import * as userController from '../controllers/userController.js';
import * as socket from '../middlewares/socket.js';
const router = express.Router();

router.post('/connectCheck', (req, res) => {
	socket.checkUser(req, res);
});

router.post('/signup', (req, res) => {
	userController.addUser(req, res);
});

router.get('/signup', (req, res) => {
	userController.checkUser(req, res);
});

router.post('/signin', (req, res) => {
	userController.signInUser(req, res);
});

export default router;
