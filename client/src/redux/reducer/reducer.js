import { GET_OPERATIONS } from '../actions/actions';
const initialState = {
	operations: [],
	filteredOperations: [],
	operation: {},
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_OPERATIONS:
			return {
				...state,
				operations: payload,
				filteredOperations: payload,
			};
		default:
			return state;
	}
};

export default reducer;
