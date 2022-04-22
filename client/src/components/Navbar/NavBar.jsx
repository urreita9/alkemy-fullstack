import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, useTheme } from '@nextui-org/react';
import { useSelector } from 'react-redux';

export const NavBar = () => {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { theme } = useTheme();

	console.log(user);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0px 20px',
				backgroundColor: theme?.colors.gray900.value,
			}}
		>
			<img
				width={70}
				height={70}
				alt='app icon'
				src='https://cdn-icons-png.flaticon.com/512/189/189709.png'
			/>

			<Text
				onClick={() => {
					navigate('/');
				}}
			>
				<Text color='white' h2>
					Alkemy
				</Text>
				<Text color='white' h3>
					wallet
				</Text>
			</Text>
			<Text color='white' h3>
				{user?.email}
			</Text>
		</div>
	);
};
