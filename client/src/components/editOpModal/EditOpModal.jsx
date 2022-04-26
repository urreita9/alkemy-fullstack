import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Modal, Button, Text, Input } from '@nextui-org/react';
import { editOperation } from '../../helpers/axios';
import { getOperations } from '../../redux/actions/actions';
import { checkAddForm } from '../Forms/AddOpForm';

const initErrors = {
	state: false,
	description: '',
	amount: 0,
};

export default function EditOpModal({
	visibleEdit,
	closeHandlerEditModal,
	opId,
}) {
	const [form, setForm] = useState({
		description: '',
		amount: 0,
	});
	const [errors, setErrors] = useState(initErrors);

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setForm({
			...form,
			state: true,
			[e.target.name]: e.target.value,
		});
		setErrors({
			...errors,
			[e.target.name]: '',
		});
	};

	const handleEdit = () => {
		const check = checkAddForm(form);
		setErrors((prevState) => {
			return { ...prevState, ...check };
		});

		if (!check.state) {
			editOperation(user.id, {
				opId,
				description: form.description,
				amount: form.amount,
				erase: false,
			}).then(() => {
				dispatch(getOperations(user.id));
			});
			Swal.fire({
				title: 'Success!',
				text: 'Operation updated',
				icon: 'success',
				confirmButtonText: 'Ok',
			});
			setForm({ description: '', amount: 0 });
			closeHandlerEditModal();
		}
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
					{errors.description && (
						<Text color='error'>{errors.description}</Text>
					)}
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
					{errors.amount && <Text color='error'>{errors.amount}</Text>}
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
