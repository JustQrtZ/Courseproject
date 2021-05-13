import { actions } from "./consts"

const initialstate = {
	data: [],
};

const Company = (state = initialstate, action) => {
  switch(action.type){
    case actions.getAllCompaniesRequest:
      return {
        ...state,
      };

    case actions.getAllCompaniesSuccess:
      return {
        ...state,
        data: action.payload,
      };
    case actions.getAllCompaniesFail:
      return {
        ...state,
        data: []
      };
    default:
      return state;

  }
};
export default Company;