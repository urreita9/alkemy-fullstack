import api from '../../axios/axios';
export const GET_OPERATIONS = 'GET_OPERATIONS';

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
