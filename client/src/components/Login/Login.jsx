import { Button, Input, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../helpers/axios';

export const Login = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		login(form).then((data) => {
			if (data.token) {
				navigate('/');
			}
		});
	};
	return (
		<form
			style={{ minWidth: '200px', maxWidth: '500px', margin: '30px auto' }}
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
	);
};
