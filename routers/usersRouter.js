import express from 'express';
import * as userController from '../controllers/userController.js';
const router = express.Router();

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
