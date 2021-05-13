import React, {useState} from "react";
import * as S from "./styles";
import { Button, Form } from "react-bootstrap";
import { path } from "../../routers/path";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registration } from "../../redux/account/thunk";
import { connect } from "react-redux";


const Register = ({ submitRegistration }) => {
	const [state, setState] = useState({ email: "", username: "", password: "" });
	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const {t} = useTranslation();

	return (
		<S.Container>
			<Form>
				<S.Text>{t("Signup")}</S.Text>
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
				<Button
					variant="outline-primary"
					onClick={() =>
						submitRegistration(state.email, state.username, state.password)
					}
					className="w-100"
				>
					{t("Submit")}
				</Button>
				<Nav className="p-3">
					{t("U have an account?")}
					{"\xA0"}
					<Nav.Link className="p-0" as={Link} to={path.login}>
						{t("Login")}
					</Nav.Link>
				</Nav>
			</Form>
		</S.Container>
	);
};

const mapDispatchToProps = {
	submitRegistration: registration,
};
export default connect(null, mapDispatchToProps)(Register);
