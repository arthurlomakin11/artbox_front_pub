import ArtboxBackendLoading from "../../components/protected";
import {XReport} from "../../components/Backend/Reports/XReport";
import React from "react";
import {logOut} from "../../functions/logOut";
import { useStore } from "../../store";

export default function xReport() {
	const store = useStore();
	return <ArtboxBackendLoading body={XReport} logOut={() => logOut(store)}/>
}