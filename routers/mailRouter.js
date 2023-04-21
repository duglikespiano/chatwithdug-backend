import express from 'express';
import * as mailController from '../controllers/mailController.js';
const router = express.Router();

router.post('/notification', (req, res) => {
	mailController.sendNotificationMail(req, res);
});

router.get('/validatecode', (req, res) => {
	mailController.sendRequestValidateCodeMail(req, res);
});

router.post('/validatecode', (req, res) => {
	mailController.checkValidateCode(req, res);
});

export default router;
