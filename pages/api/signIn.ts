import { globalPrismaInstance } from '../../functions/initPrisma'
import {createAccessToken, createRefreshToken, sendRefreshToken} from '../../functions/auth'


export default async (req:any, res:any) => {
	if(req.method === 'POST') {
		const {email, password} = JSON.parse(req.body)
		let user:any = await globalPrismaInstance.account.findUnique({
			where: {
				email: email
			}
		});

		const userForTheClient = {
			id: user.id,
			name: user.name,
			email: user.email
		}

		if(user.password === password) {
			const token = createRefreshToken(user)
			sendRefreshToken(res,token)
			const accessToken = createAccessToken(user)
			res.send({ user:userForTheClient,accessToken })
		}
		else {
			res.status(404).send()
		}
	}
}