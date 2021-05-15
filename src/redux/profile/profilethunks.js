import {actions} from "./const";
import {request} from "../../services/requests"
import{
  GET_USER_BENEFITS,
  GET_USER_PROFILE,
  GET_USER_COMPANIES
}from "../../const/api"

export const getUserProfile = () => {
  return (dispach) =>{
    dispach({
      type: actions.getUserProfileRequest
    })
    request(
      {
        url: GET_USER_PROFILE,
        method: "GET"
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getUserProfileSuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getUserProfileFail});
    });
  };
};

export const getUserBenefits = () => {
  return (dispach) =>{
    dispach({
      type: actions.getUserBenefitsRequest
    })
    request(
      {
        url: GET_USER_BENEFITS,
        method: "GET"
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getUserBenefitsSuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getUserBenefitsFail});
    });
  };
};

export const getUserCompanies = () => {
  return (dispach) =>{
    dispach({
      type: actions.getUserCompaniesRequest
    })
    request(
      {
        url: GET_USER_COMPANIES,
        method: "GET"
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getUserCompaniesSuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getUserCompaniesFail});
    });
  };
};