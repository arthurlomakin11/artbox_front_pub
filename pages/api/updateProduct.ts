import axios from "axios";
import checkAuth from "./middleware/checkAuth";

const updateProduct = async (req:any, res:any) => {
	if(req.method === 'POST') {
		const result = await axios.post('http://localhost:4000/products/update', req.body, {
			headers: {
				accountId: req.user.id
			}
		});

		res.send(result.data);
		res.end();
	}
}

export default checkAuth(updateProduct)