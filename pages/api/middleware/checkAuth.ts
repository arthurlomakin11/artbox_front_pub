import { verify } from "jsonwebtoken"
import { globalPrismaInstance } from "../../../functions/initPrisma";

const checkAuth = (handler:any) => {
    return async (req:any, res:any) => {
        try {
            const authorization = req.headers["authorization"]
            if (!authorization) throw new Error("not authenticated")

            const token = authorization.split(" ")[1]

            let tokenUnwrapped:any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

            req.user = await globalPrismaInstance.account.findUnique({
               where: {
                   id: tokenUnwrapped.userId
               }
            });

            return handler(req, res)
        }
        catch (e) {
            console.log(e)
            res.status(401).send()
        }
    }
}

export default checkAuth