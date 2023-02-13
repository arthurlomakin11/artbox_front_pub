import styles from "./Seller.module.css";
import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import axios from "axios";
import { useStore } from "../../../store";
import {HeadFacade} from "../../HeadFacade";

export const Seller = () => {
	let [products, setProducts] = useState<Product[]>(null as any);

	const store = useStore();
	useEffect(() => {
		axios.get('/api/getProducts', {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		}).then(data => setProducts(data.data))
	}, [])

	return products ? <>
		<HeadFacade title="Каса"/>
		<Grid items={products}/>
	</> : <></>
}

const Grid = ({items}:{items:Product[]}) => {
	return <div className={styles.Grid}>
		{
			items.map(item => {
				return <div className={styles.GridItem} key={item.id}>
					{item.name}
				</div>
			})
		}
	</div>
}