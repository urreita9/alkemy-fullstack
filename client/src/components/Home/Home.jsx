import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	filterAll,
	getOperations,
	getUser,
	logout,
} from '../../redux/actions/actions';
import { Balance } from '../Balance/Balance';
import { NavBar } from '../Navbar/NavBar';
import { OpsTable } from '../OpsTable/OpsTable';

export const Home = () => {
	const [income, setIncome] = useState(0);
	const [outcome, setOutcome] = useState(0);
	const [total, setTotal] = useState(0);
	const dispatch = useDispatch();
	const operations = useSelector((state) => state.filteredOperations);
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	// const uid = localStorage.getItem('uid-alkemy');
	const orderedOperations =
		operations?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];
	const token = localStorage.getItem('token-alkemy');

	useEffect(() => {
		if (token) {
			if (!user.auth) {
				dispatch(getUser(token));
			} else if (!operations.length) {
				dispatch(getOperations(user.id));
			}
		} else {
			dispatch(logout());
			navigate('/login');
		}
	}, [dispatch]);

	useEffect(() => {
		if (operations.length) {
			calculateTotal(operations);
		}
	}, [operations]);

	useEffect(() => {
		if (operations.length) {
			dispatch(filterAll());
		}
	}, []);

	const calculateTotal = (operations) => {
		let incomeLet = 0;
		let outcomeLet = 0;

		const total = operations.map((operation) => {
			if (operation.opType === 'income') {
				incomeLet += operation.amount;
				return operation.amount;
			} else {
				outcomeLet += operation.amount;
				return -operation.amount;
			}
		});

		setIncome(incomeLet);
		setOutcome(outcomeLet);
		setTotal(total.reduce((a, b) => a + b));
	};

	return (
		<>
			<NavBar />
			<div style={{ margin: '20px auto', minHeight: 'calc(100vh - 150px)' }}>
				<Balance total={total} income={income} outcome={outcome} />
				<OpsTable operations={orderedOperations} />
				<div
					style={{
						marginTop: '30px',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button color='secondary' onClick={() => navigate('/operations')}>
						Operations
					</Button>
				</div>
			</div>
		</>
	);
};
