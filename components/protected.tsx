import { useStore } from '../store'
import React, {FunctionComponent, ReactChild, ReactChildren, useEffect, useState} from 'react'
import useSWR from 'swr'
import { withAuth } from '../functions/checkAuthClient'
import axios from 'axios'

import { ZReport } from "./Backend/Reports/ZReport"

const ArtboxBackendLoading = ({ logOut, body = ZReport }:any) => {
	const store = useStore()
	const [isError, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const fetcher = async () => {
		return await axios.get('/api/protectedRoute', {
			headers: {
				authorization: `Bearer ${store.accessToken}`
			}
		})
	}

	const { data, error } = useSWR('/api/', fetcher)

	useEffect(() => {
		if(error) setError(error)
		setLoading(false)

	},[data, error])

	if(loading) {
		return <div>Loading...</div>
	}
	else {
		if(isError) {
			return (
				<div>ЭЙ! ВЫ НЕ АУТЕНТИФИЦИРОВАНЫ, УБИРАЙТЕСЬ ОТСЮДА!!!</div>
			)
		}
		else {
			return (
				<ArtboxDashboard store={store} logOut={logOut} BodyComponent={body}/>
			)
		}
	}
}


type ArtboxDashboardProps = {
	store: any,
	logOut: any,
	BodyComponent: any
}

import artboxStyles from "../styles/Backend/ArtboxDashboard.module.css";
const ArtboxDashboard:FunctionComponent<ArtboxDashboardProps> = ({ store, logOut, BodyComponent}) => {
	return <div className={artboxStyles.ArtboxDashboard}>
		<SideMenu store={store} logOut={logOut}/>
		<main className={artboxStyles.Main}>
			<BodyComponent store={store}/>
		</main>
	</div>
}

import sideMenuStyles from "../styles/Backend/SideMenu.module.css"
import Link from "next/link";
import {useRouter} from "next/router";

const SideMenu = ({ store, logOut }:any) => {
	return <aside className={sideMenuStyles.SideMenu}>
		<span className={sideMenuStyles.AccountGreeting}>Вітаємо, {store.user.name}</span>
		<ul>
			<SideMenuGroup name="Звіти">
				<SideMenuElement href="/backend/zReport">
					<SideMenuElementIcon/>
					Періодичні звіти
				</SideMenuElement>
				<SideMenuElement href="/backend/xReport">
					<SideMenuElementIcon/>
					X-Звіти
				</SideMenuElement>
				<SideMenuElement href="/backend/shifts">
					<SideMenuElementIcon/>
					Зміни
				</SideMenuElement>
				<SideMenuElement href="/backend/receipts">
					<SideMenuElementIcon/>
					Чеки
				</SideMenuElement>
			</SideMenuGroup>
			
			<SideMenuElement href="/backend/productsList">
				<SideMenuElementIcon/>
				Продукти
			</SideMenuElement>
			<SideMenuElement href="/backend/taxesList">
				<SideMenuElementIcon/>
				Податки
			</SideMenuElement>
			<SideMenuElement href="/backend/seller">
				<SideMenuElementIcon/>
				Каса
			</SideMenuElement>
		</ul>
		<button onClick={() => logOut()} className={sideMenuStyles.signOutButton}>
			<img width="100%" src="/backend/sign-out.svg"/>
		</button>
	</aside>
}

const SideMenuElement = ({href, children}:{href:string, children:ReactChild[]}) => {
	const router = useRouter()

	return <li className={`${sideMenuStyles.SideMenuElement} 
	${router.pathname === href ? sideMenuStyles.SideMenuElementActive : ""}`}>
		<Link href={href}>
			<a className={sideMenuStyles.Link}>
				{children}
			</a>
		</Link>
	</li>
}

const SideMenuGroup = ({name, children}:{name:string, children:ReactChild[]}) => {
	return <>
		<div className={sideMenuStyles.SideMenuGroupName}>{name}</div>
		{children}
	</>
}

const SideMenuElementIcon = () => {
	return <img className={sideMenuStyles.SideMenuElement__Image} height={20} src="/backend/report_icon.svg"/>
}

export default withAuth(ArtboxBackendLoading)