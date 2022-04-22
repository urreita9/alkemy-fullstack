import { useSelector } from 'react-redux';
import { Table, Row, Col, Tooltip, User, Text } from '@nextui-org/react';
import { StyledBadge } from './StyledBadge';
import { IconButton } from './IconButton';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';

export const OpsTable = ({ operations }) => {
	const columns = [
		{ name: 'DESCRIPTION', uid: 'description' },
		{ name: 'AMOUNT', uid: 'amount' },
		{ name: 'OPTYPE', uid: 'opType' },
		{ name: 'ACTIONS', uid: 'actions' },
	];

	const renderCell = (operation, columnKey) => {
		const cellValue = operation[columnKey];
		switch (columnKey) {
			case 'description':
				return (
					<Col>
						<Row>
							<Text b size={14} css={{ tt: 'capitalize' }}>
								{cellValue}
							</Text>
						</Row>
					</Col>
				);
			case 'role':
				return (
					<Col>
						<Row>
							<Text b size={14} css={{ tt: 'capitalize' }}>
								{cellValue}
							</Text>
						</Row>
					</Col>
				);
			case 'status':
				return <StyledBadge type={operation.opType}>{cellValue}</StyledBadge>;

			case 'actions':
				return (
					<Row justify='center' align='center'>
						<Col css={{ d: 'flex' }}>
							<Tooltip content='Edit operation'>
								<IconButton
									onClick={() => console.log('Edit user', operation.id)}
								>
									<EditIcon size={20} fill='#979797' />
								</IconButton>
							</Tooltip>
						</Col>
						<Col css={{ d: 'flex' }}>
							<Tooltip
								content='Delete operation'
								color='error'
								onClick={() => console.log('Delete user', operation.id)}
							>
								<IconButton>
									<DeleteIcon size={20} fill='#FF0080' />
								</IconButton>
							</Tooltip>
						</Col>
					</Row>
				);
			default:
				return cellValue;
		}
	};
	return (
		<Table
			aria-label='Example table with custom cells'
			css={{
				height: 'auto',
				minWidth: '100%',
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
			<Table.Body items={operations.slice(0, 10)}>
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
