import axios from "axios";
import checkAuth from "./middleware/checkAuth";

const addProduct = async (req:any, res:any) => {
	if(req.method === 'POST') {
		const result = await axios.post('http://localhost:4000/products/add', req.body, {
			headers: {
				accountId: req.user.id
			}
		});

		res.send(result.data);
		res.end();
	}
}

export default checkAuth(addProduct)