import { actions } from "./const";
import { request } from "../../services/requests";
import {
  GET_ALL_TAGS
} from "../../const/api";

export const getAllTags = () => {
	return (dispach) => {
		dispach({
			type: actions.getAllTagsRequest,
		});
		request(
			{
				url: GET_ALL_TAGS,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getAllTagsSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getAllTagsFail });
			});
	};
};