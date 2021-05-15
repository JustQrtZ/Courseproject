import { actions } from "./consts";

const initialstate = {
	data: [],
	singleCompany: {},
	companyPhotos: [],
	loading: true,
};

const Company = (state = initialstate, action) => {
	switch (action.type) {
		case actions.getAllCompaniesRequest:
			return {
				...state,
			};

		case actions.getAllCompaniesSuccess:
			return {
				...state,
				data: action.payload,
			};

		case actions.getAllCompaniesFail:
			return {
				...state,
				data: [],
			};

		case actions.getSingleCompanyRequest:
			return {
				...state,
				loading: true,
			};

		case actions.getSingleCompanySuccess:
			return {
				...state,
				singleCompany: action.payload[0],
				loading: false,
			};
		case actions.getSingleCompanyFail:
			return {
				...state,
				data: [],
				singleCompany: null,
				error: action.payload,
			};

		case actions.getImageForCompanyRequest:
			return {
				...state,
			};

		case actions.getImageForCompanySuccess:
			return {
				...state,
				companyPhotos: action.payload,
			};
		case actions.getImageForCompanyFail:
			return {
				...state,
				companyPhotos: [],
				error: action.payload,
			};

		default:
			return state;
	}
};

export default Company;
