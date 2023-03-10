import '../styles/global.css'
import React, { useEffect, useState } from 'react'
import { refreshToken } from '../functions/refreshToken'
import { useStore } from '../store'

function MyApp({ Component, pageProps }:any) {
	const store = useStore()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		//initial funciton
		refreshToken().then(data => {
			if(data.ok) {
				store.setAccessToken(data.accessToken)
				store.setUser(data.user)
			}
			setLoading(false)
		})

		//starts silent refreshes
		setInterval(() => {
			refreshToken().then(data => {
				if(data.ok) {
					store.setAccessToken(data.accessToken)
					store.setUser(data.user)
				}
			})
		},600000)
	},[])

	if(loading) return <div>Loading....</div>

	return <Component {...pageProps} />

}
export default MyApp
