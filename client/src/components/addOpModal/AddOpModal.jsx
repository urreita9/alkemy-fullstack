import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Text, Input, Radio } from '@nextui-org/react';
import { postOperation } from '../../helpers/axios';
import { getOperations } from '../../redux/actions/actions';

const initialForm = {
	description: '',
	amount: 0,
	opType: 'income',
};
export default function AddOpModal({ visible, closeHandler }) {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({
		description: '',
		amount: '',
	});
	const dispatch = useDispatch();
	const uid = localStorage.getItem('uid-alkemy');

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

	const handleSubmit = () => {
		if (errors.description || errors.amount) return;

		postOperation(uid, form).then((data) => {
			dispatch(getOperations(uid));
		});
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
							value='outcome'
							color='secondary'
							onChange={() => {
								setForm({ ...form, opType: 'outcome' });
							}}
						>
							Outcome
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
