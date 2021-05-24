import { actions } from "./consts";

const initialstate = {
	data: [],
	allData: [],
	singleCompany: { companyPhotos: [] },
	singleCompanyRating: {
		userRating: 0,
		ratingLoad: false,
	},
	loading: true,
	Videoloading: true,
	editedCompany: {
		tags: [],
		companyPhotos: [],
		loadingi: false,
		mainPhotoUrl: "",
	},
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
				alldata: action.payload,
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

		case actions.editCompanyRequest:
			return {
				...state,
				loading: true,
			};

		case actions.editCompanySuccess:
			return {
				...state,
				singleCompany: action.payload.data[0],
				loading: false,
			};
		case actions.editCompanyFail:
			return {
				...state,
				error: action.payload,
			};

		case actions.companiesFilter:
			return {
				...state,
				data: state.alldata.filter((company) => {
					let isHaveTags = false;
					for (let i = 0; i < action.payload.length; i++) {
						isHaveTags = company.tags.includes(action.payload[i].value);
					}
					return isHaveTags;
				}),
			};

		case actions.companyTags:
			return {
				...state,
				editedCompany: {
					...state.editedCompany,
					tags: action.payload,
				},
			};

		case actions.createRatingCompanyRequest:
			return {
				...state,
			};
		case actions.createRatingCompanySuccess:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					rating: action.payload,
				},
			};
		case actions.editCompanyImageGalety:
			return {
				...state,
				editedCompany: {
					...state.editedCompany,
					companyPhotos: action.payload,
				},
			};
		case actions.editCompanyMainImage:
			return {
				...state,
				editedCompany: {
					...state.editedCompany,
					mainPhotoUrl: action.payload,
				},
			};
		case actions.editCompanyImageRequest:
			return {
				...state,
				editedCompany: {
					...state.editedCompany,
					loadingi: true,
				},
			};
		case actions.editCompanyImageSuccess:
			return {
				...state,
				editedCompany: {
					...state.editedCompany,
					loadingi: false,
				},
			};
		case actions.getUserCompanyRatingRequest:
			return {
				...state,
				singleCompanyRating: {
					ratingLoad: true,
				},
			};
		case actions.getUserCompanyRatingSuccess:
			return {
				...state,
				singleCompanyRating: {
					userRating: action.payload,
					ratingLoad: false,
				},
			};
		case actions.getUserCompanyRatingFail:
			return { ...state };
		default:
			return state;
	}
};

export default Company;
