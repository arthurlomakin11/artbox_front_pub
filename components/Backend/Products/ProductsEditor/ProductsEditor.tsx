import productEditorStyles from "./ProductEditor.module.css";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Product, ProductUnit} from "@prisma/client";

export const ProductEditor = ({ item, unitsList, saveChanges }:{ item:Product, unitsList: Array<ProductUnit>, saveChanges: any }) => {
	const { register, getValues, reset } = useForm<Product>({
		defaultValues: item
	});

	useEffect(() => {
		reset(item);
	}, [item]);

	return <section className={productEditorStyles.dialog}>
		<div className={productEditorStyles.body}>
			<form>
				<label>
					<div>Назва</div>
					<input {...register("name")} />
				</label>
				<label>
					<div>Ціна</div>
					<input {...register("price")} />
				</label>
				<label>
					<div>УКТЗЕД</div>
					<input {...register("uktzed")} />
				</label>
				<label>
					<div>Одиниця виміру</div>
					<select {...register("unitId")}>
						{
							unitsList.map(unit => {
								return <option value={unit.id} key={unit.id}>{unit.name}</option>
							})
						}
					</select>
				</label>
			</form>
			<button onClick={async () => await saveChanges(getValues())}>X</button>
		</div>
	</section>
}