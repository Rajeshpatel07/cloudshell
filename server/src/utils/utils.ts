import Dockerode from "dockerode";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { docker } from "../index.js";
dotenv.config();

export const isImageAvailable = async (os: string): Promise<boolean> => {
	const imageList: Dockerode.ImageInfo[] = await docker.listImages();
	const image = imageList.find((img) => img.RepoTags?.includes(os));

	if (!image) {
		return false;
	}
	return true;
};

export const generateAcToken = (userId: string) => {
	const accessSecretToken = process.env.JWT_ACCESS_SECRET || "";
	return jwt.sign({ userId }, accessSecretToken);
}

export const generateRfToken = (userId: string) => {
	const refreshSecretToken = process.env.JWT_REFRESH_SECRET || "";
	return jwt.sign({ userId }, refreshSecretToken);
}

export const buildStartContainer = async (name: string, os: string): Promise<{
	container: Dockerode.Container,
	shellStream: NodeJS.ReadWriteStream,
}> => {
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
	return { container, shellStream };
}
