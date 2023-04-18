import express from 'express';
import http from 'http';
import cors from 'cors';
import router from './routers/index.js';
import { socketStart } from './middlewares/socket.js';
import { serverPort } from './env.js';
const app = express();

export const httpServer = http.createServer(app);
export const serverStart = () => {
	httpServer.listen(serverPort, () => {
		console.log(`http server is listening on port ${serverPort}`);
	});
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Expose-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		return res.end();
	} else {
		return next();
	}
});

app.use(router);

socketStart();

app.get('/ping', (req, res) => {
	res.status(200).json({ message: 'PONG!' });
});
