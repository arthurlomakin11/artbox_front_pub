import ArtboxBackendLoading from "../../components/protected";
import React from "react";
import { logOut } from "../../functions/logOut";
import { useStore } from "../../store";
import { Taxes } from "../../components/Backend/Taxes/Taxes";

export default function taxesList() {
	const store = useStore();
	return <ArtboxBackendLoading body={Taxes} logOut={() => logOut(store)}/>
}