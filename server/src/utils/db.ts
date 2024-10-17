import { prisma } from "../index.js";


export const newContainer = async (name: string, id: string, image: string, userId: string, status: string) => {
	const container = await prisma.container.create({
		data: {
			id,
			name,
			image,
			status,
			userId
		}
	})

	return container;
}

export const deleteContainer = async (id: string) => {
	const container = await prisma.container.delete({
		where: { id }
	})
	return container;
}

export const changeContainerStatus = async (id: string, status: string) => {
	const container = await prisma.container.update({
		where: { id },
		data: { status }
	})
	return container;
}

export const listContainers = async (userId: string) => {
	const list = await prisma.container.findMany({
		where: { userId },
		select: {
			id: true,
			name: true,
			status: true,
			createdAt: true,
		}
	});

	return list;
}

export const signUp = async (name: string, email: string, password: string) => {
	const user = await prisma.user.create({
		data: {
			name,
			email,
			password
		}
	})
	return user;
}

export const getUser = async (email: string) => {
	const user = await prisma.user.findFirst({
		where: { email }
	})

	return user;
}

export const getContainer = async (id: string) => {

	const container = await prisma.container.findFirst({
		where: { id }
	});
	return container;;
}
