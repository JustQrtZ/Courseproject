import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../login/styles";
import {useDispatch, useSelector } from "react-redux";
import {getUserBenefits, getUserCompanies, getUserProfile} from "../../redux/profile/profilethunks"

const Profile = () => {
  const { profileInfo, userBenefits, userCompanies } = useSelector((state) => state.profile)
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserBenefits());
    dispatch(getUserCompanies());
    dispatch(getUserProfile());
	}, [dispatch]);

  return(
    <Container>
      <Container>
				{profileInfo.id}
        </Container>
        <Container>
        {profileInfo.username}</Container>
        <Container>{profileInfo.email}</Container>
        <Container>{profileInfo.language}</Container>
        <Container>{profileInfo.designTheme}</Container>
        <Container>{profileInfo.lastLoginDate}</Container>
    </Container>
  );
}

export default Profile
