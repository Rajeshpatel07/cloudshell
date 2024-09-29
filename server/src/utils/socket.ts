import { WebSocket } from "ws";
import { containersInterface, socketMessage } from "../interface/interfaces.js"

export const command = (ws: WebSocket, message: socketMessage, containers: containersInterface) => {
	const { containerId, command } = message;

	try {
		const container = containers.get(containerId);
		if (!container) {
			ws.send(JSON.stringify({ event: "error", msg: "container not found" }));
			return;
		}

		if (command) {
			const { shellStream } = container;
			shellStream.write(command + "\n");

			if (!container.listening) {
				shellStream.on("data", data => {
					ws.send(JSON.stringify({ event: "buffer", buffer: data.toString() }));
				});

				shellStream.on("err", err => {
					ws.send(JSON.stringify({ event: "error", buffer: err.toString() }));
				})

				container.listening = true;
			}
		}
	} catch (err) {
		console.error(err);
		ws.send(JSON.stringify({ event: "error", msg: "an unexpected error occurred" }));
	}
}
