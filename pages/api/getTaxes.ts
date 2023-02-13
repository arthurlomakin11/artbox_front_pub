import axios from "axios";
import checkAuth from "./middleware/checkAuth";

const getTaxes = async (req:any, res:any) => {
	if(req.method === 'GET') {
		const result = await axios.get('http://localhost:4000/taxes/get', {
			params: {
				accountId: req.user.id
			}
		});

		res.send(result.data);
		res.end();
	}
}

export default checkAuth(getTaxes)