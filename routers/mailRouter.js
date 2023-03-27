import express from 'express';
import * as mailController from '../controllers/mailController.js';
const router = express.Router();

router.post('/testRequestMail', (req, res) => {
	mailController.sendTestRequestMail(req, res);
});

export default router;
