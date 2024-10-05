import Dockerode from "dockerode";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { docker } from "../index.js";
dotenv.config();

export const isImageAvailable = async (os: string): Promise<void> => {
	const imageList: Dockerode.ImageInfo[] = await docker.listImages();
	const image = imageList.find((img) => img.RepoTags?.includes(os));

	if (image) {
		return;
	} else {
		console.log(`Pulling image ${os}...`);
		await docker.pull(os);
		console.log(`Image ${os} has been pulled.`);
		return;
	}
};

export const generateAcToken = (userId: string) => {
	const accessSecretToken = process.env.JWT_ACCESS_SECRET || "";
	return jwt.sign({ userId }, accessSecretToken);
}

export const generateRfToken = (userId: string) => {
	const refreshSecretToken = process.env.JWT_REFRESH_SECRET || "";
	return jwt.sign({ userId }, refreshSecretToken);
}
