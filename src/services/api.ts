
import apisauce, { ApiResponse } from 'apisauce';
import { IProduct, IUser } from './api.type';
import { Filter } from './loopback.type';

export const isDev = process.env.NODE_ENV === 'development';

export const baseURL = 'http://159.223.59.66:4003';

export const defaultApiSauceConfig = (headers?: any) => {
	return {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...headers,
		},
		timeout: 10000,
	};
};

interface ErrorType {
	error: {
		message: string;
		statusCode: number
	}
}
const createServiceApi = () => {
	const api = apisauce.create({
		...defaultApiSauceConfig(),
		baseURL: baseURL,
	});

	const getUserMe = async () => api.get<IUser>('/users/me');
	const login = async ({ email, password }: { email: string, password: string }) => api.post<{ token: string }>('/users/login', { email, password });
	const register = async (data: IUser) => api.post('/users/register', data);

	const getProducts = async (filter: Filter) => api.get<{data: IProduct[], count: number}>('/products', {filter});
	const createProduct = async (data: IProduct) => api.post<IProduct, ErrorType>('/products', data);
	const getCategories = async () => api.get<{data: any[], count: number}>('/categories');

	return {
		api,
		getUserMe,
		login,
		register,
		getProducts,
		createProduct,
		getCategories
	}
}


export const ServiceApi = createServiceApi();

export const setApiAuthorization = (token?: string) => {
	if (!token) {
		ServiceApi.api.deleteHeader('authorization');
		return
	}
	ServiceApi.api.setHeaders({
		authorization: 'Bearer ' + token,
	});
};


export const isSuccess = <T = any>(res: ApiResponse<T, ErrorType>) => {
	return res.ok && (res.status === 200 || res.status === 204);
};
