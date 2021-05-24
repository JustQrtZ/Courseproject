import { actions } from "./consts";

import {
	GETALLCOMPANIES,
	GET_SINGLE_COMPANY,
	EDIT_COMPANY,
	SET_COMPANY_RATING,
	GET_USER_COMPANY_RATING
} from "../../const/api";
import { request } from "../../services/requests";

export const getAllCompanies = () => {
	return (dispach) => {
		dispach({
			type: actions.getAllCompaniesRequest,
		});
		request(
			{
				url: GETALLCOMPANIES,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getAllCompaniesSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getAllCompaniesFail });
			});
	};
};

export const getSingleCompany = (companyId) => {
	return (dispach) => {
		dispach({
			type: actions.getSingleCompanyRequest,
		});
		request(
			{
				url: GET_SINGLE_COMPANY,
				method: "GET",
				params: { companyId: companyId },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getSingleCompanySuccess,
					payload: data,
				});
			})
			.catch((data) => {
				console.log(data);
				dispach({ type: actions.getSingleCompanyFail });
			});
	};
};

export const editCompany = (company, editedCompany, mainPhoto, imageGalery) => {
	return (dispach) => {

		dispach({
			type: actions.editCompanyRequest,
		});
		request(
			{
				url: EDIT_COMPANY,
				method: "PATCH",
				data: {
					CompanyId: company.id,
					title: company.title,
					theme: company.theme,
					Tags: editedCompany.tags,
					description: company.description,
					requiredAmount: company.requiredAmount,
					mainPhotoUrl: mainPhoto[0],
					EndCompanyDate: company.endCompanyDate,
					videoUrl: company.videoUrl,
					Photos: imageGalery,
				},
			},
			false
		)
			.then((data) => {
				dispach({
					type: actions.editCompanySuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.editCompanyFail });
			});
	};
};

export const createCompanyRating = (rating, company) => {
	return (dispach) => {
		dispach({
			type: actions.createRatingCompanyRequest,
		});
		request(
			{
				url: SET_COMPANY_RATING,
				method: "POST",
				data: { CrowdfundingCompany: company, Rating: rating },
			},
			false
		)
			.then(() => {
				dispach({
					type: actions.createRatingCompanySuccess,
					payload: rating,
				});
			})
			.catch(() => {
				dispach({
					type: actions.createRatingCompanyFail,
				});
			});
	};
};

export const getUserCompanyRating = (companyId) => {
	return (dispach) => {
		dispach({
			type: actions.getUserCompanyRatingRequest,
		});
		request(
			{
				url: GET_USER_COMPANY_RATING,
				method: "GET",
				params: { companyId: companyId },
			},
			false
		)
			.then(({ data }) => {
				console.log(data)
				dispach({
					type: actions.getUserCompanyRatingSuccess,
					payload: data,
				});
			})
			.catch((data) => {
				console.log(data);
				dispach({ type: actions.getUserCompanyRatingFail });
			});
	};
};
