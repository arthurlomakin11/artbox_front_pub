import { PrismaClient } from '@prisma/client'

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var globalPrismaInstance: PrismaClient | undefined
}

export const globalPrismaInstance =
	global.globalPrismaInstance ||
	new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.globalPrismaInstance = globalPrismaInstance