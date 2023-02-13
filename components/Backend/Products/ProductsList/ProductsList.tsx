import productListStyles from "./ProductList.module.css";
import {useStore} from "../../../../store";
import React, {useState} from "react";
import axios from "axios";
import {Product, ProductUnit} from "@prisma/client";
import {ProductEditor} from "../ProductsEditor/ProductsEditor";
import {ArtboxButton} from "../../../System/ArtboxButton/ArtboxButton";
import {useForceUpdate} from "../../../../functions/useForceUpdate";
import styles from "../../Taxes/TaxesList/TaxesList.module.css";

export const ProductsList = ({ products, units }:{ products: Array<Product>, units: Array<ProductUnit> }) => {
	const [showProduct, setShowProduct] = useState<Product>()
	const [showProdIndex, setShowProdIndex] = useState<number>(-1)
	const forceUpdate = useForceUpdate();

	const store = useStore();

	const addRowHandler = async () => {
		const prodToCreate = {
			name: "",
			price: 0 as any,
			internalCode: 1,
			unitId: units[0].id,
			sellContextId: 1
		}

		const productAddRequest = await axios.post('/api/addProduct', prodToCreate, {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})

		products[products.length] = productAddRequest.data;
		forceUpdate();
	}

	const setProduct = (prod:Product, index:number) => {
		setShowProduct(prod);
		setShowProdIndex(index);
	}

	const transformProduct = (prod:Product) => {
		if(!Number.isInteger(prod.unitId)) {
			prod.unitId = Number.parseInt(prod.unitId as any);
		}
		return prod;
	}

	const productEditorSaveChanges = async (prod:Product) => {
		products[showProdIndex] = transformProduct(prod);

		setShowProduct(undefined);
		setShowProdIndex(-1);

		await axios.post('/api/updateProduct', prod, {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})
	}

	return <div className={productListStyles.main}>
		<table>
			<ProductsTableHeader/>
			<tbody>
				{
					products.map((prod, index) => {
						return <tr key={prod.id}>
							<td className={productListStyles.cell}>{prod.name}</td>
							<td className={productListStyles.cell}>{prod.price}</td>
							<td className={productListStyles.cell}>
								<ArtboxButton onClick={() => setProduct(prod, index)}>Редагувати</ArtboxButton>
							</td>
						</tr>
					})
				}
				<AddItemRow addRowHandler={addRowHandler}/>
			</tbody>
		</table>
		{
			showProduct ? <ProductEditor unitsList={units} item={showProduct} saveChanges={productEditorSaveChanges}/> : <></>
		}
	</div>
}

const AddItemRow = ({ addRowHandler }:{ addRowHandler:Function }) => {
	return <tr className={styles.AddItemRow}>
		<button onClick={addRowHandler as any}>+</button>
	</tr>
}


const ProductsTableHeader = () => {
	return <thead>
		<tr style={{ background: "#ffe4c4" }}>
			<td className={productListStyles.cell}>Назва</td>
			<td className={productListStyles.cell}>Ціна</td>
		</tr>
	</thead>
}