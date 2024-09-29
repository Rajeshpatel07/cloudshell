import { Request, Response } from "express";
import Dockerode from "dockerode";
import { docker, containers } from "../index.js";

export const home = (req: Request, res: Response): void => {
	res.send("Cloud Os");
}

export const buildContainer = async (req: Request, res: Response): Promise<void> => {
	console.log("call")
	const { name, os } = req.body;
	if (!os) {
		res.status(400).json({ err: "Invalid os Configuration" });
		return;
	}
	try {
		const container: Dockerode.Container = await docker.createContainer({
			Image: os,
			Cmd: ["/bin/bash"],
			name: name,
			Tty: true, // Interactive terminal
			OpenStdin: true,
			StdinOnce: false,
		})

		await container.start();

		const shellStream: NodeJS.ReadWriteStream = await container.attach({
			stdin: true,
			stdout: true,
			stderr: true,
			stream: true
		})

		containers.set(container.id, {
			container,
			shellStream
		})
		res.status(201).json({ containerId: container.id });
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
		return;
	}
}


export const pruneContainer = async (req: Request, res: Response) => {
	const { name, id } = req.body;
	if (!id) {
		res.status(400).json({ err: "Invalid ID" });
		return;
	}
	try {
		docker.pruneContainers(id)
		docker.pruneVolumes(name)
		res.status(200).json({ msg: "Container deleted Successfully" })
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err })
	}
}

export const stopContainer = async (req: Request, res: Response) => {
	const { id } = req.body;
	try {
		const container = docker.getContainer(id);
		if (!container) {
			res.status(404).json({ err: "Container not found" });
			return;
		}
		const status = await container.stop();
		console.log(status);
		containers.delete(id);
		res.status(200).json({ msg: "Container stopped" })
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
	}
}

export const restartContainer = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({ err: "invalid ID" });
		return;
	}
	try {
		const container: Dockerode.Container = docker.getContainer(id);
		if (!container) {
			res.status(404).json({ err: "Container not found" });
			return;
		}
		await container.restart();

		const shellStream: NodeJS.ReadWriteStream = await container.attach({
			stdin: true,
			stdout: true,
			stderr: true,
			stream: true
		})

		containers.set(container.id, {
			container,
			shellStream
		})
		res.status(200).json({ containerId: container.id });

	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err })
	}
}
