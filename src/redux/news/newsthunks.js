import { actions } from "./consts";

import { CREATE_NEWS, GET_ALL_NEWS } from "../../const/api";
import { request } from "../../services/requests";

export const getAllNews = (companyId) => {
	return (dispach) => {
		dispach({
			type: actions.getAllNewsRequest,
		});
		request(
			{
				url: GET_ALL_NEWS,
				method: "GET",
        params: companyId
			},
			false
		) 
			.then(({ data }) => {
				dispach({
					type: actions.getAllNewsSuccess,
					payload: data,
				});
			})
			.catch((data) => {
				dispach({ type: actions.getAllNewsFail, payload: data });
			});
	};
};

export const createNews = (companyNews) => {
	return (dispach) => {
		dispach({
			type: actions.createNewsRequest,
		});
		request(
			{
				url: CREATE_NEWS,
				method: "POST",
        data: {}
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getAllNewsSuccess,
					payload: data,
				});
			})
			.catch((data) => {
				dispach({ type: actions.getAllNewsFail, payload: data });
			});
	};
};
