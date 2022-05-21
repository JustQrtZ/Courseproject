import { actions } from "./const";
import { request } from "../../services/requests";
import {
	GET_ALL_COMPANY_BENEFITS,
	CREATE_PAYMENT,
	CREATE_BENEFIT,
	EDIT_BENEFIT,
	DELETE_BENEFIT,
} from "../../const/api";

export const getCompanyBenefits = (companyid) => {
	return (dispach) => {
		dispach({
			type: actions.getAllCompanyBenefitsRequest,
		});
		request(
			{
				url: GET_ALL_COMPANY_BENEFITS,
				method: "GET",
				params: { id: companyid },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getAllCompanyBenefitsSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getAllCompanyBenefitsFail });
			});
	};
};

export const createPayment = (benefitId, companyId) => {
	return (dispach) => {
		dispach({
			type: actions.createPaymentRequest,
		});
		request(
			{
				url: CREATE_PAYMENT,
				method: "POST",
				data: {
					CrowdfundingCompanyId: companyId,
					CompanyBenefitId: benefitId,
				},
			},
			false
		)
			.then(() => {
				debugger;
				dispach({
					type: actions.createPaymentSuccess,
				});
			})
			.catch(() => {
				dispach({ type: actions.createPaymentFail });
			});
	};
};

export const createBenefit = (name, cost, company) => {
	return (dispach) => {
		dispach({
			type: actions.createPaymentRequest,
		});
		request(
			{
				url: CREATE_BENEFIT,
				method: "POST",
				data: {
					Cost: cost,
					Name: name,
					CrowdfundingCompanyId: company,
				},
			},
			false
		)
			.then((data) => {
				dispach({
					type: actions.createPaymentSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.createPaymentFail });
			});
	};
};

export const editBenefit = (benefit) => {
	return (dispach) => {
		dispach({
			type: actions.editBenefitRequest,
		});
		request(
			{
				url: EDIT_BENEFIT,
				method: "PATCH",
				data: {
					Id: benefit.id,
					Cost: benefit.Cost,
					Name: benefit.Name,
					CrowdfundingCompany: benefit.Company,
				},
			},
			false
		)
			.then((data) => {
				dispach({
					type: actions.editBenefitSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.editBenefitFail });
			});
	};
};

export const deleteBenefit = (benefit, company) => {
	return (dispach) => {
		console.log(benefit);
		dispach({
			type: actions.deleteBenefitRequest,
		});
		request(
			{
				url: DELETE_BENEFIT,
				method: "POST",
				data: {
					id: benefit,
					CrowdfundingCompany: company,
				},
			},
			false
		)
			.then(() => {
				dispach({
					type: actions.deleteBenefitSuccess,
					payload: benefit,
				});
			})
			.catch((data) => {
				dispach({
					type: actions.deleteBenefitFail,
					payload: data.response.data.error,
				});
			});
	};
};
