import { createServer } from 'http';
import express from "express";
import Dockerode from 'dockerode';
import WebSocket, { WebSocketServer, RawData } from "ws";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import status from 'express-status-monitor'
import router from './routes/routes.js';
import { executeCommand } from './utils/socket.js';
import { containersInterface, socketMessage } from './interface/interfaces.js';
import { randomUUID } from 'crypto';
import { isValidJSON } from './utils/utils.js';

dotenv.config();
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
export const docker = new Dockerode();
export const prisma = new PrismaClient();

const corsOptions = {
	origin: ['https://example.com', 'http://localhost:5173'],
	credentials: true,
	exposedHeaders: '*'
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1", router);
app.use(status());

export const containers: containersInterface = new Map();

wss.on("connection", (ws: WebSocket) => {
	//@ts-ignore
	ws.id = randomUUID();

	ws.on("message", (data: RawData) => {
		if (isValidJSON(data)) {
			const messageString = typeof data === 'string' ? data : data.toString();

			try {
				const message: socketMessage = JSON.parse(messageString);

				switch (message.event) {
					case "command":
						executeCommand(ws, message, containers);
						break;
					default:
						console.warn(`Unknown event type: ${message.event}`);
						break;
				}
			} catch (error) {
				console.error("Error parsing JSON:", error);
				console.error("Received message was:", messageString);
			}
		}
	});
});
const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`server started at ${port}`));
