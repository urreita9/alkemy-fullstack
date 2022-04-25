import { Button, Grid } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
	filterAll,
	filterExpense,
	filterIncome,
	getOperations,
	getUser,
	logout,
} from '../../redux/actions/actions';
import AddOpModal from '../addOpModal/AddOpModal';
import EditOpModal from '../editOpModal/EditOpModal';
import { NavBar } from '../Navbar/NavBar';
import { OpsTable } from '../OpsTable/OpsTable';

export const Ops = () => {
	const [visible, setVisible] = useState(false);
	const [visibleEdit, setVisibleEdit] = useState(false);
	const opId = useRef();
	const operations = useSelector((state) => state.filteredOperations);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem('token-alkemy');

	const sortedOperations = operations?.length
		? operations.sort((a, b) => new Date(b.date) - new Date(a.date))
		: [];
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

	const handler = () => setVisible(true);
	const handlerEditModal = (id) => {
		opId.current = id;
		setVisibleEdit(true);
	};

	const closeHandler = () => {
		setVisible(false);
	};
	const closeHandlerEditModal = () => setVisibleEdit(false);

	if (!user) {
		return <Navigate to='/login' replace />;
	}
	return (
		<>
			<NavBar />
			<div>
				<Grid.Container>
					<Grid xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
						<Button.Group color='secondary' size='sm'>
							<Button onClick={() => dispatch(filterAll())}>All</Button>
							<Button onClick={() => dispatch(filterIncome())}>Income</Button>
							<Button onClick={() => dispatch(filterExpense())}>Expense</Button>
						</Button.Group>
					</Grid>
				</Grid.Container>
				<AddOpModal
					visible={visible}
					handler={handler}
					closeHandler={closeHandler}
				/>
				<EditOpModal
					visibleEdit={visibleEdit}
					handlerEditModal={handlerEditModal}
					closeHandlerEditModal={closeHandlerEditModal}
					opId={opId.current}
				/>
				<OpsTable
					operations={sortedOperations}
					home={false}
					visibleEdit={visibleEdit}
					handlerEditModal={handlerEditModal}
					closeHandlerEditModal={closeHandlerEditModal}
				/>
				<Grid xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
					<Button auto shadow onClick={handler}>
						Add Operation
					</Button>
				</Grid>
			</div>
		</>
	);
};
