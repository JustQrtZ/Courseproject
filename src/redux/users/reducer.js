import { actions } from "./const";
//import * as con from '../../const/lenguage';

const initialstate = {
	data: [],
	isLogIn: false,
	language: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.getAllUsersRequest:
			return {
				...state,
				isLogIn: true,
			};
    case actions.getAllUsersSuccess:
      return {
        ...state,
        data: action.payload,
        isLogIn: false,
      }
    case actions.getAllUsersFail:
      return {
        isLogIn: false
      }
		case actions.blockUsers:
			return{
				isLogIn: false
			}
		// case con.CHANGE_LANGUAGE:
		// 	return{
		// 		...state, language: action.payload.language
		// 	}

		default:
			return state;
	}
};
