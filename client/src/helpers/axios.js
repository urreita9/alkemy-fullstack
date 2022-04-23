import api from '../axios/axios';
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
					'x-token': token,
				},
			}
		);
		// console.log(data);
		if (data) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

export const editOperation = async (uid, { opId, description, amount }) => {
	const token = localStorage.getItem('token-alkemy');
	try {
		const { data } = await api.put(
			`/operation/${opId}`,
			{
				uid,
				description,
				amount,
			},
			{
				headers: {
					'x-token': token,
				},
			}
		);

		if (data) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

export const login = async (userData) => {
	try {
		const { data } = await api.post(`/auth/login`, userData);
		if (data.token) {
			localStorage.setItem('token-alkemy', data.token);
			localStorage.setItem('uid-alkemy', data.user.id);
		}
		return data;
	} catch (error) {
		console.log(error.response);
		alert(error.response.data.msg);
	}
};

export const logout = () => {
	localStorage.clear();
};

export const register = async (userData) => {
	try {
		const { data } = await api.post(`/auth/register`, userData);
		if (data.email) {
			return true;
		}
	} catch (error) {
		console.log(error.response);
		alert(error.response.data.msg);
	}
};
