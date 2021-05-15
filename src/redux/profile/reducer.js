import { actions } from "./const";

const initialstate = {
	profileInfo: {},
	userBenefits: [],
	userCompanies: [],
	isLogIn: false,
	language: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.getUserProfileRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.getUserProfileSuccess:
			return {
				...state,
				profileInfo: action.payload,
				isLogIn: false,
			};

		case actions.getUserProfileFail:
			return {
				isLogIn: false,
			};

		case actions.getUserCompaniesRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.getUserCompaniesSuccess:
			return {
				...state,
				userCompanies: action.payload,
				isLogIn: false,
			};

		case actions.getUserCompaniesFail:
			return {
				isLogIn: false,
			};
		case actions.getUserBenefitsRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.getUserBenefitsSuccess:
			return {
				...state,
				userBenefits: action.payload,
				isLogIn: false,
			};

		case actions.getUserBenefitsFail:
			return {
				isLogIn: false,
			};

			case actions.changeLanguageRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.changeLanguageSuccess:
			return {
				...state,
				isLogIn: false,
			};

		case actions.changeLanguageFail:
			return {
				...state,
				isLogIn: false,
			};

		default:
			return state;
	}
};
