import ArtboxBackendLoading from "../../components/protected";
import { Shifts } from "../../components/Backend/Receipts/Shifts";
import React from "react";
import { logOut } from "../../functions/logOut";
import { useStore } from "../../store";

export default function receipts() {
	const store = useStore();
	return <ArtboxBackendLoading body={Shifts} logOut={() => logOut(store)}/>
}