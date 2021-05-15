import { actions } from "./const";
//import * as con from '../../const/lenguage';

const initialstate = {
	data: [],
	isLogIn: false,
	language: "",
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
			};
		case actions.getAllUsersFail:
			return {
				isLogIn: false,
			};
		case actions.blockUsers:
			return {
				...state,
				isLogIn: false,
			};
		case actions.blockUsersRequest:
			return {
				...state,
				isLogIn: true,
			};
		case actions.blockUsersSuccess:
			return {
				...state,
				data: state.data.map((i) => {
					if (action.payload.includes(i.id)) {
						console.log(i);
						i.isActive = false;
						return i;
					} else {
						return i;
					}
				}),
				isLogIn: false,
			};

		case actions.blockUsersFail:
			return {
				...state,
				isLogIn: false,
			};
		case actions.unblockUsersRequest:
			return {
				...state,
				isLogIn: true,
			};
		case actions.unblockUsersSuccess:
			return {
				...state,
				data: state.data.map((i) => {
					if (action.payload.includes(i.id)) {
						console.log(i);
						i.isActive = true;
						return i;
					} else {
						return i;
					}
				}),
				isLogIn: false,
			};

		case actions.deleteUsersRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.deleteUsersSuccess:
			return {
				...state,
				data: state.data.filter(i => !action.payload.includes(i.id)),
				isLogIn: false,
			};

		case actions.deleteUsersFail:
			return {
				...state,
				isLogIn: false,
			};

		case actions.makeAdminRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.makeAdminSuccess:
			return {
				...state,
				data: state.data.map((i) => {
					if (action.payload.includes(i.id)) {
						console.log(i);
						i.role = "Admin";
						return i;
					} else {
						return i;
					}
				}),
				isLogIn: false,
			};

		case actions.makeAdminFail:
			return {
				...state,
				isLogIn: false,
			};

		case actions.makeUserRequest:
			return {
				...state,
				isLogIn: true,
			};

		case actions.makeUserSuccess:
			return {
				...state,
				data: state.data.map((i) => {
					if (action.payload.includes(i.id)) {
						console.log(i);
						i.role = "User";
						return i;
					} else {
						return i;
					}
				}),
				isLogIn: false,
			};

		case actions.makeUserFail:
			return {
				...state,
				isLogIn: false,
			};

		default:
			return state;
	}
};
