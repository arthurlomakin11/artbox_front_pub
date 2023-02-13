import cookie from "cookie"

export default (req:any, res:any) => {
    if(req.method === 'POST') {
        // deletes refresh token
        res.setHeader('Set-Cookie', cookie.serialize('refreshToken','', {
            httpOnly: true,
            maxAge: 0,
            path: '/'
        }))
        res.send();
    }
}