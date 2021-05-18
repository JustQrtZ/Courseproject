import React, { useState, useEffect, useCallback } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { getAllTags } from "../../redux/tags/tagsthunks";
import { useDispatch, useSelector } from "react-redux";
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import { actions } from "../../redux/company/consts";
import { getAllCompanies } from "../../redux/company/companythunks";

const baseTagifySettings = {
	blacklist: ["xxx", "yyy", "zzz"],
	maxTags: 6,
	placeholder: "type something",
	dropdown: {
		enabled: 0,
	},
};

export default function TagsCompopent(target, tagsValue) {
	const dispatch = useDispatch();
	const [tagifySettings, setTagifySettings] = useState([]);
	const [tagifyProps, setTagifyProps] = useState({});

	const tags = useSelector((store) => store.tags);

	useEffect(() => {
		dispatch(getAllTags());
		setTagifyProps((lastProps) => ({
			...lastProps,
			whitelist: tags.tags,
      value: target.tagsValue
		}));
		setTagifySettings((lastSettings) => ({
			...lastSettings,
		}));
	}, [dispatch, tags.tags,target.tagsValue]);

	const settings = {
		...baseTagifySettings,
		...tagifySettings,
	};

	const onChange = useCallback(
		(e) => {
			if (target.target === "main") {
				if (e.detail.value !== "") {
					dispatch({
						type: actions.companiesFilter,
						payload: JSON.parse(e.detail.value),
					});
				} else {
					dispatch(getAllCompanies());
				}
			} else {
				dispatch({
					type: actions.companyTags,
					payload: JSON.parse(e.detail.value).map((i) => i.value),
				});
			}
		},
		[dispatch, target]
	);

	return (
		<Tags
			settings={settings}
      defaultValue="test"
			autoFocus={true}
			{...tagifyProps}
			onChange={onChange}
			onEditInput={() => console.log("onEditInput")}
			onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
			onEditUpdated={() => console.log("onEditUpdated")}
			onEditStart={() => console.log("onEditStart")}
			onEditKeydown={() => console.log("onEditKeydown")}
			onDropdownShow={() => console.log("onDropdownShow")}
			onDropdownHide={() => console.log("onDropdownHide")}
			onDropdownSelect={() => console.log("onDropdownSelect")}
			onDropdownScroll={() => console.log("onDropdownScroll")}
			onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
			onDropdownUpdated={() => console.log("onDropdownUpdated")}
		/>
	);
}
