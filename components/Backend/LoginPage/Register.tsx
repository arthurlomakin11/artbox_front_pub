import registerStyles from "./styles/Register.module.css"
import {useState} from "react";
import {useStore} from "../../../store";
import {useRouter} from "next/router";

export const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const store = useStore()
	const router = useRouter()

	async function signup() {
		fetch('/api/signup',{
			method:'POST',
			body: JSON.stringify({
				email,
				name,
				password
			})
		}).then(res => {
			if(res.status === 409) throw new Error('Please use other email')
			return res.json()
		}).then(data => {
			store.setAccessToken(data.accessToken)
			store.setUser(data.user)
		})
			.catch(e => {
				return console.log(e)
			})

		await router.push("/backend");
	}

	return (
		<section className={registerStyles.Register}>
			<h1>Реєстрація</h1>

			<label className={registerStyles.Label}>Ім'я</label>
			<input className={registerStyles.Input} onChange={e => setName(e.target.value)}/>

			<label className={registerStyles.Label}>email</label>
			<input className={registerStyles.Input} onChange={e => setEmail(e.target.value)}/>

			<label className={registerStyles.Label}>Пароль</label>
			<input className={registerStyles.Input} onChange={e => setPassword(e.target.value)} type="password"/>

			<button onClick={async () => await signup()}>Зареєструватися</button>
		</section>)
}