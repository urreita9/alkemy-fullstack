const initialState = {
	operations: [],
	filteredOperations: [],
	operation: {},
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};

export default reducer;
