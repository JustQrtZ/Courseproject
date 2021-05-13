import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	getLogInUserFromAccessToken,
	refreshToken,
} from "../redux/account/thunk";

const withInit = (Component) => {
	class init extends PureComponent {
		state = {
			isInit: false,
		};

		async componentDidMount() {
			await this.props.refreshToken();
			await this.props.getLogInUserFromAccessToken();
			this.setState({ isInit: true });
		}

		render() {
			const inInit = this.state.isInit;
			if (!inInit) {
				return null;
			}

			return <Component {...this.props} />;
		}
	}

	const mapDispatchToProps = {
		refreshToken,
		getLogInUserFromAccessToken,
	};

	return connect(null, mapDispatchToProps)(init);
};

export default withInit;
