import ReactDatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';
setDefaultLocale("uk");
registerLocale('uk', uk);

import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";
import reportsStyles from "./Reports.module.css"
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {ArtboxButton} from "../../System/ArtboxButton/ArtboxButton";
import {HeadFacade} from "../../HeadFacade";

export const ZReport = ({ store }:any) => {
	const [value, setValue] = useState(-1);
	const [secret, setSecret] = useState(null)
	const [report, setReport] = useState(null)
	const [pendingReport, setPendingReport] = useState(false)

	async function createReport(cashierId: number) {
		if(cashierId !== -1) {
			setReport(null);
			setPendingReport(true);
			const result = await axios.post('/api/getPeriodicalReport', {
				cashierId: cashierId,
				startDate: startDate.getTime(), // seconds from 1970
				endDate: endDate.getTime()
			}, {
				headers: {
					authorization: `Bearer ${store.accessToken}`
				}
			});
			setReport(result.data);
			setPendingReport(false);
		}
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
			<HeadFacade title="Періодичні звіти"/>
			<div className={reportsStyles.TopMenu}>
				<div className={reportsStyles.TopMenuElement}>
					<span className={reportsStyles.cashierSelector__Name}>Каса</span>
					<select className={`${reportsStyles.Input} ${reportsStyles.cashierInput}`}
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

				<div className={reportsStyles.TopMenuElement}>
					<span className={reportsStyles.dateSelector__Name}>Починаючи з</span>
					<ReactDatePicker className={`${reportsStyles.Input} ${reportsStyles.DatePicker}`} selected={startDate} onChange={(date:any) => setStartDate(DateTo00Time(date))} dateFormat="dd.MM.yyyy"/>
				</div>

				<div className={reportsStyles.TopMenuElement}>
					<span className={reportsStyles.dateSelector__Name}>Закінчуючи</span>
					<ReactDatePicker className={`${reportsStyles.Input} ${reportsStyles.DatePicker}`} selected={endDate} onChange={(date:any) => setEndDate(DateTo00Time(date))} dateFormat="dd.MM.yyyy"/>
				</div>

				<ArtboxButton onClick={async () => await createReport(value)}>
					<>
						Створити звіт
						<ClipLoader loading={pendingReport} css={CreateReportButton__ClipLoader} size={15} />
					</>
				</ArtboxButton>
			</div>
			{
				report ? <div className={reportsStyles.Body}>
						{
							(report as any).map((payform:any, index:number) => {
								if(payform.code == 1) {
									return <div key={index}>Картка: {payform.sum} грн</div>
								}
								else if(payform.code == 0) {
									return <div key={index}>Готівка: {payform.sum} грн</div>
								}
								else {
									return <div key={index}/>
								}
							})
						}
					</div>
					: <div/>
			}
		</div>
	}
	else {
		return <div/>
	}
}