import checkAuth from './middleware/checkAuth'

const protectedRoute = async (req:any, res:any) => {
    if(req.method === 'GET') {
        //secret data
        res.send(req.user)
    }
}

export default checkAuth(protectedRoute)