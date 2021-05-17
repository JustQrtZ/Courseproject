import { actions } from "./consts";

const initialstate = {
	data: [],
	allData: [],
	singleCompany: {},
	companyPhotos: [],
	loading: true,
	Videoloading: true,
	editedCompany: {tags: [] },
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

		case actions.uploadImageRequest:
			return {
				...state,
			};

		case actions.uploadImageSuccess:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					mainPhotoUrl: action.payload,
				},
			};
		case actions.uploadImageFail:
			return {
				...state,
				error: action.payload,
			};

		case actions.editCompanyRequest:
			return {
				...state,
			};

		case actions.editCompanySuccess:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					title: action.payload.company.title,
					theme: action.payload.company.theme,
					requiredAmount: action.payload.company.requiredAmount,
					EndCompanyDate: action.payload.company.endCompanyDate,
					description: action.payload.company.description,
					tags: action.payload.tags,
					сollectedNow: action.payload.company.сollectedNow,
					сompletionPercentage: action.payload.company.сompletionPercentage,
					rating: action.payload.company.rating,
					videoUrl: action.payload.company.videoUrl,
				},
			};
		case actions.editCompanyFail:
			return {
				...state,
				error: action.payload,
			};

		case actions.getCompanyVideoRequest:
			return {
				...state,
				Videoloading: true,
			};

		case actions.getCompanyVideoSuccess:
			return {
				...state,
				videoUrl: action.payload,
				Videoloading: false,
			};

		case actions.getCompanyVideoFail:
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

		case actions.editCompanyVideoRequest:
			return {
				...state,
			};

		case actions.editCompanyVideoSuccess:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					videoUrl: action.payload,
				},
			};
		case actions.editCompanyVideoFail:
			return {
				...state,
				error: action.payload,
			};

		case actions.addCompanyImageRequst:
			return {
				...state
			}
		case actions.addCompanyImageSuccess:
			return {
				...state,
				companyPhotos:{
					companyPhotos:[...state.companyPhotos,action.payload]
				}
			}
		case actions.addCompanyImageFail:
			return {
				...state,
				error: action.payload
			}
		default:
			return state;
	}
};

export default Company;
