import { WebSocket } from "ws";
import { containersInterface, socketMessage } from "../interface/interfaces.js"

export const executeCommand = (ws: WebSocket, message: socketMessage, containers: containersInterface) => {
	const { containerId, command } = message;
	//@ts-ignore
	//console.log("request comming from ->", ws.id)

	try {
		const container = containers.get(containerId);
		if (!container) {
			ws.send(JSON.stringify({ event: "error", msg: "container not found" }));
			return;
		}

		if (command) {
			const { shellStream } = container;
			shellStream.write(command);

			if (!container.listening) {
				shellStream.on("data", buffer => {
					//@ts-ignore
					return ws.send(JSON.stringify({ event: "buffer", buffer: buffer.toString() }));
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
