import { actions } from "./const";
import { request } from "../../services/requests";
import {
	GET_ALL_COMPANY_BENEFITS,
	CREATE_PAYMENT,
	CREATE_BENEFIT,
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
					CrowdfundingCompany: company,
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
