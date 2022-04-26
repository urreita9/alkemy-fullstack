import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text } from '@nextui-org/react';
import { getUser, login } from '../../redux/actions/actions';
import { checkLoginForm } from '../Forms/LoginForm';
import { Logo } from '../Logo/Logo';

const initErrors = {
	state: false,
	email: '',
	password: '',
};

export const Login = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState(initErrors);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const token = localStorage.getItem('token-alkemy');

	useEffect(() => {
		if (user.auth) {
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
		const check = checkLoginForm(form);
		setErrors((prevState) => {
			return { ...prevState, ...check };
		});
		if (!check.state) {
			dispatch(login(form));
		}
	};

	return (
		<>
			<Logo />
			<form
				style={{
					width: '80%',
					minWidth: '200px',
					maxWidth: '500px',
					margin: '30px auto',
				}}
				onSubmit={handleSubmit}
			>
				<div>
					<Text id='modal-title' b size={18}>
						Sign In
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
					{errors.password && <Text color='error'>{errors.password}</Text>}
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
						onClick={() => navigate('/register')}
						size={14}
					>
						Dont have an account?
					</Text>{' '}
					<Button color='secondary' auto type='submit'>
						Sign in
					</Button>
				</div>
			</form>
			<div style={{ textAlign: 'center' }}>
				<Text h6 css={{ fontSize: '40px', color: '#141414' }}>
					Keep it <span style={{ color: '#00D26A' }}>simple</span> with
				</Text>
				<Text
					h1
					weight='bold'
					color='secondary'
					css={{ letterSpacing: '-4px' }}
				>
					Alkemy
				</Text>{' '}
				<Text h6 css={{ fontSize: '40px', color: '#141414' }}>
					wallet.
				</Text>
			</div>
		</>
	);
};
