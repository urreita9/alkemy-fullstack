import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, useTheme } from '@nextui-org/react';

export const NavBar = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();
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

			<Button
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
			</Button>
		</div>
	);
};
