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
