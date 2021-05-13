import { actions } from "./const";

const initialstate = {
	id: undefined,
	username: undefined,
	isLogIn: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialstate, action) => {
	switch (action.type) {
		case actions.signup:
		case actions.login:
			return {
				id: action.payload.id,
				username: action.payload.username,
				role: action.payload.role,
				designTheme: action.payload.designTheme,
				isLogIn: true,
			};

		case actions.logout:
			return initialstate;
		
		case action.loginFail:
			return {
				error: action.payload.error
			}
		default:
			return state;
	}
};
