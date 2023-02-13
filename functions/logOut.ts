export async function logOut(store:any) {
	await fetch('/api/logout', {
		method:'POST',
		credentials: 'include'
	});
	store.setAccessToken(null);
	store.setUser(null);
}