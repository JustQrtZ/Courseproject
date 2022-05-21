import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import { Button, Form } from "react-bootstrap";
import { path } from "../../routers/path";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { registration } from "../../redux/account/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';

export default function Register() {
	const dispatch = useDispatch();
	const [state, setState] = useState({ email: "", username: "", password: "" });
	const { addToast, removeAllToasts } = useToasts()
	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const { error, loading, isLogIn } = useSelector((state) => state.account);

	const submitRegistration = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(registration(state));
		},
		[dispatch, state]
	);

	useEffect(() => {
		if (error === "" && loading === false && isLogIn === true) {
			setTimeout(() => {
				window.location.href = "../";
			}, 1000);
		}
		if (error !== "" && loading === false && isLogIn === false) {
			removeAllToasts();
			addToast(error, {
				placement: "top-center",
				appearance: "error",
			});
		}
	}, [error, loading, isLogIn, addToast, removeAllToasts]);

	const { t } = useTranslation();

	return (
		<S.Container>
			<Form onSubmit={(e) => submitRegistration(e)}>
				<S.Text>{t("Signup")}</S.Text>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>{t("Email")}</Form.Label>
					<Form.Control
						type="email"
						placeholder={t("Enter email")}
						value={state.email}
						onChange={onChange("email")}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>{t("Username")}</Form.Label>
					<Form.Control
						type="text"
						placeholder={t("Enter username")}
						value={state.username}
						onChange={onChange("username")}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>{t("Password")}</Form.Label>
					<Form.Control
						type="password"
						placeholder={t("Enter password")}
						value={state.password}
						onChange={onChange("password")}
					/>
				</Form.Group>
				<Button variant="outline-primary" type="submit" className="w-100">
					{t("Submit")}
				</Button>
				<Nav className="p-3">
					{t("U have an account?")}
					{"\xA0"}
					<Nav.Link className="p-0" href={path.login}>
						{t("Login")}
					</Nav.Link>
				</Nav>
			</Form>
		</S.Container>
	);
}
