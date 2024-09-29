import Dockerode from "dockerode";

export type containersInterface = Map<string, {
	container: Dockerode.Container;
	shellStream: NodeJS.ReadWriteStream;
	listening?: boolean;
}>

export type socketMessage = {
	event: string;
	containerId: string;
	command?: string;
}

