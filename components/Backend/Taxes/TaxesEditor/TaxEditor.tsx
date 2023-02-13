import styles from "./TaxEditor.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TaxElement } from "@prisma/client";

export const TaxEditor = ({ item, saveChanges }:{ item:TaxElement, saveChanges: any }) => {
	const { register, getValues, reset } = useForm<TaxElement>({
		defaultValues: item
	});

	useEffect(() => {
		reset(item);
	}, [item]);

	return <section className={styles.dialog}>
		<div className={styles.body}>
			<form>
				<label>
					<div>Назва</div>
					<input {...register("name")} />
				</label>
				<label>
					<div>Літера</div>
					<input {...register("letter")} />
				</label>
			</form>
			<button onClick={async () => await saveChanges(getValues())}>X</button>
		</div>
	</section>
}