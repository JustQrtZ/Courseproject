import {actions} from "./consts";
import{
  GETALLCOMPANIES, GET_IMAGES_FOR_COMPANY, GET_SINGLE_COMPANY,
}from "../../const/api"
import {request} from "../../services/requests"

export const getAllCompanies = () => {
  return (dispach) =>{
    dispach({
      type: actions.getAllCompaniesRequest
    })
    request(
      {
        url: GETALLCOMPANIES,
        method: "GET"
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getAllCompaniesSuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getAllCompaniesFail});
    });
  };
};

export const getSingleCompany = (companyId) => {
  return (dispach) =>{
    dispach({
      type: actions.getSingleCompanyRequest
    })
    request(
      {
        url: GET_SINGLE_COMPANY +`/${companyId}`,
        method: "GET",
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getSingleCompanySuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getSingleCompanyFail});
    });
  };
};

export const getPhotosForCompany = (companyId) => {
  return (dispach) =>{
    dispach({
      type: actions.getImageForCompanyRequest
    })
    request(
      {
        url: GET_IMAGES_FOR_COMPANY+`/${companyId}`,
        method: "GET",
      },false
    ).then(({data}) => {
      dispach({
        type: actions.getImageForCompanySuccess,
        payload: data
      });
    }).catch(() => {
      dispach({type: actions.getImageForCompanyFail});
    });
  };
};