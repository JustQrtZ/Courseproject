import { actions } from "./const";

const initialstate = {
	benefits: [],
	error: "",
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
				...state,
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
				benefits: [...state.benefits, action.payload.data],
				error: "",
			};

		case actions.editBenefitRequest: {
			return {
				...state,
			};
		}

		case actions.editBenefitSuccess: {
			return {
				error: "",
				benefits: action.payload.data,
			};
		}
		case actions.editBenefitFail: {
			return {
				...state,
				error: action.payload.data,
			};
		}

		case actions.deleteBenefitRequest: {
			return {
				...state,
				error: "",
			};
		}

		case actions.deleteBenefitSuccess: {
			return {
				...state,
				benefits: state.benefits.filter(i => action.payload !== i.id),
			}
		}
		
		case actions.deleteBenefitFail: {
			return {
				...state,
				error: action.payload
			}
		}

		default:
			return state;
	}
};
