import {useStore} from "../store";
import {useRouter} from "next/router";
import React from "react";

const withAuth = (Component:any) => {
	return (props: any) => {
		const store = useStore()
		const router = useRouter()
		if (store.accessToken !== null) {
			return (
				<Component {...props} />
			);
		}
		else {
			router.push("/backend/login").then(r => r).catch(err => {
				console.log(err);
			})
			return null;
		}
	}
}

export { withAuth }