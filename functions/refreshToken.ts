export const refreshToken = () => {
	return fetch('/api/refresh_token', {
		method: "POST",
		credentials: "include"
	}).then(res => res.json()).then(data => data);
}