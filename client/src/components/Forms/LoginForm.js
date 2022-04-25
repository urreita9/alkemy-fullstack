export const checkLoginForm = ({ email, password }) => {
	const e = {
		state: false,
		email: '',
		password: '',
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
	} else {
		e.password = 'Field is required';
		e.state = true;
	}
	return e;
};
