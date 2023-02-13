import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../functions/auth'
import { globalPrismaInstance } from '../../functions/initPrisma'

export default async (req:any, res:any) => {
    const {email, name, password} = JSON.parse(req.body)
    
    //checking if someone have used the email
    const checkIfExist = await globalPrismaInstance.account.findUnique({
        where: {
            email
        }
    })

    if(checkIfExist) return res.status(409).send()

    const user = await globalPrismaInstance.account.create({
        data: {
            email,
            name,
            password
        }
    })

    const token = createRefreshToken(user)
    sendRefreshToken(res,token)
    
    const accessToken = createAccessToken(user)
    res.send({user,accessToken})
}