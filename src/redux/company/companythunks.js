import { actions } from "./consts";
import { ajax } from "jquery";

import {
	GETALLCOMPANIES,
	GET_IMAGES_FOR_COMPANY,
	GET_SINGLE_COMPANY,
	EDIT_COMPANY,
	GET_COMPANY_VIDEO,
	EDIT_COMPANY_MAIN_IMAGE,
	SET_COMPANY_RATING,
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

export const getPhotosForCompany = (companyId) => {
	return (dispach) => {
		dispach({
			type: actions.getImageForCompanyRequest,
		});
		request(
			{
				url: GET_IMAGES_FOR_COMPANY,
				method: "GET",
				params: { companyId: companyId },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getImageForCompanySuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getImageForCompanyFail });
			});
	};
};

export const uloadPhoto = (photo, companyId) => {
	return (dispach) => {
		dispach({
			type: actions.uploadImageRequest,
		});
		ajax({
			type: "POST",
			url: "https://api.imgbb.com/1/upload",
			data: {
				key: "1a9908a71a7b2fd666e90eaf49a403e5",
				image: photo,
			},
		})
			.then(({ data }) => {
				console.log(data.image.url);
				request(
					{
						url: EDIT_COMPANY_MAIN_IMAGE,
						method: "PATCH",
						data: {
							companyid: companyId,
							image: data.image.url,
						},
					},
					false
				).then(() => {
					dispach({
						type: actions.uploadImageSuccess,
						payload: data.image.url,
					});
				});
			})
			.catch(({ data }) => {
				console.log(data);
				dispach({ type: actions.getImageForCompanyFail });
			});
	};
};

export const editCompany = (company, tags) => {
	return (dispach) => {
		dispach({
			type: actions.editCompanyRequest,
		});
		ajax({
			type: "POST",
			url: "https://api.imgbb.com/1/upload",
			data: {
				key: "1a9908a71a7b2fd666e90eaf49a403e5",
				image: company.mainPhotoUrl,
			},
		}).then(({ data }) => {
			console.log(company.mainPhotoUrl);
			dispach({
				type: actions.uploadImageSuccess,
				payload: data.image.url,
			});
			request(
				{
					url: EDIT_COMPANY,
					method: "PATCH",
					data: {
						CompanyId: company.id,
						title: company.title,
						theme: company.theme,
						Tags: tags,
						description: company.description,
						requiredAmount: company.requiredAmount,
						mainPhotoUrl: data.image.url,
						EndCompanyDate: company.endCompanyDate,
						videoUrl: company.videoUrl,
					},
				},
				false
			)
				.then(() => {
					dispach({
						type: actions.editCompanySuccess,
						payload: { company, tags },
					});
				})
				.catch(() => {
					dispach({ type: actions.editCompanyFail });
				});
		});
	};
};

export const getCompanyVideo = (companyId) => {
	return (dispach) => {
		dispach({
			type: actions.getCompanyVideoRequest,
		});
		request(
			{
				url: GET_COMPANY_VIDEO,
				method: "GET",
				params: { companyId: companyId },
			},
			false
		)
			.then(({ data }) => {
				dispach({
					type: actions.getCompanyVideoSuccess,
					payload: data,
				});
			})
			.catch(() => {
				dispach({ type: actions.getCompanyVideoFail });
			});
	};
};

export const editCompanyVideo = (companyId, videoUrl) => {
	return (dispach) => {
		dispach({
			type: actions.editCompanyVideoRequest,
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
