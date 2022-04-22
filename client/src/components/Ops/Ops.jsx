import { Button, Grid } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterAll,
	filterIncome,
	filterOutcome,
	getOperations,
} from '../../redux/actions/actions';
import AddOpModal from '../addOpModal/AddOpModal';
import { OpsTable } from '../OpsTable/OpsTable';

export const Ops = () => {
	const [visible, setVisible] = React.useState(false);

	const operations = useSelector((state) => state.filteredOperations);

	const dispatch = useDispatch();

	// const orderedOperations = operations

	const mockUser = {
		id: '57a81d19-28e8-4b40-a1c2-3b772f678b1b',
		email: 'fran@mail.com',
		password: 123456,
	};
	useEffect(() => {
		dispatch(getOperations(mockUser.id));
	}, []);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
		console.log('closed');
	};
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
			<OpsTable
				operations={operations.sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				)}
			/>
		</div>
	);
};
