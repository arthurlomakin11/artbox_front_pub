import { sign } from "jsonwebtoken";
import cookie from "cookie";

export const createAccessToken = (user:any) => {
	return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '30m'
	});
};

export const createRefreshToken = (user:any) => {
	return sign(
		{ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!,{
			expiresIn: "600d"
		}
	);
};

export const sendRefreshToken = (res:any, token:any) => {
	res.setHeader('Set-Cookie', cookie.serialize('refreshToken', token, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 600,
		path: '/'
	}))
};