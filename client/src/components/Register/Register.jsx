import React, { useEffect, useState } from 'react';
import { Modal, Button, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/actions';
// import { Mail } from './Mail';
// import { Password } from './Password';

export const Register = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
		password2: '',
	});
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const token = localStorage.getItem('token-alkemy');
	useEffect(() => {
		if (user.auth) {
			console.log('LOGNI USERT', user);
			navigate('/');
		} else if (token) {
			dispatch(getUser(token));
		}
	}, [user]);

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (register(form)) {
			navigate('/login');
		}
	};

	return (
		<form
			style={{
				width: '80%',
				minWidth: '200px',
				maxWidth: '500px',
				margin: '30px auto',
			}}
			onSubmit={handleSubmit}
		>
			{/* <Button auto shadow onClick={handler}>
				Open modal
			</Button> */}

			<div>
				<Text id='modal-title' b size={18}>
					Sign Up
				</Text>
			</div>
			<div>
				<div style={{ marginTop: '20px' }}>
					<Input
						clearable
						bordered
						fullWidth
						color='secondary'
						size='lg'
						placeholder='Email'
						onChange={handleInputChange}
						value={form.email}
						name='email'
						autoComplete='off'
						aria-label='Email'
					/>
				</div>
				<div style={{ marginTop: '20px' }}>
					<Input
						clearable
						bordered
						fullWidth
						color='secondary'
						size='lg'
						placeholder='Password'
						onChange={handleInputChange}
						value={form.password}
						name='password'
						type='password'
						autoComplete='off'
						aria-label='Password'
					/>
				</div>
				<div style={{ marginTop: '20px' }}>
					<Input
						clearable
						bordered
						fullWidth
						color='secondary'
						size='lg'
						placeholder='Repeat Password'
						onChange={handleInputChange}
						value={form.password2}
						name='password2'
						type='password'
						autoComplete='off'
						aria-label='Password'
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '20px',
				}}
			>
				<Text
					color='secondary'
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/login')}
					size={14}
				>
					Already have an account?
				</Text>{' '}
				<Button color='secondary' auto type='submit'>
					Sign in
				</Button>
			</div>
		</form>
	);
};
