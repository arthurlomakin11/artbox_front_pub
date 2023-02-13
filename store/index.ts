import create from "zustand";

export const useStore:any = create((set:any) => ({
	accessToken: null,
	user: {},
	setAccessToken: (input:any) => set((state:any) => ({ accessToken: input })),
	setUser: (input:any) => set((state:any) => ({ user:input }))
}))