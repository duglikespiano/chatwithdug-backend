// import { Server } from 'socket.io';
import { Server } from 'socket.io';
import { httpServer } from '../app.js';
import { findUserByToken } from './auth.js';

// 접속 된 모든 사용자의 정보를 담을 배열
let connector = [];

export const checkUser = async (req, res) => {
	console.log(req.body);
	let count = 0;
	const { name } = req.body;
	try {
		const checkIfConnected = () => {
			connector.forEach((item) => {
				if (item.userName.includes(name)) {
					count++;
				}
			});
		};

		checkIfConnected();

		if (count !== 0) {
			throw new Error('ALREADY CONNECTED BY THE USERNAME');
		} else {
			res.status(200).json({ message: 'GOOD TO GO' });
			count = 0;
		}
	} catch (error) {
		console.error(error);
		error.statusCode = 400;
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const socketStart = () => {
	const wsServer = new Server(httpServer);
	// const socketConnectorIds = [...socket.adapter.sids.keys()];
	console.log('다시 시작하자!');

	// 사용자가 main page에 접속 시, socket server에 접속
	wsServer.on('connection', (socket) => {
		console.log(`Socket ID ${socket.id} is connected!`);
		// socket server에 접속한 사용자의 socket.id를 반환
		wsServer.to(socket.id).emit('getSocketId', socket.id);

		// 사용자가 로그인을 완료하여 lobby에 접속 할 경우, 현재 lobby에 접속한 모든 사용자 정보를 반환
		// 사용자가 로그인 할 때, session storage에 token을 저장하고 그것을 backend에 전달하여 userName식별
		socket.on('joinlobby', (token) => {
			const userName = findUserByToken(token);
			const userData = {
				userName,
				userSocketId: socket.id,
				status: false,
			};
			connector.push(userData);
			wsServer.emit('joinlobby', connector);
		});

		// 사용자가 페이지를 닫을 때, 현재 lobby에 접속한 모든 사용자 정보를 갱신
		socket.on('disconnecting', (reason) => {
			const socketConnectorRooms = [...socket.adapter.rooms.keys()];
			console.log([...socket.adapter.rooms.keys()]);

			let arrayIncludeSocket = [];

			socketConnectorRooms.forEach((item) => {
				if (item.includes(socket.id)) {
					arrayIncludeSocket.push(item);
				}
			});

			console.log(`Socket ID ${socket.id} has disconnected!`);
			connector.splice(
				connector.findIndex((item) => item.userSocketId === socket.id),
				1
			);

			wsServer
				.to(arrayIncludeSocket[1])
				.emit('leaveRoomNotification', `${socket.id} 나갑니다~`);
			wsServer.emit('refreshlobby', connector);
		});

		// 사용자가 lobby에서 뒤로가기 버튼을 누를 때, 현재 lobby에 접속한 모든 사용자 정보를 갱신
		socket.on('backButton', (reason) => {
			console.log(`Socket ID ${socket.id} is disconnected!`);
			connector.splice(
				connector.findIndex((item) => item.userSocketId === socket.id),
				1
			);
			wsServer.emit('refreshlobby', connector);
		});

		// 사용자 초대
		socket.on('invite', (myWsId, toWsId, toWsName) => {
			wsServer.to(toWsId).emit('invite', myWsId, toWsId, toWsName);
		});

		// 사용자 초대수락
		socket.on('inviteAccepted', (toWsId, myWsId) => {
			// 초대를 받은 사람이 수락한 경우,

			// TODO 이 시점에서 처음으로 정해지니 공유하면 될 듯, 이 시점에서 이동하는 것은 초대를 '한' 사람이니 초대를 '받은' 사람에게 방 번호 보내줘야함
			// TODO 초대 한 사람이나 받은 사람이나 한 번에 보내버릴까?
			// socket.join(myWsId + toWsId);
			// 초대를 '한' 사람과 초대를 '받은' 사람의 socketId를 합쳐 만든 이름의 방에 입장
			wsServer
				.to(toWsId)
				.to(myWsId)
				.emit('roomNumber', myWsId + toWsId); // TODO 이 시점에서 처음으로 정해지니 공유하면 될 듯

			// 초대를 한 사람에게 '초대수락' 메세지와 나의 초대를 한 사람의 socketId, 초대를 받은 사람은 socketId를 전달
			wsServer.to(toWsId).emit('inviteAccepted', true, myWsId);
		});

		// 사용자 초대수락
		socket.on('inviteDenied', (userSocketId1, boolean) => {
			const index = connector.findIndex(
				(item) => item.userSocketId === userSocketId1
			);
			if (index !== -1) {
				connector[index].status = boolean;
			}
			wsServer.emit('refreshlobby', connector);
			wsServer.to(userSocketId1).emit('inviteDenied', false);
		});

		// 사용자 채팅 소켓 접속
		socket.on('joinChatRoom', (roomNumber) => {
			socket.join(roomNumber);
		});

		// 사용자 채팅 입력
		socket.on(
			'chatContents',
			(element1, element2, element3, element4, element5, element6) => {
				const data = {
					fromUserName: element1,
					fromSocketId: element2,
					toUserName: element3,
					toSocketId: element4,
					text: element5,
					roomNumber: element6,
				};

				wsServer.to(element6).emit('chatContents', data);
			}
		);

		socket.on('roomNumber', (msg) => {
			console.log(socket.rooms, '98번줄');
		});

		socket.on('status', (msg, boolean) => {
			const index = connector.findIndex((item) => item.userSocketId === msg);
			if (index !== -1) {
				connector[index].status = boolean;
			}
			wsServer.emit('refreshlobby', connector);
		});

		// 사용자 채팅창 이탈 시 알림
		socket.on('leaveRoomNotification', (element1, element2, element3) => {
			wsServer.to(element2).emit('leaveRoomNotification', element1, element3);
			socket.leave(element2);
			console.log([...socket.adapter.rooms.keys()]);
		});

		socket.on('typing', (element1, element2) => {
			wsServer.to(element1).emit('typing', `${element2} is typing...`);
		});
	});
};
