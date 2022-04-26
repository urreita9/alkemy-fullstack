import api from '../../axios/axios';
import Swal from 'sweetalert2';
export const GET_OPERATIONS = 'GET_OPERATIONS';
export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_INCOME = 'FILTER_INCOME';
export const FILTER_EXPENSE = 'FILTER_EXPENSE';
export const POST_OPERATION = 'POST_OPERATION';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const getOperations = (id) => async (dispatch) => {
	const token = localStorage.getItem('token-alkemy');
	try {
		const { data } = await api.get(`/operations/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(data);

		dispatch({
			type: GET_OPERATIONS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const filterAll = () => ({
	type: FILTER_ALL,
	payload: null,
});

export const filterIncome = () => ({
	type: FILTER_INCOME,
	payload: null,
});
export const filterExpense = () => ({
	type: FILTER_EXPENSE,
	payload: null,
});

export const postOperation = async (id, { description, amount, opType }) => {
	const token = localStorage.getItem('token-alkemy');
	try {
		const { data } = await api.post(
			`/operation`,
			{
				id,
				description,
				amount,
				opType,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (data) {
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const login = (userData) => async (dispatch) => {
	try {
		const { data } = await api.post(`/auth/login`, userData);
		console.log('LOGIN', data);
		if (data.auth) {
			localStorage.setItem('token-alkemy', data.token);
			localStorage.setItem('uid-alkemy', data.user.id);
			dispatch({
				type: LOGIN_USER,
				payload: { id: data.user.id, email: data.user.email, auth: data.auth },
			});
		} else {
			dispatch({
				type: LOGOUT_USER,
				payload: { id: null, email: null, auth: false },
			});
		}
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: `${error.response.data.msg}`,
			text: 'Please try again!',
		});
	}
};

export const logout = () => {
	localStorage.clear();
	return {
		type: LOGOUT_USER,
		payload: { id: null, email: null, auth: false },
	};
};

export const getUser = (token) => async (dispatch) => {
	try {
		const { data } = await api.get(`/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log('GET USER ACTION', data);

		if (data.auth) {
			dispatch(getOperations(data.user.id));
			dispatch({
				type: LOGIN_USER,
				payload: { id: data.user.id, email: data.user.email, auth: data.auth },
			});
		} else {
			dispatch({
				type: LOGOUT_USER,
				payload: { id: null, email: null, auth: false },
			});
		}
	} catch (error) {
		console.log(error.response);
		alert(error.response.data.msg);
	}
};
