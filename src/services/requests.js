import axios from "axios";
import { REFRESHTOKEN, REACT_APP_MAIN_API_URL } from "../const/api";
import { history } from "../utils/history";
import { path } from "../routers/path";
import { actions } from "../redux/account/const";
import { getStore } from "../redux/store/createStore";

const axiosInstance = axios.create({
	baseURL: REACT_APP_MAIN_API_URL,
});

export const request = (params, refresh = true) => {
	const { dispatch } = getStore();
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	const authorization = accessToken ? `Bearer ${accessToken}` : "";

	return axiosInstance({
		...params,
		headers: {
			authorization,
		},
	}).then((data) => {
		if (refresh) {
			if (accessToken && refreshToken) {
				request({
					url: REFRESHTOKEN,
					method: "POST",
					data: { accessToken, refreshToken },
				})
					.then(({ data }) => {
						localStorage.setItem("accessToken", data.accessToken);
						localStorage.setItem("refreshToken", data.refreshToken);
					})
					.catch(() => {
						history.replace(path.login);
						dispatch({ type: actions.logout });
					});
			}
		}
		return data;
	});
};
