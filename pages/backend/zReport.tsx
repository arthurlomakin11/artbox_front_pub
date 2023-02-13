import ArtboxBackendLoading from "../../components/protected";
import {ZReport} from "../../components/Backend/Reports/ZReport";
import React from "react";
import {logOut} from "../../functions/logOut";
import { useStore } from "../../store";

export default function zReport() {
	const store = useStore();
	return <ArtboxBackendLoading body={ZReport} logOut={() => logOut(store)}/>
}