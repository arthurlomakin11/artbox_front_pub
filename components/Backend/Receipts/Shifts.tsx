import receiptsStyles from "./Receipts.module.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

import receiptViewStyles from "./ReceiptView.module.scss"
import ClipLoader from "react-spinners/ClipLoader";
import {HeadFacade} from "../../HeadFacade";

export const Shifts = ({ store }:any) => {
	const [secret, setSecret] = useState(null)
	const [shifts, setShifts] = useState(null)
	const [pendingShifts, setPendingShifts] = useState(false)
	const [showingZReport, setShowingZReport] = useState(null)

	async function getReceipts(cashierId: number) {
		if(cashierId != -1) {
			setShifts(null)
			setPendingShifts(true)

			const dateMonthBefore = new Date();
			dateMonthBefore.setDate(dateMonthBefore.getDate() - 30)

			const today23_59 = new Date();
			today23_59.setHours(23)
			today23_59.setMinutes(59)
			today23_59.setSeconds(59)

			const result = await axios.get('/api/getShifts', {
				params: {
					cashierId: cashierId,
					datetimeFrom: dateMonthBefore.toISOString(),
					datetimeTo: today23_59.toISOString()
				},
				headers: {
					authorization: `Bearer ${store.accessToken}`
				}
			});

			setShifts(result.data);
			setPendingShifts(false);
		}
	}

	function showZReport(ZReport:any) {
		setShowingZReport(ZReport)
	}

	function closeZReportView() {
		setShowingZReport(null);
	}

	const fetcher = async () => {
		return await axios.get('/api/getCashiers', {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})
	}

	const { data, error } = useSWR('cashiers', fetcher)

	useEffect(() => {
		if(data) setSecret(data.data)
	},[data, error]);


	if(secret) {
		return <>
			<HeadFacade title="Зміни"/>
			<div className={receiptsStyles.TopMenu}>
				<div className={receiptsStyles.TopMenuElement}>
					<span className={receiptsStyles.cashierSelector__Name}>Каса</span>
					<select className={`${receiptsStyles.Input} ${receiptsStyles.cashierInput}`}
							defaultValue={-1}
							onChange={async (e) => {
								const cashierId = Number.parseInt(e.target.value);
								await getReceipts(cashierId)
							}}>
						<option key={-1} value={-1}>Оберіть касу</option>

						{(secret as any).map((cashier:any) => {
							return <option
								key={cashier.id}
								value={cashier.id}
							>
								{cashier.object.adress}
							</option>
						})}
					</select>
				</div>
			</div>
			<div className={receiptsStyles.Body}>
				{
					shifts ? <table  className={receiptsStyles.Table}>
							<tr>
								<th>Дата відкриття</th>
								<th>Сума</th>
								<th/>
							</tr>
							{
								(shifts as any).map((shift:any, index:number) => {
									return <tr key={index}>
										<td>{shift.openedAt}</td>
										{
											shift && shift.totalSum ? <td>{shift.totalSum.sell} грн</td> : <td/>
										}
										{
											shift?.closedAt && shift.totalSum ?
												<td>
													<button onClick={() => showZReport(shift)}>Подивитися</button>
												</td>: <td/>
										}
									</tr>
								})
							}
						</table>
						: <div/>
				}
				{
					pendingShifts ? <ClipLoader loading={pendingShifts} size={15} /> :
						<div/>
				}
				{
					showingZReport ? <div className={`${receiptViewStyles.ReceiptView} ReceiptView`}>
						<div className={receiptViewStyles.ReceiptViewBottom}>
							<button onClick={print} className={receiptViewStyles.PrintButton}>
								<img width={50} src="/backend/shifts/print-outline/print-outline/64x64.png"/>
							</button>
							<button onClick={closeZReportView} className={receiptViewStyles.CloseButton}>X</button>
						</div>
						<div className={receiptViewStyles.Body}>
							<img className={receiptViewStyles.ReceiptImage} draggable={false} src={`data:image/png;base64,${(showingZReport as any)?.presentation?.image}`}/>
						</div>
					</div> : <div/>
				}
			</div>
		</>
	}
	else {
		return <></>
	}
}