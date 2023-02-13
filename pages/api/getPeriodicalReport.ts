import axios from "axios";

export default async (req:any, res:any) => {
	if(req.method === 'POST') {
		const report = await axios.post("http://localhost:4000/periodicalReport/create", {
			cashierId: req.body.cashierId,
			startDate: req.body.startDate,
			endDate: req.body.endDate
		})

		res.send(report.data);
		res.end();
	}
}