import { globalPrismaInstance } from '../../functions/initPrisma'
import {verify} from "jsonwebtoken";


export default async (req:any, res:any) => {
	if(req.method === 'GET') {
		const authorization = req.headers["authorization"]
		if (!authorization) throw new Error("not authenticated")

		const token = authorization.split(" ")[1]
		let tokenUnwrapped:any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

		const foundEntrepreneurs = await globalPrismaInstance.entrepreneur.findMany({
			where: {
				account: {
					id: tokenUnwrapped.userId
				}
			}
		})

		console.log(foundEntrepreneurs)


		res.send(foundEntrepreneurs);
		res.end();
	}
}