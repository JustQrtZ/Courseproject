import { actions } from "./const";
import {
	LOGIN,
	REFRESHTOKEN,
	GETLOGENINUSER,
	REGISTER,
	LOGIN_GOOGLE,
	LOGIN_FACEBOOK,
} from "../../const/api";
import { request } from "../../services/requests";

export const login = (userData) => {
	return (dispach) => {
		dispach({
			type: actions.authRequest,
		});
		request(
			{
				url: LOGIN,
				method: "POST",
				data: { email: userData.email, password: userData.password },
			},
			false

		)
			.then(({ data }) => {
				dispach({
					type: actions.login,
					payload: {
						id: data.id,
						username: data.username,
						role: data.role,
						designTheme: data.designTheme,
					},
				});
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				localStorage.setItem("lng", data.language);
			})
			.catch((error) => {
				dispach({
					type: actions.loginFail,
					payload: error.response.data.error,
				});
			});
	};
};

export const loginGoogle = (tokenId) => {
	return (dispach) => {
		dispach({
			type: actions.authRequest,
		});
		request(
			{
				url: LOGIN_GOOGLE,
				method: "POST",
				data: { tokenId },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.login,
					payload: {
						id: data.id,
						username: data.username,
						role: data.role,
						designTheme: data.designTheme,
					},
				});
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				localStorage.setItem("lng", data.language);
			})
			.catch((error) => {
				dispach({
					type: actions.loginFail,
					pauload: error.response.data.error,
				});
			});
	};
};

export const loginFacebook = (token) => {
	return (dispach) => {
		dispach({
			type: actions.authRequest,
		});
		request(
			{
				url: LOGIN_FACEBOOK,
				method: "POST",
				data: { token },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.login,
					payload: {
						id: data.id,
						username: data.username,
						role: data.role,
						designTheme: data.designTheme,
					},
				});
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				localStorage.setItem("lng", data.language);
			})
			.catch((error) => {
				dispach({
					type: actions.loginFail,
					pauload: error.response.data.error,
				});
			});
	};
};

export const refreshToken = () => {
	return (dispach) => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		if (accessToken && refreshToken) {
			request(
				{
					url: REFRESHTOKEN,
					method: "POST",
					data: { accessToken, refreshToken },
				},
				false
			)
				.then(({ data }) => {
					localStorage.setItem("accessToken", data.accessToken);
					localStorage.setItem("refreshToken", data.refreshToken);
				})
				.catch(() => {
					localStorage.clear();
				});
		} else {
			localStorage.clear();
		};
	}
};

export const getLogInUserFromAccessToken = () => {
	return (dispach) => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		if (accessToken && refreshToken) {
			request(
				{
					url: GETLOGENINUSER,
					method: "POST",
				},
				false
			)
				.then(({ data }) => {
					dispach({
						type: actions.login,
						payload: {
							id: data.id,
							username: data.username,
							role: data.role,
							designTheme: data.designTheme,
						},
					});
					localStorage.setItem("lng", data.language);
				})
				.catch(() => {
					localStorage.clear();
				});
		} else {
			localStorage.clear();
		}
	};
};

export const registration = (user) => {
	return (dispach) => {
		dispach({
			type: actions.authRequest,
		});
		request(
			{
				url: REGISTER,
				method: "POST",
				data: {
					email: user.email,
					username: user.username,
					password: user.password,
				},
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.login,
					payload: {
						id: data.id,
						username: data.username,
						role: data.role,
						designTheme: data.designTheme,
					},
				});
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				localStorage.setItem("lng", data.language);
			})
			.catch((data) => {
				dispach({
					type: actions.loginFail,
					payload: "Registration error",
				});
			});
	};
};
