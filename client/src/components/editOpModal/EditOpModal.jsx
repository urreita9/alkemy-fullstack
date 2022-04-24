import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Text, Input } from '@nextui-org/react';
import { editOperation } from '../../helpers/axios';
import { getOperations } from '../../redux/actions/actions';

export default function EditOpModal({
	visibleEdit,
	closeHandlerEditModal,
	opId,
}) {
	const [form, setForm] = useState({
		description: '',
		amount: 0,
	});
	const [errors, setErrors] = useState({
		description: '',
		amount: '',
	});

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setForm({
			...form,
			state: true,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'description') {
			if (!e.target.value.trim(' ').length) {
				setErrors({
					...errors,
					description: 'Description cant be empty',
				});
			} else if (!e.target.value.length) {
				setErrors({
					...errors,
					description: 'Must write a description',
				});
			} else {
				setErrors({
					...errors,
					description: '',
				});
			}
		}
		if (e.target.name === 'amount') {
			const number = Number(e.target.value);
			if (!number || number < 0) {
				setErrors({
					...errors,
					state: true,
					amount: 'Number must be greater than cero',
				});
			} else {
				setErrors({
					...errors,
					amount: '',
				});
			}
		}
	};

	const handleEdit = () => {
		if (errors.description || errors.amount) return;

		editOperation(user.id, {
			opId,
			description: form.description,
			amount: form.amount,
			erase: false,
		}).then(() => {
			dispatch(getOperations(user.id));
		});
	};

	return (
		<div>
			<Modal
				closeButton
				aria-labelledby='modal-title'
				aria-label='form'
				open={visibleEdit}
				onClose={closeHandlerEditModal}
			>
				<Modal.Header>
					<Text id='modal-title' size={18}>
						Update
						<Text b size={18}>
							Operation
						</Text>
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color='secondary'
						size='lg'
						placeholder='Description'
						name='description'
						aria-label='description'
						value={form.description}
						onChange={handleInputChange}
						status={errors.description.length ? 'error' : 'secondary'}
						// contentLeft={<Mail fill='currentColor' />}
					/>
					<Input
						clearable
						bordered
						fullWidth
						color='secondary'
						size='lg'
						placeholder='Amount'
						type='number'
						name='amount'
						aria-label='amount'
						value={form.amount}
						onChange={handleInputChange}
						status={errors.amount.length ? 'error' : 'secondary'}
						// contentLeft={<Password fill='currentColor' />}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color='error' onClick={closeHandlerEditModal}>
						Close
					</Button>

					<Button auto onClick={handleEdit}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
