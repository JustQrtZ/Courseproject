import React, { useState } from "react";
import * as signalR from "@microsoft/signalr";

export const Comments = ({ token, companyId }) => {
	const [state] = useState({ accessToken: token });

	const hubConnection = new signalR.HubConnectionBuilder()
		.withUrl("http://webapp-210513212326.azurewebsites.net/comments", {
			accessTokenFactory: () => state.accessToken,
		})
		.build();

	hubConnection.start()

	return <>Test</>;
};
