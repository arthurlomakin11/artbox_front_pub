import signInStyles from "./styles/SignIn.module.css"
import {useRouter} from "next/router";
import {useState} from "react";
import {useStore} from "../../../store";

export const SignIn = () => {
	const [loginPassword, setLoginPassword] = useState('')
	const [loginEmail, setLoginEmail] = useState('')
	const store = useStore()
	const router = useRouter()

	async function signIn(loginEmail: string, loginPassword: string) {
		fetch('/api/signIn', {
			method: 'POST',
			body: JSON.stringify({
				email: loginEmail,
				password: loginPassword
			})
		})
			.then(res => res.json())
			.then(data => {
				store.setAccessToken(data.accessToken)
				store.setUser(data.user)
			})

		await router.push("/backend");
	}


	return (<section className={signInStyles.SignIn}>
		<h1>Вхід</h1>

		<label htmlFor="Email">Email</label>
		<input name="Email" onChange={e => setLoginEmail(e.target.value)}/>

		<label htmlFor="Password">Пароль</label>
		<input onChange={e => setLoginPassword(e.target.value)} name="Password" type="password"/>

		<button onClick={async () => await signIn(loginEmail, loginPassword)}>Увійти</button>
	</section>);
}