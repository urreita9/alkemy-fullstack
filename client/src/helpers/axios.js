import api from '../axios/axios';

export const editOperation = async (
	uid,
	{ opId, description, amount, active }
) => {
	const token = localStorage.getItem('token-alkemy');
	try {
		const { data } = await api.put(
			`/operation/${opId}`,
			{
				uid,
				description,
				amount,
				active,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
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
		// alert(error.response.data.msg);
		return error;
	}
};

export const logout = () => {
	localStorage.clear();
};

export const register = async (userData) => {
	try {
		const { data } = await api.post(`/auth/register`, userData);
		console.log(data);
		return data;
	} catch (error) {
		console.log(error.response.data);
		return error;
	}
};
