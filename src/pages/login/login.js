import React, { useState, useCallback,useEffect } from "react";
import * as S from "./styles";
import { Button, Form } from "react-bootstrap";
import { path } from "../../routers/path";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle,loginFacebook } from "../../redux/account/thunk";
import { useTranslation } from "react-i18next";
import { OldSocialLogin as SocialLogin } from "react-social-login";

export default function Login(){
	const dispatch = useDispatch();

	const [state, setState] = useState({ email: "", password: "" });
	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const {error, loading, isLogIn} = useSelector((state) => state.account)

	const submitGoogleLogin = useCallback(
		(responce) => {
			console.log(responce);	
			dispatch(loginGoogle(responce.token.idToken));
		},
		[dispatch]
	);

	const submitFacebookLogin = useCallback(
		(responce) => {
			console.log(responce.token.accessToken);
			dispatch(loginFacebook(responce.token.accessToken));
		},
		[dispatch]
	);

	const submitLogin = useCallback((e) => {
			e.preventDefault()
			dispatch(login(state));		
		},
		[dispatch,state]
	);

	useEffect(()=>{
		if(error==="" && loading===false && isLogIn===true)
			{
				setTimeout(() => {
					window.location.href = '../'
				}, 1000);
			}
	},[error,loading,isLogIn])

	const { t } = useTranslation();

	return (
		<S.Container>
			<Form onSubmit={(e) => submitLogin(e)}>
				<S.Text>{t("Login")}</S.Text>
				<Form.Group>
					<Form.Label>{t("Email")}</Form.Label>
					<Form.Control
						type="email"
						placeholder={t("Enter email")}
						value={state.email}
						onChange={onChange("email")}
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
				<Button
					variant="outline-primary"
					className="w-100"
					type="submit"
				>
					{t("Submit")}
				</Button>
				<Nav className="p-3">
					{t("Don't have an account?")}
					{"\xA0"}
					<Nav.Link className="p-0" as={Link} to={path.signup}>
						{t("Signup")}
					</Nav.Link>
				</Nav>
				<Container className="d-flex justify-content-around">
				<SocialLogin
						provider="google"
						appId="991314430680-h8ith0uiifrvjo82is04p3u1seurvld2.apps.googleusercontent.com"
						key="google"
						callback={submitGoogleLogin}
					>
						<Button variant="outline-danger" className="mr-2">Login Google</Button>
					</SocialLogin>
					<SocialLogin
						provider="facebook"
						appId="496659901364938"
						callback={submitFacebookLogin}
					>
						<Button variant="outline-primary" className="ml-2">Login Facebook </Button>
					</SocialLogin>
				</Container>
			</Form>
		</S.Container>
	);
};
