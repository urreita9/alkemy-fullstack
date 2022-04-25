export const checkAddForm = ({ description, amount }) => {
	const e = {
		state: false,

		description: '',
		amount: '',
	};

	if (description) {
		if (!description.length) {
			e.description = 'Must write a description';
			e.state = true;
		}
		if (!description.trim(' ').length) {
			e.description = 'Must write a description';
			e.state = true;
		}
	} else {
		e.description = 'Description is required';
		e.state = true;
	}

	if (amount) {
		if (amount < 0) {
			e.amount = 'Amount cant be less than 0';
			e.state = true;
		}
	} else {
		e.amount = 'Amount is required';
		e.state = true;
	}

	return e;
};
