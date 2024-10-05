import { createServer } from 'http';
import express from "express";
import Dockerode from 'dockerode';
import WebSocket, { WebSocketServer, RawData } from "ws";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import router from './routes/routes.js';
import { command } from './utils/socket.js';
import { containersInterface, socketMessage } from './interface/interfaces.js';

dotenv.config();
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
export const docker = new Dockerode();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", router);

export const containers: containersInterface = new Map();

wss.on("connection", (ws: WebSocket) => {

	ws.send(JSON.stringify({ event: 'connect', msg: "connection successfull" }))

	ws.on("message", (data: RawData) => {
		const messageString = typeof data === 'string' ? data : data.toString();
		const message: socketMessage = JSON.parse(messageString);
		switch (message.event) {
			case "command": command(ws, message, containers);
				break;
		}
	})
	ws.on("close", () => {
		console.log("disconnected");
	})
})

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`server started at ${port}`));
