import { Table, Row, Col, Tooltip, Text } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { StyledBadge } from './StyledBadge';
import { IconButton } from './IconButton';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';
import { editOperation } from '../../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations } from '../../redux/actions/actions';

export const OpsTable = ({ operations, handlerEditModal, home = true }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const columns = [
		{ name: 'DESCRIPTION', uid: 'description' },
		{ name: 'AMOUNT', uid: 'amount' },
		{ name: 'OPTYPE', uid: 'opType' },
		{ name: 'DATE', uid: 'updatedAt' },
		{ name: 'ACTIONS', uid: 'actions' },
	];

	const amountToDollars = (amount) => {
		const dollarUSLocale = Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});
		return dollarUSLocale.format(amount.toFixed(2));
	};

	const handleDelete = () => {};

	const renderCell = (operation, columnKey) => {
		const cellValue = operation[columnKey];

		const handleDelete = (opId) => {
			editOperation(user.id, {
				opId,
				description: '',
				amount: 0,
				active: false,
			}).then(() => {
				dispatch(getOperations(user.id));
			});
		};
		switch (columnKey) {
			case 'description':
				return (
					<Col>
						<Row>
							<Text size={14} css={{ tt: 'capitalize' }}>
								{cellValue}
							</Text>
						</Row>
					</Col>
				);
			case 'amount':
				return (
					<Col>
						<Row>
							<Text b size={14} css={{ tt: 'capitalize' }}>
								{amountToDollars(cellValue)}
							</Text>
						</Row>
					</Col>
				);
			case 'opType':
				return <StyledBadge type={operation.opType}>{cellValue}</StyledBadge>;

			case 'updatedAt':
				return (
					<Col>
						<Row>
							<Text size={14} css={{ tt: 'capitalize' }}>
								{cellValue && cellValue.slice(0, 10)}
							</Text>
						</Row>
					</Col>
				);
			case 'actions':
				return (
					<>
						{home ? (
							<></>
						) : (
							<Row justify='center' align='center'>
								<Col css={{ d: 'flex' }}>
									<Tooltip content='Edit operation'>
										<IconButton onClick={() => handlerEditModal(operation.id)}>
											<EditIcon size={20} fill='#979797' />
										</IconButton>
									</Tooltip>
								</Col>
								<Col css={{ d: 'flex' }}>
									<Tooltip
										content='Delete operation'
										color='error'
										onClick={() => {
											Swal.fire({
												title: 'Are you sure?',
												text: "You won't be able to revert this!",
												icon: 'warning',
												showCancelButton: true,
												confirmButtonColor: '#8D49D2',
												cancelButtonColor: '#d33',
												confirmButtonText: 'Yes, delete it!',
											}).then((result) => {
												if (result.isConfirmed) {
													Swal.fire(
														'Deleted!',
														`Your ${operation.opType} has been deleted.`,
														'success'
													);
													handleDelete(operation.id);
												}
											});
										}}
									>
										<IconButton>
											<DeleteIcon size={20} fill='#FF0080' />
										</IconButton>
									</Tooltip>
								</Col>
							</Row>
						)}
					</>
				);
			default:
				return cellValue;
		}
	};
	return (
		<Table
			aria-label='Example table with custom cells'
			css={{
				margin: '0 auto',
				height: 'auto',
				width: '90%',
				maxWidth: '1200px',
			}}
			selectionMode='none'
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column
						key={column.uid}
						hideHeader={column.uid === 'actions'}
						align={column.uid === 'actions' ? 'center' : 'start'}
					>
						{column.name}
					</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={home ? operations.slice(0, 10) : operations}>
				{(item) => (
					<Table.Row>
						{(columnKey) => (
							<Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
};
