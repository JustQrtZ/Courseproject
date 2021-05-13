import {actions} from "./consts";
import{
  GETALLCOMPANIES,
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