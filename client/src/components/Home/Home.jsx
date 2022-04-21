import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOperations } from '../../redux/actions/actions';
import { Balance } from '../Balance/Balance';
import { OpsTable } from '../OpsTable/OpsTable';

export const Home = () => {
	const dispatch = useDispatch();

	const mockUser = {
		id: '57a81d19-28e8-4b40-a1c2-3b772f678b1b',
		email: 'fran@mail.com',
		password: 123456,
	};
	useEffect(() => {
		dispatch(getOperations(mockUser.id));
	}, []);

	return (
		<div>
			<Balance />
			<OpsTable />
		</div>
	);
};
