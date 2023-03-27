import express from 'express';
import * as validateCodeController from '../controllers/validateController.js';

const router = express.Router();

router.get('/', (req, res) => {
	validateCodeController.requestValidateCode(req, res);
});

router.post('/', (req, res) => {
	validateCodeController.checkValidateCode(req, res);
});

export default router;
