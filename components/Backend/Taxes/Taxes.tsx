import React, {useEffect, useState} from "react";
import axios from "axios";
import {useStore} from "../../../store";
import {TaxesList} from "./TaxesList/TaxesList";
import {HeadFacade} from "../../HeadFacade";

export const Taxes = () => {
	const [taxes, setTaxes] = useState(null) as any

	const accessToken = useStore().accessToken;

	useEffect(() => {
		axios.get('/api/getTaxes', {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		}).then(res => setTaxes(res.data))
	}, [])

	return taxes ? <>
		<HeadFacade title="Податки"/>
		<TaxesList taxes={taxes}/>
	</> : <></>
}
