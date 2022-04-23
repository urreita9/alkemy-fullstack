import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, useTheme } from '@nextui-org/react';
import { useSelector } from 'react-redux';

export const NavBar = () => {
	const operations = useSelector((state) => state.operations);
	const navigate = useNavigate();
	const { theme } = useTheme();

	const token = localStorage.getItem('token-alkemy');

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'space-around',
				padding: '0px 20px',
				backgroundColor: theme?.colors.gray900.value,
			}}
		>
			<div
				style={{ cursor: 'pointer' }}
				onClick={() => {
					navigate('/');
				}}
			>
				<Text color='white' h2>
					Alkemy wallet
				</Text>
			</div>
			<div style={{ textAlign: 'center' }}>
				{' '}
				{token?.length && (
					<>
						<Text color='white' h6>
							{operations.length && operations[0].User.email}
						</Text>
						<Button color='secondary' size='sm' onClick={logout}>
							Logout
						</Button>
						)
					</>
				)}
			</div>
		</div>
	);
};
