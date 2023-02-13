import ArtboxBackendLoading from "../../components/protected";
import {Receipts} from "../../components/Backend/Receipts/Receipts";
import React from "react";
import {logOut} from "../../functions/logOut";
import { useStore } from "../../store";

export default function receipts() {
	const store = useStore();
	return <ArtboxBackendLoading body={Receipts} logOut={() => logOut(store)}/>
}