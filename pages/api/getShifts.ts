import axios from "axios";

export default async (req:any, res:any) => {
	if(req.method === 'GET') {
		const report = await axios.get("http://localhost:4000/shifts/get", {
			params: {
				cashierId: req.query.cashierId,
				offset: req.query.offset,
				limit: req.query.limit,
				includeImagePresentation: true,
				datetimeFrom: req.query.datetimeFrom,
				datetimeTo: req.query.datetimeTo
			}
		})

		res.send(report.data);
		res.end();
	}
}