import api from '../axios/axios';
export const postOperation = async (id, { description, amount, opType }) => {
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
		// console.log(data);
		if (data) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

export const editOperation = async (uid, { opId, description, amount }) => {
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
					'x-token':
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTgxZDE5LTI4ZTgtNGI0MC1hMWMyLTNiNzcyZjY3OGIxYiIsImlhdCI6MTY1MDUxMjUwMH0.unIyLCJS3ZyGDrjsCKMm4mF_Jl-GRqvVFMP7vc0Nz0o',
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

		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
