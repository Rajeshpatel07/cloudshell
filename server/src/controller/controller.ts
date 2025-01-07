import { Request, Response } from "express";
import Dockerode from "dockerode";
import { hash, compare } from 'bcrypt'
import { docker, containers } from "../index.js";
import { buildStartContainer, generateAcToken, generateRfToken, isImageAvailable } from "../utils/utils.js";
import { changeContainerStatus, getContainer, getUser, listContainers, newContainer, signUp } from "../utils/db.js";

export const home = (req: Request, res: Response) => {
	return res.status(200).json({ platform: "Cloudshell" });
}

export const signup = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400).json({ err: "All fields are mandatory" });
		return;
	}
	try {
		const hashPassword = await hash(password, 10);
		const user = await signUp(name, email, hashPassword);
		//console.log(user);
		res.status(201).json({ userId: user.id })
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err })
	}
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ err: "Invalid email or password" });
	}
	try {
		const user = await getUser(email);
		if (user) {
			const comparePassword = await compare(password, user.password);
			if (comparePassword) {
				res.cookie("acToken", generateAcToken(user.id), { maxAge: 1000 * 60 * 10, sameSite: true });
				res.cookie("rfToken", generateRfToken(user.id), { maxAge: 1000 * 60 * 24, httpOnly: true, sameSite: true });
				res.status(201).json({ userId: user.id });
			} else {
				res.status(401).json({ err: "incorrect password" })
			}
		} else {
			res.status(404).json({ err: "user not found" })
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err || 'Token generation error' });
	}
}

export const tryDemo = async (req: Request, res: Response): Promise<void> => {
	const { name, os } = req.body;
	if (!os) {
		res.status(400).json({ err: "Invalid os Configuration" });
		return;
	}
	try {
		const imageExist = await isImageAvailable(os);
		if (!imageExist) {
			res.status(404).json({ err: "No such Image exist" });
			return;
		}
		const { container, shellStream } = await buildStartContainer(name, os);
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

export const buildContainer = async (req: Request, res: Response): Promise<void> => {
	const { name, os, userId } = req.body;
	if (!os) {
		res.status(400).json({ err: "Invalid os Configuration" });
		return;
	}
	try {
		const imageExist = await isImageAvailable(os);
		if (!imageExist) {
			res.status(404).json({ err: "No such Image exist" });
			return;
		}
		const { container, shellStream } = await buildStartContainer(name, os);
		containers.set(container.id, {
			container,
			shellStream
		})
		await newContainer(name, container.id, os, userId, "running");

		res.status(201).json({ containerId: container.id });
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
		return;
	}
}


export const pruneContainer = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({ err: "Invalid ID" });
		return;
	}
	try {
		docker.pruneContainers(id)
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
			res.status(400).json({ err: "Container not found" });
			return;
		}
		await container.stop();
		containers.delete(id);
		const status = await changeContainerStatus(id, "stopped");
		//console.log(status);
		res.status(200).json({ msg: status.status })
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
	}
}

export const restartContainer = async (req: Request, res: Response) => {
	const { id } = req.body;
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
		const status = await changeContainerStatus(id, "running");
		res.status(200).json({ containerId: container.id });

	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err })
	}
}

export const userContainers = async (req: Request, res: Response) => {
	const { userId } = req.params;
	//console.log(userId);
	if (!userId) {
		res.status(403).json({ err: "invalid userId" });
		return;
	}
	try {
		const list = await listContainers(userId);
		res.status(200).json({ containers: list });
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
	}
}

export const contianerInfo = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		res.status(403).json({ err: "id not found" });
		return;
	}

	try {
		const contianer = await getContainer(id);
		if (!contianer) {
			res.status(404).json({ err: "Container not Found" });
			return;
		}
		res.status(200).json({ info: contianer });
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err });
	}
}

export const logout = (req: Request, res: Response) => {
	res.cookie("acToken", '', { maxAge: 1, httpOnly: true, sameSite: true });
	res.cookie("rfToken", '', { maxAge: 1, httpOnly: true, sameSite: true });
	res.status(200).json({ msg: "success" });
	return;
}
