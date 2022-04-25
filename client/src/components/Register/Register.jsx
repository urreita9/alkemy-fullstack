import React, { useEffect, useState } from 'react';
import { Modal, Button, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/actions';
import { checkRegForm } from '../Forms/RegisterForm';
// import { Mail } from './Mail';
// import { Password } from './Password';
const initErrors = {
	state: false,
	email: '',
	password: '',
	password2: '',
};

export const Register = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
		password2: '',
	});
	const [errors, setErrors] = useState(initErrors);
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
		setErrors({
			...errors,
			[e.target.name]: '',
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const check = checkRegForm(form);
		setErrors((prevState) => {
			return { ...prevState, ...check };
		});
		if (!check.state) {
			if (register(form)) {
				navigate('/login');
			}
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
				{errors.email && <Text color='error'>{errors.email}</Text>}
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
				{errors.password && <Text color='error'>{errors.password2}</Text>}
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
				{errors.password2 && <Text color='error'>{errors.password2}</Text>}
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
