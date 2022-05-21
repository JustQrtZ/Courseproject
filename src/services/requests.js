import axios from "axios";
import { REFRESHTOKEN, REACT_APP_MAIN_API_URL } from "../const/api";
import { history } from "../utils/history";
import { path } from "../routers/path";
import { actions } from "../redux/account/const";
import { getStore } from "../redux/store/createStore";

const axiosInstance = axios.create({
	baseURL: REACT_APP_MAIN_API_URL,
});

const TOKEN_EXPIRED = [401];

export const request = async (params, refresh = true) => {
	const { dispatch } = getStore();
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	const authorization = accessToken ? `Bearer ${accessToken}` : "";

	try {
		return await axiosInstance({
			...params,
			headers: {
				authorization,
			},
		})

	} catch (error) {
		if (TOKEN_EXPIRED.includes(error?.response?.status)) {
			try {
				const { data } = await axiosInstance({
					method: 'POST',
					url: REFRESHTOKEN,
					data: { accessToken, refreshToken },
				})
	
				localStorage.setItem("accessToken", data?.accessToken);
				localStorage.setItem("refreshToken", data?.refreshToken);

				return await request({
					...params,
					headers: {
						authorization,
					},
				})
			} catch (e) {
				history.replace(path.login);
				dispatch({ type: actions.logout });
			}
		}

		throw error;
	}
};
