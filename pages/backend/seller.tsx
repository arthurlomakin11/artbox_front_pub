import ArtboxBackendLoading from "../../components/protected";
import { Seller } from "../../components/Backend/Seller/Seller";
import React from "react";
import { logOut } from "../../functions/logOut";
import { useStore } from "../../store";

export default function seller() {
	const store = useStore();
	return <ArtboxBackendLoading body={Seller} logOut={() => logOut(store)}/>
}