import api from '../../axios/axios';
export const GET_OPERATIONS = 'GET_OPERATIONS';
export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_INCOME = 'FILTER_INCOME';
export const FILTER_OUTCOME = 'FILTER_OUTCOME';
export const POST_OPERATION = 'POST_OPERATION';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const getOperations = (id) => async (dispatch) => {
	const token = localStorage.getItem('token-alkemy');
	try {
		const { data } = await api.get(`/operations/${id}`, {
			headers: {
				'x-token': token,
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
			if (data) {
				getOperations(id);
			}
		} catch (error) {
			console.log(error);
		}
	};
