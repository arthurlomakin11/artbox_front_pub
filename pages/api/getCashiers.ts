import { globalPrismaInstance } from '../../functions/initPrisma'
import {verify} from "jsonwebtoken";


export default async (req:any, res:any) => {
	if(req.method === 'GET') {
		const authorization = req.headers["authorization"]
		if (!authorization) throw new Error("not authenticated")

		const token = authorization.split(" ")[1]
		let tokenUnwrapped:any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

		const foundCashiers = await globalPrismaInstance.cashier.findMany({
			where: {
				object: {
					organization: {
						entrepreneur: {
							account: {
								id: tokenUnwrapped.userId
							}
						}
					}
				}
			},
			include: {
				object: {
					include: {
						organization: {
							include: {
								entrepreneur: {
									include: {
										account: true
									}
								}
							}
						}
					}
				}
			}
		})

		res.send(foundCashiers);
		res.end();
	}
}