import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getOperations, logout } from '../../redux/actions/actions';
import { Balance } from '../Balance/Balance';
import { OpsTable } from '../OpsTable/OpsTable';

export const Home = () => {
	const dispatch = useDispatch();
	const operations = useSelector((state) => state.filteredOperations);
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	// const uid = localStorage.getItem('uid-alkemy');
	const orderedOperations = operations.sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);
	const token = localStorage.getItem('token-alkemy');
	useEffect(() => {
		if (user.auth) {
			dispatch(getOperations(user.id));
		} else {
			if (token) {
				console.log('gato');
				return;
			}

			dispatch(logout());
			navigate('/login');
		}
	}, [user]);

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
