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
				...state,
			};

		case actions.createPaymentSuccess:
			return {
				...state,
			};

		case actions.createPaymentFail:
			return {
				...state,
			};
		case actions.createBenefitRequest:
			return {
				...state,
			};
		case actions.createBenefitSuccess:
			return {
				benefits: [...state.benefits, action.payload],
			};

		case actions.editBenefitRequest: {
			return {
				...state,
			};
		}

		case actions.editBenefitSuccess: {
			return {
				...state,
				benefits: action.payload.data,
			};
		}
		case actions.editBenefitFail: {
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
