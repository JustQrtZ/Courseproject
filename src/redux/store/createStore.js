import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

let store;

export const getStore = () => store;

export const generateStore = () => {
	const middleware = [thunk];

	let appliedMiddleware = applyMiddleware(...middleware);

	if (
		typeof window === "object" &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		process.env.NODE_ENV !== "production"
	) {
		appliedMiddleware = compose(
			appliedMiddleware,
			window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	}

	store = createStore(reducers, appliedMiddleware);

	return store;
};
