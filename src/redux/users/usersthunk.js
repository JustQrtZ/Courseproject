import { actions } from "./const";
import {
	GETALLUSERS,
	BLOCKUSERSLIST,
	UNBLOCKUSERSLIST,
	DELETEUSERSLIST,
	MAKE_ADMIN_LIST,
	MAKE_USER_LIST
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
		dispach({
			type: actions.blockUsersRequest,
		});
		request(
			{
				url: BLOCKUSERSLIST,
				method: "POST",
				data: userList,
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.blockUsersSuccess,
					payload: userList
				});
			})
			.catch(({ data }) => {
				dispach({
					type: actions.blockUsersFail,
				});
			});
	};
};

export const unBlockUsersList = (userList) => {
	return (dispach) => {
		dispach({
			type: actions.unblockUsersRequest,
		});
		request(
			{
				url: UNBLOCKUSERSLIST,
				method: "POST",
				data: userList,
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.unblockUsersSuccess,
					payload: userList
				});
			})
			.catch(({ data }) => {
				dispach({
					type: actions.unblockUsersFail,
				});
			});
	};
};

export const deleteUsersList = (userList) => {
	return (dispach) => {
		dispach({
			type: actions.deleteUsersRequest,
		});
		request(
			{
				url: DELETEUSERSLIST,
				method: "POST",
				data: userList,
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.deleteUsersSuccess,
					payload: userList
				});
			})
			.catch(({ data }) => {
				dispach({
					type: actions.deleteUsersFail,
				});
			});
	};
};

export const makeadmin = (userList) => {
	return (dispach) => {
		dispach({
			type: actions.makeAdminRequest,
		});
		request(
			{
				url: MAKE_ADMIN_LIST,
				method: "PATCH",
				data: userList,
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.makeAdminSuccess,
					payload: userList
				});
			})
			.catch(({ data }) => {
				dispach({
					type: actions.makeAdminFail,
				});
			});
	};
};


export const makeuser = (userList) => {
	return (dispach) => {
		dispach({
			type: actions.makeUserRequest,
		});
		request(
			{
				url: MAKE_USER_LIST,
				method: "PATCH",
				data: userList,
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.makeUserSuccess,
					payload: userList
				});
			})
			.catch(({ data }) => {
				dispach({
					type: actions.makeUserFail,
				});
			});
	};
};
