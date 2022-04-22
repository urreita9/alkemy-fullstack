import React, { useState } from 'react';
import {
	Modal,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Radio,
} from '@nextui-org/react';
// import { Mail } from './Mail';
// import { Password } from './Password';

export default function AddOpModal({ visible, handler, closeHandler }) {
	const [form, setForm] = useState({
		description: '',
		amount: 0,
		opType: 'income',
	});
	const [errors, setErrors] = useState({
		description: '',
		amount: '',
	});

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
		console.log('passed');
		console.log(form);
	};

	return (
		<div>
			<Modal
				closeButton
				aria-labelledby='modal-title'
				aria-label='form'
				open={visible}
				onClose={closeHandler}
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
