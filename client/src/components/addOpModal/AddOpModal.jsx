import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Modal, Button, Text, Input, Radio } from '@nextui-org/react';

import { getOperations, postOperation } from '../../redux/actions/actions';
import { checkAddForm } from '../Forms/AddOpForm';

const initialForm = {
	description: '',
	amount: '',
	opType: 'income',
};

const initErrors = {
	state: false,
	description: '',
	amount: '',
};
export default function AddOpModal({ visible, closeHandler }) {
	const [form, setForm] = useState(initialForm);
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

	const handleSubmit = () => {
		const check = checkAddForm(form);
		setErrors((prevState) => {
			return { ...prevState, ...check };
		});
		if (!check.state) {
			postOperation(user.id, form).then((data) => {
				dispatch(getOperations(data.UserId));
			});
			Swal.fire({
				title: 'Success!',
				text: 'Operation created',
				icon: 'success',
				confirmButtonText: 'Ok',
			});
			setForm(initialForm);
			closeHandler();
		}
	};

	return (
		<div>
			<Modal
				closeButton
				aria-labelledby='modal-title'
				aria-label='form'
				open={visible}
				onClose={() => {
					setForm(initialForm);
					closeHandler();
				}}
			>
				<Modal.Header>
					<Text id='modal-title' size={18}>
						Welcome to
						<Text b size={18}>
							Alkemy Wallet
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
					<Radio.Group row value={form.opType}>
						<Radio
							value='income'
							color='secondary'
							onChange={() => {
								setForm({ ...form, opType: 'income' });
							}}
						>
							Income
						</Radio>
						<Radio
							value='expense'
							color='secondary'
							onChange={() => {
								setForm({ ...form, opType: 'expense' });
							}}
						>
							Expense
						</Radio>
					</Radio.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color='error' onClick={closeHandler}>
						Close
					</Button>

					<Button auto onClick={handleSubmit}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
