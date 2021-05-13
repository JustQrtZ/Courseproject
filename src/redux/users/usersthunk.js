import { actions } from "./const";
import {
	GETALLUSERS,
	BLOCKUSERSLIST,
	UNBLOCKUSERSLIST,
	DELETEUSERSLIST,
} from "../../const/api";
import { request } from "../../services/requests";

export const getAllUsers = () => {
	return (dispach) => {
		dispach({
			type: actions.getAllUsersRequest,
		});
		request(
			{
				url: GETALLUSERS,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getAllUsersSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getAllUsersFail });
			});
	};
};

export const blockUsersList = (userList) => {
	return (dispach) => {
		console.log("tuk")
		dispach({
			type: actions.blockUsers,
		});
		request(
			{
				url: BLOCKUSERSLIST,
				method: "POST",
				data: userList
			},
			false
		)
		.then(({data}) =>
		{
			console.log(data)
		})
		.catch(({data}) =>
		{
			console.log(data)
		})
	}
}

// export const changeLanguage = (langFunction) => {
//   return dispatch => {
//     dispatch({
//       type: con.CHANGE_LANGUAGE,
//       payload: {
//         language: langFunction
//       }
//     });
//   }
// }