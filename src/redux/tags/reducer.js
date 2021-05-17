import { actions } from "./const";

const initialstate = {
	tags: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.getAllTagsRequest:
			return {
				...state,
			};

		case actions.getAllTagsSuccess:
			return {
				tags: action.payload
			};

		case actions.getAllTagsFail:
			return {
				...state
			};

		default:
			return state;
	}
};
