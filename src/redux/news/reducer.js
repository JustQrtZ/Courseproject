import { actions } from "./consts";

const initialstate = {
	news: [],
	loading: true,
	editedNews: null,
	error: "",
};

const News = (state = initialstate, action) => {
	switch (action.type) {
		case actions.getAllNewsRequest:
			return {
				...state,
			};

		case actions.getAllNewsSuccess:
			return {
				...state,
				news: action.payload,
				loading: false,
			};

		case actions.getAllNewsFail:
			return {
				...state,
				news: [],
				loading: false,
			};

		case actions.createNewsRequest:
			return {
				...state,
				loading: true,
			};

		case actions.createNewsSuccess:
			return {
				...state,
				news: action.payload,
				loading: false,
			};

		case actions.createNewsFail:
			return {
				...state,
				data: [],
				singleCompany: null,
				error: action.payload,
			};

		case actions.editNewsRequest:
			return {
				...state,
				loading: true,
			};

		case actions.editNewsSuccess:
			return {
				...state,
				news: action.payload,
				loading: false,
			};

		case actions.editNewsFail:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};

export default News;
