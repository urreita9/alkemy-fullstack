import { Button, Grid } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
	filterAll,
	filterIncome,
	filterOutcome,
	getOperations,
} from '../../redux/actions/actions';
import AddOpModal from '../addOpModal/AddOpModal';
import EditOpModal from '../editOpModal/EditOpModal';
import { OpsTable } from '../OpsTable/OpsTable';

export const Ops = ({ user }) => {
	const [visible, setVisible] = useState(false);
	const [visibleEdit, setVisibleEdit] = useState(false);
	const opId = useRef();
	const operations = useSelector((state) => state.filteredOperations);

	const dispatch = useDispatch();

	const mockUser = {
		id: '57a81d19-28e8-4b40-a1c2-3b772f678b1b',
		email: 'fran@mail.com',
		password: 123456,
	};
	useEffect(() => {
		dispatch(getOperations(mockUser.id));
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
		<div>
			<Grid.Container>
				<Grid xs={8}>
					<Button.Group color='secondary' size='sm'>
						<Button onClick={() => dispatch(filterAll())}>All</Button>
						<Button onClick={() => dispatch(filterIncome())}>Income</Button>
						<Button onClick={() => dispatch(filterOutcome())}>Outcome</Button>
					</Button.Group>
				</Grid>
				<Grid xs={4}>
					<Button auto shadow onClick={handler}>
						Add Operation
					</Button>
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
				operations={operations.sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				)}
				home={false}
				visibleEdit={visibleEdit}
				handlerEditModal={handlerEditModal}
				closeHandlerEditModal={closeHandlerEditModal}
			/>
		</div>
	);
};
