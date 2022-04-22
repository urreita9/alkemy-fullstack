import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOperations } from '../../redux/actions/actions';
import { Balance } from '../Balance/Balance';
import { OpsTable } from '../OpsTable/OpsTable';

export const Home = () => {
	const dispatch = useDispatch();
	const operations = useSelector((state) => state.filteredOperations);
	const navigate = useNavigate();

	const orderedOperations = operations.sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);
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
			<OpsTable operations={orderedOperations} />
			<div
				style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
			>
				<Button color='secondary' onClick={() => navigate('/operations')}>
					Operations
				</Button>
			</div>
		</div>
	);
};
