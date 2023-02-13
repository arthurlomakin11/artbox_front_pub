import axios from "axios";

export default async (req:any, res:any) => {
	if(req.method === 'POST') {
		const result = await axios.post('http://localhost:4000/receipt/get', {
			cashierId: req.body.cashierId,
			startDate: req.body.startDate, // seconds from 1970
			endDate: req.body.endDate
		});

		res.send(result.data);
		res.end();
	}
}