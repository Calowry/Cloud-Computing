import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface userData  {
	name: string | null
	email: string | null
	roleId: string | null
	verified: boolean | null
	active:boolean | null
}

const responseData = (status: number, message: string | null, error:any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: message,
            errors: error,
            data: null
        }
        return response;
    }
    const res = {
        status,
        message,
        errors: error,
        data: data,
    }
    return res;
};

const generateToken = (data:any): string => {
    const token = Jwt.sign(data, process.env.JWT_TOKEN as string, {expiresIn: "1h"});
    return token;
}

const generateRefreshToken = (data: any): string => {
	const token = Jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" });
	return token;
}

const extractToken = (token: string): userData | null => {
	const secretKey: string = process.env.JWT_TOKEN as string;

	let resData: any;

	const res = Jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			resData = null
		} else {
			resData = decoded
		}
	});

	if (resData) {
		const result: userData = <userData>(resData);
		return result;
	}
	return null;
}

const extractRefreshToken = (token: string): userData | null => {
	const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

	let resData: any;

	const res = Jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			resData = null
		} else {
			resData = decoded
		}
	});

	if (resData) {
		const result: userData = <userData>(resData);
		return result;
	}
	return null;
}


export default { responseData, generateToken, generateRefreshToken, extractToken, extractRefreshToken }