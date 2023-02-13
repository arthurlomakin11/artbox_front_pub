import ReactDatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';
setDefaultLocale("uk");
registerLocale('uk', uk);

import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";
import receiptsStyles from "./Receipts.module.css"
import { css } from "@emotion/react";
import React, {createRef, useEffect, useState} from "react";
import axios from "axios";
import useSWR from "swr";

import receiptViewStyles from "./ReceiptView.module.scss"
import {ArtboxButton} from "../../System/ArtboxButton/ArtboxButton";
import {HeadFacade} from "../../HeadFacade";
import {getTimeZoneOffset} from "../../../functions/getTimeZoneOffset";

export const Receipts = ({ store }:any) => {
	const [value, setValue] = useState(-1);
	const [secret, setSecret] = useState(null)
	const [receipts, setReceipts] = useState(null)
	const [pendingReceipts, setPendingReceipts] = useState(false)
	const [showingReceipt, setShowingReceipt] = useState(null)

	async function getReceipts(cashierId: number) {
		if(cashierId !== -1) {
			setReceipts(null);
			setPendingReceipts(true);

			const endDatePlusDay = new Date(endDate);
			endDatePlusDay.setDate(endDatePlusDay.getDate() + 1);
			endDatePlusDay.setTime(endDatePlusDay.getTime() + getTimeZoneOffset(endDatePlusDay));

			const startDateChanged = new Date(startDate);
			startDateChanged.setTime(startDateChanged.getTime() + getTimeZoneOffset(startDateChanged));

			const result = await axios.post('/api/getReceipts', {
				cashierId: cashierId,
				startDate: startDateChanged.getTime(), // seconds from 1970
				endDate: endDatePlusDay.getTime()
			}, {
				headers: {
					authorization: `Bearer ${store.accessToken}`
				}
			});
			setReceipts(result.data);
			setPendingReceipts(false);
		}
	}

	function showReceipt(receipt:any) {
		setShowingReceipt(receipt)
	}

	function closeReceiptView() {
		setShowingReceipt(null);
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
	},[data, error])


	const DateTo00Time = (oldDate:Date) => new Date(oldDate.setHours(0,0,0,0));

	const [startDate, setStartDate] = useState(DateTo00Time(new Date()));
	const [endDate, setEndDate] = useState(DateTo00Time(new Date()));


	const CreateReportButton__ClipLoader = css`
		margin-left: 5px;
	`;

	if(secret) {
		return <div>
			<HeadFacade title="Чеки"/>
			<div className={receiptsStyles.TopMenu}>
				<div className={receiptsStyles.TopMenuElement}>
					<span className={receiptsStyles.cashierSelector__Name}>Каса</span>
					<select className={`${receiptsStyles.Input} ${receiptsStyles.cashierInput}`}
							defaultValue={-1}
							onChange={(e) => {
								setValue(Number.parseInt(e.target.value))
							}}>
						<option key={-1} value={-1}>Оберіть касу</option>

						{(secret as any).map((cashier:any, index:number) => {
							return <option
								key={cashier.id}
								value={cashier.id}
							>
								{cashier.object.adress}
							</option>
						})}
					</select>
				</div>

				<div className={receiptsStyles.TopMenuElement}>
					<span className={receiptsStyles.dateSelector__Name}>Починаючи з</span>
					<ReactDatePicker className={`${receiptsStyles.Input} ${receiptsStyles.DatePicker}`} selected={startDate} onChange={(date:any) => setStartDate(DateTo00Time(date))} dateFormat="dd.MM.yyyy"/>
				</div>

				<div className={receiptsStyles.TopMenuElement}>
					<span className={receiptsStyles.dateSelector__Name}>Закінчуючи</span>
					<ReactDatePicker className={`${receiptsStyles.Input} ${receiptsStyles.DatePicker}`} selected={endDate} onChange={(date:any) => setEndDate(DateTo00Time(date))} dateFormat="dd.MM.yyyy"/>
				</div>


				<ArtboxButton onClick={async () => await getReceipts(value)}>
					<>
						Створити звіт
						<ClipLoader loading={pendingReceipts} css={CreateReportButton__ClipLoader} size={15} />
					</>
				</ArtboxButton>
			</div>
			{
				receipts ? <div className={receiptsStyles.Body}>
						<table className={receiptsStyles.Table}>
							<tr>
								<th>Дата додавання</th>
								<th>Сума</th>
								<th></th>
							</tr>
							{
								(receipts as any).map((receipt:any, index:number) => {
									return <tr key={index}>
										<td>{receipt.datetimeCreated}</td>
										<td>{receipt.sum}</td>
										<td>
											<button onClick={() => showReceipt(receipt)}>Подивитися</button>
										</td>
									</tr>
								})
							}
						</table>
					</div>
					: <div/>
			}
			{
				showingReceipt ? <dialog tabIndex={-1} ref={el => el?.focus()} className={receiptViewStyles.ReceiptView} open>
					<table>
						<tr>
							<th>Назва</th>
							<th>Ціна</th>
							<th>Кількість</th>
							<th>Сума</th>
						</tr>
						{(showingReceipt as any).products.map((product:any, index:number) => {
							return <tr key={index}>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.quantity}</td>
								<td>{product.sum}</td>
							</tr>
						})}
					</table>
					<button onClick={() => closeReceiptView()} className={receiptViewStyles.CloseButton}>X</button>
				</dialog> : <div/>
			}
		</div>
	}
	else {
		return <div/>
	}
}