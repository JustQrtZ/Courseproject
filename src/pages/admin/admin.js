import React, { useState, useEffect, useCallback } from "react";
import * as S from "./styles";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Lock, Unlock } from "react-bootstrap-icons";
import { DataGrid } from "@material-ui/data-grid";
import {
	getAllUsers,
	blockUsersList,
	unBlockUsersList,
	deleteUsersList
} from "../../redux/users/usersthunk";

const columns = [
	{ field: "id", headerName: "ID", width: 150 },
	{ field: "username", headerName: "Username", width: 250 },
	{ field: "email", headerName: "Email", width: 250 },
	{ field: "registrationDate", headerName: "registrationDate", width: 350 },
	{ field: "lastLoginDate", headerName: "Last login", width: 350 },
	{ field: "isActive", headerName: "isActive", width: 125 },
];

export default function Admin() {
	const { data } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	useEffect(() => {
		if(data===null || data === undefined)
		{
			window.location.href = '../'
		}
	})
	const [selectionModel, setSelectionModel] = useState([]);

	const blockClick = useCallback(() => {
		console.log(selectionModel);
		dispatch(blockUsersList(selectionModel));
	}, [selectionModel, dispatch]);

	const unblockClick = useCallback(() => {
		console.log(selectionModel);
		dispatch(unBlockUsersList(selectionModel));
	}, [selectionModel, dispatch]);

	const deleteClick = useCallback(() => {
		console.log(selectionModel);
		dispatch(deleteUsersList(selectionModel));
	}, [selectionModel, dispatch]);

	return (
		<S.Container>
			<ButtonGroup aria-label="Basic example">
				<Button variant="secondary" onClick={deleteClick}>Delete</Button>
				<Button variant="secondary" onClick={blockClick}>
					<Lock />
				</Button>
				<Button variant="secondary" onClick={unblockClick}>
					<Unlock />
				</Button>
			</ButtonGroup>

			<div style={{ height: "100%", width: "100%" }}>
				<DataGrid
					checkboxSelection
					rows={data}
					columns={columns}
					pregistrationDateSize={5}
					onSelectionModelChange={(newSelection) => {
						setSelectionModel(newSelection.selectionModel);
					}}
				/>
			</div>
		</S.Container>
	);
}

/*
const mapDispatchToProps = {
	submitLogin: login,
};

export default connect(null, mapDispatchToProps)(Login);
*/
