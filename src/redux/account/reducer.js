import { actions } from "./const";

const initialstate = {
	id: undefined,
	username: undefined,
	isLogIn: false,
	error: "",
	loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.authRequest:
			return {
				...state,
				loading: true,
				error: ""
			};

		case actions.signup:
		case actions.login:
			return {
				id: action.payload.id,
				username: action.payload.username,
				role: action.payload.role,
				designTheme: action.payload.designTheme,
				isLogIn: true,
				error: "",
				loading: false,
			};

		case actions.logout:
			return initialstate;

		case actions.loginFail:
			console.log(action.payload)
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
