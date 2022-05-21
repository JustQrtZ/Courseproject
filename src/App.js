import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider } from "react-redux";
import { generateStore } from "./redux/store/createStore";
import Router from "./routers/routers";
import { ToastProvider } from 'react-toast-notifications';

const store = generateStore();

const App = () => {
	return (
		<Provider store={store}>
			<ToastProvider
				placement="top-center"
			>
				<Router />
			</ToastProvider>
		</Provider>
	);
};

export default App;
