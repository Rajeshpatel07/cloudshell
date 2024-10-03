import Dockerode from "dockerode";
import { docker } from "../index.js";

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
