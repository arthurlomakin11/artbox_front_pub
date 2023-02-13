import receiptsStyles from "./Backend/Receipts/Receipts.module.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "./ReactTable/Table";
import {
	CellValueChangedEvent,
	CellValueChangeObserver,
	RowAddedEvent,
	RowAddedObserver
} from "./ReactTable/TableChangesObserver";
import {observable} from "mobx";
import {DataTypes} from "./ReactTable/utils";
import {observer} from "mobx-react";

let accessToken:any = null;

let columns = [
	{
		id: 'name',
		label: 'Назва',
		accessor: 'name',
		minWidth: 100,
		dataType: DataTypes.TEXT,
		options: [],
	},
	{
		id: 'price',
		label: 'Ціна',
		accessor: 'price',
		width: 80,
		dataType: DataTypes.NUMBER,
		options: [],
	},
];

export const ProductsOld = observer(({ store }:any) => {
	const [state, setState] = useState(null) as any

	accessToken = store.accessToken;

	const fetcher = async () => {
		return await axios.get('/api/getProducts', {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})
	}

	useEffect(() => {
		fetcher().then(res => {
			const tableState = observable({
				state: {
					columns: columns,
					data: res.data,
					skipReset: false
				},
				addRow: async () => {
					const r = await RowAddedObserver.fire({
						value: {
							id: undefined as any,
							uktzed: null,
							name: "",
							quantity: 1 as any,
							price: 1 as any,
							internalCode: 1,
							unitId: 1,
							sellContextId: 1
						}
					})
					tableState.state.data.push(r);
					console.log(tableState.state);
				},
				updateCell: async (columnId:number, rowIndex:number, value:any) => {
					const oldValue = tableState.state.data[rowIndex][columnId];

					tableState.state.data[rowIndex][columnId] = value;

					await CellValueChangeObserver.fire({
						oldValue: oldValue,
						newValue: value,
						changedObject: tableState.state.data[rowIndex]
					})
				}
			});
			setState(tableState);
			console.log(tableState)
		})
	}, []);

	console.log("Taxes render")

	return state ? <ProductsBody state={state}/> : <></>;
})

CellValueChangeObserver.subscribe(async (e:CellValueChangedEvent) => {
	const result = await axios.post('/api/updateProduct', e.changedObject, {
		headers: {
			authorization: `Bearer ${accessToken}`
		}
	})

	console.log("updateProduct: " + JSON.stringify(result.data));
})

RowAddedObserver.subscribe(async (e:RowAddedEvent) => {
	const result = await axios.post('/api/addProduct', e.value, {
		headers: {
			authorization: `Bearer ${accessToken}`
		}
	})

	console.log("addProduct: " + JSON.stringify(result.data));
	return result.data;
})

const ProductsBody = (state:any) => {
	return <div className={receiptsStyles.Body}>
		<Table state={state}/>
	</div>
}