import ArtboxBackendLoading from "../../components/protected";
import React from "react";
import { logOut } from "../../functions/logOut";
import { useStore } from "../../store";
import {Products} from "../../components/Backend/Products/Products";

export default function productsList() {
	const store = useStore();
	return <ArtboxBackendLoading body={Products} logOut={() => logOut(store)}/>
}