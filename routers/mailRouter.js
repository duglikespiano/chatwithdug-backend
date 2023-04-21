import express from 'express';
import * as mailController from '../controllers/mailController.js';
const router = express.Router();

router.post('/notification', (req, res) => {
	mailController.sendNotificationMail(req, res);
});

export default router;
