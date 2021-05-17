import { actions } from "./const";

const initialstate = {
	benefits: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.getAllCompanyBenefitsRequest:
			return {
				...state,
			};

		case actions.getAllCompanyBenefitsSuccess:
			return {
				benefits: action.payload,
			};

		case actions.getAllCompanyBenefitsFail:
			return {
				...state,
			};

		case actions.createPaymentRequest:
			return {
				state,
			};

		case actions.createPaymentSuccess:
			return {
				state,
			};

		case actions.createPaymentFail:
			return {
				state
			};

		default:
			return state;
	}
};
