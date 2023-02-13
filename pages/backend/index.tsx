import type { NextPage } from 'next'
import { useStore } from '../../store'
import React, { useEffect, useState } from 'react'
import ArtboxBackendLoading from "../../components/protected";
import {logOut} from "../../functions/logOut";

const Index:NextPage = () =>  {
	const store = useStore()
	const [auth, setAuth] = useState(false)

	useEffect(() => {
		if(store.accessToken !== null) {
			setAuth(true)
		}
		else {
			setAuth(false)
		}
	},[store.accessToken])

	if(auth) {
		return <ArtboxBackendLoading logOut={() => logOut(store)}/>
	}
	else {
		return null;
	}
}

export default Index;
