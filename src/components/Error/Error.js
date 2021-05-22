import React, {useState} from "react";
import { Toast } from "react-bootstrap";

export default function Error({showProp}) {
  const [show, setShow] = useState(showProp);

	return (
		<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
			<Toast.Body>
				<strong className="mr-auto">Error</strong>
			</Toast.Body>
		</Toast>
	);
}
