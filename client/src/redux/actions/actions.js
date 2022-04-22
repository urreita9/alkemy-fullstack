import api from '../../axios/axios';
export const GET_OPERATIONS = 'GET_OPERATIONS';
export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_INCOME = 'FILTER_INCOME';
export const FILTER_OUTCOME = 'FILTER_OUTCOME';
export const POST_OPERATION = 'POST_OPERATION';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const getOperations = (id) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations/${id}`, {
			headers: {
				'x-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTgxZDE5LTI4ZTgtNGI0MC1hMWMyLTNiNzcyZjY3OGIxYiIsImlhdCI6MTY1MDUxMjUwMH0.unIyLCJS3ZyGDrjsCKMm4mF_Jl-GRqvVFMP7vc0Nz0o',
			},
		});

		dispatch({
			type: GET_OPERATIONS,
			payload: data.operations,
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
export const filterOutcome = () => ({
	type: FILTER_OUTCOME,
	payload: null,
});

export const postOperation =
	(id, { description, amount, opType }) =>
	async (dispatch) => {
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
						'x-token':
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTgxZDE5LTI4ZTgtNGI0MC1hMWMyLTNiNzcyZjY3OGIxYiIsImlhdCI6MTY1MDUxMjUwMH0.unIyLCJS3ZyGDrjsCKMm4mF_Jl-GRqvVFMP7vc0Nz0o',
					},
				}
			);
			if (data) {
				getOperations(id);
			}
		} catch (error) {
			console.log(error);
		}
	};

export const login = (userData) => async (dispatch) => {
	try {
		const { data } = await api.post(`/auth/login`, userData);
		if (data.token) {
			localStorage.setItem('token-alkemy', data.token);
			localStorage.setItem('uid-alkemy', data.user.id);
			dispatch({
				type: LOGIN_USER,
				payload: data.user,
			});
		}
	} catch (error) {
		console.log(error.response);
		alert(error.response.data.msg);
	}
};

export const logout = () => {
	localStorage.clear();

	return { type: LOGOUT_USER, payload: null };
};
