import axios from "axios";

export default async (req:any, res:any) => {
	if(req.method === 'POST') {
		const report = await axios.post("http://localhost:4000/xReport/create", {
			cashierId: req.body.cashierId,
		})

		res.send(report.data);
		res.end();
	}
}