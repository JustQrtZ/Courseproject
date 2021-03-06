import { combineReducers } from "redux";
import account from "../account/reducer";
import users from "../users/reducer"
import companies from "../company/reducer"
import profile from "../profile/reducer"
import tags from "../tags/reducer"
import benefits from "../benefits/reducer"
import news from "../news/reducer"

export  const reducers = combineReducers({
	account,
  users,
  companies,
  profile,
  tags,
  benefits,
  news
});
