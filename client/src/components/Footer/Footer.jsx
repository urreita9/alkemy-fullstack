import React from 'react';

import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<div
			style={{
				// position: 'absolute',
				// // right: '0',
				// bottom: '0',

				height: '70px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<ul
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					width: '100%',
				}}
			>
				<li style={{ fontSize: '20px' }}>
					<a
						href='https://github.com/urreita9'
						target='_blank'
						style={{ color: '#141414' }}
					>
						<BsGithub />
					</a>
				</li>
				<li style={{ fontSize: '20px' }}>
					<a
						href='https://www.franciscourrea.com.ar/'
						target='_blank'
						style={{ color: '#141414' }}
					>
						<BiWorld /> franciscourrea.com.ar
					</a>
				</li>
				<li style={{ fontSize: '20px' }}>
					<a
						href='https://www.linkedin.com/in/francisco-urrea/'
						target='_blank'
						style={{ color: '#141414' }}
					>
						<BsLinkedin />
					</a>
				</li>
			</ul>
		</div>
	);
};
