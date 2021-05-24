import { actions } from "./consts";

const initialstate = {
	data: [],
	allData: [],
	singleCompany: { companyPhotos: [] },
	loading: true,
	Videoloading: true,
	editedCompany: { tags: [], companyPhotos: [],loadingi:false, mainPhotoUrl:"" },
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
				singleCompany: {
					...state.singleCompany,
					companyPhotos: action.payload,
				},
			};

		case actions.getImageForCompanyFail:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					companyPhotos: [
						"https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png",
					],
				},
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
				...state,
			};
		case actions.addCompanyImageSuccess:
			return {
				...state,
				singleCompany: {
					...state.singleCompany,
					videoUrl: action.payload,
				},
				companyPhotos: {
					companyPhotos: [...state.companyPhotos, action.payload],
				},
			};
		case actions.addCompanyImageFail:
			return {
				...state,
				error: action.payload,
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
				editedCompany:{
					...state.editedCompany,
					loadingi: false
				}
			}
		default:
			return state;
	}
};

export default Company;
