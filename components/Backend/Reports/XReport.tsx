import { registerLocale, setDefaultLocale } from  "react-datepicker";
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

export const XReport = ({ store }:any) => {
	const [value, setValue] = useState(-1);
	const [secret, setSecret] = useState(null)
	const [report, setReport] = useState(null) as any
	const [pendingReport, setPendingReport] = useState(false)

	async function createReport(cashierId: number) {
		if(cashierId !== -1) {
			setReport(null);
			setPendingReport(true);
			const result = await axios.post('/api/getXReport', {
				cashierId: cashierId
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

	const CreateReportButton__ClipLoader = css`
		margin-left: 5px;
	`;

	if(secret) {
		return <div>
			<HeadFacade title="X-звіти"/>
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

				<ArtboxButton onClick={async () => await createReport(value)}>
					<>
						Створити звіт
						<ClipLoader loading={pendingReport} css={CreateReportButton__ClipLoader} size={15} />
					</>
				</ArtboxButton>
			</div>
			{
				(report && report.Totals && report.Totals.Real) ? <div className={reportsStyles.Body}>
						{
							report.Totals.Real.PayForm.map((payform:any, index:number) => {
								if(payform.PayFormCode == 1) {
									return <div key={index}>Картка: {payform.Sum} грн</div>
								}
								else if(payform.PayFormCode == 0) {
									return <div key={index}>Готівка: {payform.Sum} грн</div>
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