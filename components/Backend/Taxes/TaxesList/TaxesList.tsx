import styles from "./TaxesList.module.css";
import {useStore} from "../../../../store";
import React, {useState} from "react";
import axios from "axios";
import {TaxElement} from "@prisma/client";
import {TaxEditor} from "../TaxesEditor/TaxEditor";
import {ArtboxButton} from "../../../System/ArtboxButton/ArtboxButton";
import {useForceUpdate} from "../../../../functions/useForceUpdate";

export const TaxesList = ({ taxes }:{ taxes: Array<TaxElement> }) => {
	const [showTax, setShowTax] = useState<TaxElement>()
	const [showTaxIndex, setShowTaxIndex] = useState<number>(-1)
	const forceUpdate = useForceUpdate();

	const store = useStore();

	const setTax = (prod:TaxElement, index:number) => {
		setShowTax(prod);
		setShowTaxIndex(index);
	}

	const editorSaveChanges = async (tax:TaxElement) => {
		taxes[showTaxIndex] = tax;

		setShowTax(undefined);
		setShowTaxIndex(-1);

		await axios.post('/api/updateTax', tax, {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})
	}

	const addRowHandler = async () => {
		const taxToCreate = {
			name: "",
			letter: "",
			percent: 0 as any,
			typeId: 1
		}

		const taxAddRequest = await axios.post('/api/addTax', taxToCreate, {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})

		taxes[taxes.length] = taxAddRequest.data;
		forceUpdate();
	}

	return <div className={styles.main}>
		<table>
			<TableHeader/>
			<tbody>
				{
					taxes.map((tax, index) => {
						return <tr key={tax.id}>
							<td className={styles.cell}>{tax.name}</td>
							<td className={styles.cell}>{tax.letter}</td>
							<td className={styles.cell}>
								<ArtboxButton onClick={() => setTax(tax, index)}>Редагувати</ArtboxButton>
							</td>
						</tr>
					})
				}
				<AddItemRow addRowHandler={addRowHandler}/>
			</tbody>
		</table>
		{
			showTax ? <TaxEditor item={showTax} saveChanges={editorSaveChanges}/> : <></>
		}
	</div>
}

const AddItemRow = ({ addRowHandler }:{ addRowHandler:Function }) => {
	return <tr className={styles.AddItemRow}>
		<button onClick={addRowHandler as any}>+</button>
	</tr>
}

const TableHeader = () => {
	return <thead>
		<tr style={{ background: "#ffe4c4" }}>
			<td className={styles.cell}>Назва</td>
			<td className={styles.cell}>Ціна</td>
		</tr>
	</thead>
}