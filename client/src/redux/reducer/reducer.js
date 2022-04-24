import {
	GET_OPERATIONS,
	FILTER_ALL,
	FILTER_INCOME,
	FILTER_OUTCOME,
	LOGIN_USER,
	LOGOUT_USER,
} from '../actions/actions';
const initialState = {
	operations: [],
	filteredOperations: [],
	user: {},
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
		case FILTER_ALL:
			return {
				...state,
				filteredOperations: [...state.operations],
			};
		case FILTER_INCOME:
			const filterIncome = state.operations.filter(
				(op) => op.opType === 'income'
			);
			return {
				...state,
				filteredOperations: filterIncome,
			};

		case FILTER_OUTCOME:
			const filterOutcome = state.operations.filter(
				(op) => op.opType === 'outcome'
			);
			return {
				...state,
				filteredOperations: filterOutcome,
			};
		case LOGIN_USER:
			return {
				...state,
				user: payload,
			};
		case LOGOUT_USER:
			return {
				...state,
				user: payload,
			};

		default:
			return state;
	}
};

export default reducer;
