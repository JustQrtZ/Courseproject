import React from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";
import {useTranslation} from "react-i18next"

export const Modal = ({ title, children, visible, handleVisible, saveChanges }) => {
  const {t} = useTranslation();

	return (
		<BootstrapModal show={visible} onHide={handleVisible}>
			<BootstrapModal.Header closeButton>
				<BootstrapModal.Title>{title}</BootstrapModal.Title>
			</BootstrapModal.Header>
			<BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
					<Button variant="secondary" onClick={handleVisible}>
						{t("Close")}
					</Button>
					<Button variant="primary" onClick={saveChanges}>
						{t("Save Changes")}
					</Button>
				</BootstrapModal.Footer>
		</BootstrapModal>
	);
};
