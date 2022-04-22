import React from 'react';
import {
	Modal,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Grid,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
// import { Mail } from './Mail';
// import { Password } from './Password';

export default function LoginModal() {
	const [visible, setVisible] = React.useState(false);
	const navigate = useNavigate();
	const handler = () => setVisible(true);

	const closeHandler = () => {
		setVisible(false);
		console.log('closed');
	};

	return (
		<div style={{ minWidth: '200px', maxWidth: '500px', margin: '30px auto' }}>
			{/* <Button auto shadow onClick={handler}>
				Open modal
			</Button> */}

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
						// contentLeft={<Password fill='currentColor' />}
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
				<Button color='secondary' auto onClick={closeHandler}>
					Sign in
				</Button>
			</div>
		</div>
	);
}
