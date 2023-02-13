import React, {useEffect, useState} from "react";
import axios from "axios";
import {useStore} from "../../../store";
import {ProductsList} from "./ProductsList/ProductsList";
import {HeadFacade} from "../../HeadFacade";

export const Products = () => {
	const [products, setProducts] = useState(null) as any
	const [units, setUnits] = useState(null) as any

	const accessToken = useStore().accessToken;

	useEffect(() => {
		axios.get('/api/getProducts', {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		}).then(res => setProducts(res.data))

		axios.get('/api/getUnits', {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		}).then(res => setUnits(res.data))
	}, [])

	return (products && units) ? <>
		<HeadFacade title="Продукти"/>
		<ProductsList products={products} units={units}/>
	</> : <></>
}
