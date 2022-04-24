import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getOperations, getUser, logout } from '../../redux/actions/actions';
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
		if (token) {
			if (!user.auth) {
				dispatch(getUser(token));
			} else {
				dispatch(getOperations(user.id));
			}
		} else {
			dispatch(logout());
			navigate('/login');
		}
	}, [dispatch]);

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
