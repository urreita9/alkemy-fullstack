import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, useTheme } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/actions';

export const NavBar = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { theme } = useTheme();

	const logoutUser = () => {
		dispatch(logout());

		navigate('/login');
	};
	return (
		<div
			style={{
				height: '80px',
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
					if (user.auth) {
						navigate('/');
					}
				}}
			>
				<Text color='white' h4>
					Alkemy wallet
				</Text>
			</div>
			<div style={{ textAlign: 'center' }}>
				{user.auth && (
					<>
						<Text color='white' h6>
							{user.email}
						</Text>
						<Button color='secondary' size='xs' onClick={logoutUser}>
							Logout
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
