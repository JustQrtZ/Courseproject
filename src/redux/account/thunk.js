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

export const login = (email, password) => {
	return (dispach) => {
		request(
			{
				url: LOGIN,
				method: "POST",
				data: { email, password },
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
			.catch(({ ex }) => {
				console.log(ex);
			});
	};
};

export const loginGoogle = (tokenId) => {
	return (dispach) => {
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
			.catch(({ ex }) => {
				console.log(ex);
			});
	};
};

export const loginFacebook = (token) => {
	return (dispach) => {
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
			.catch(({ ex }) => {
				console.log(ex);
			});
	};
};

export const refreshToken = () => {
	return (dispach) => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
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
	};
};

export const getLogInUserFromAccessToken = () => {
	return (dispach) => {
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
	};
};

export const registration = (Email, Username, password) => {
	return (dispach) => {
		request(
			{
				url: REGISTER,
				method: "POST",
				data: { Email, Username, password },
			},
			false
		).then(({ data }) => {
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
		});
	};
};
