import { actions } from "./const";
import { request } from "../../services/requests";
import {
	GET_USER_BENEFITS,
	GET_USER_PROFILE,
	GET_USER_COMPANIES,
	CHANGE_LANGUAGE,
	CREATE_COMPANY,
} from "../../const/api";

export const getUserProfile = () => {
	return (dispach) => {
		dispach({
			type: actions.getUserProfileRequest,
		});
		request(
			{
				url: GET_USER_PROFILE,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getUserProfileSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getUserProfileFail });
			});
	};
};

export const getUserBenefits = () => {
	return (dispach) => {
		dispach({
			type: actions.getUserBenefitsRequest,
		});
		request(
			{
				url: GET_USER_BENEFITS,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getUserBenefitsSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getUserBenefitsFail });
			});
	};
};

export const getUserCompanies = () => {
	return (dispach) => {
		dispach({
			type: actions.getUserCompaniesRequest,
		});
		request(
			{
				url: GET_USER_COMPANIES,
				method: "GET",
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getUserCompaniesSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getUserCompaniesFail });
			});
	};
};

export const changeLanguage = (lng) => {
	return (dispach) => {
		dispach({
			type: actions.changeLanguageRequest,
		});
		request(
			{
				url: CHANGE_LANGUAGE,
				method: "POST",
        data: {
          language: lng
        }
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.changeLanguageSuccess,
				});
			})
			.catch(() => {
				dispach({ type: actions.changeLanguageFail });
			});
	};
};

export const createCompany = (company, editedCompany, mainPhoto, imageGalery) => {
	return (dispach) => {

		dispach({
			type: actions.createCompanyRequest,
		});
		request(
			{
				url: CREATE_COMPANY,
				method: "POST",
				data: {
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
					type: actions.createCompanySuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.createCompanyFail });
			});
	};
};