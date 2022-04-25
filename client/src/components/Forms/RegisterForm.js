export const checkRegForm = ({ email, password, password2 }) => {
	const e = {
		state: false,

		email: '',
		password: '',
		password2: '',
	};

	if (email) {
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				email
			)
		) {
			e.email = 'Must be a valid email';
			e.state = true;
		}
	} else {
		e.email = 'Email is required';
		e.state = true;
	}

	if (password) {
		if (password.length < 6) {
			e.password = 'Password must be at least 6 characters long';
			e.state = true;
		}
		if (!password.trim(' ').length) {
			e.password = 'Password cant be empty';
			e.state = true;
		}
	} else {
		e.password = 'Must type in a password';
		e.state = true;
	}
	if (password && password2) {
		if (password !== password2) {
			e.password2 = 'Passwords dont match';
			e.state = true;
		}
	}

	if (!password2) {
		e.password2 = 'Field is required';
		e.state = true;
	}
	return e;
};
