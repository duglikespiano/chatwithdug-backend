import * as mailDao from '../models/mailDao.js';

export const sendTestRequestMail = async (userName) => {
	return await mailDao.sendTestRequestMail(userName);
};
