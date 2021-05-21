import styled from "styled-components";

export const Thumb = styled.div`
	position: relative;
	display: inline-flex;
	border-radius: 2px;
	border: "1px solid #eaeaea";
	margin-bottom: 8px;
	margin-right: 8px;
	width: 100px;
	height: 100px;
	padding: 4px;
	box-sizing: border-box;
`;

export const ThumbInner = styled.div`
	display: flex;
	min-width: 0px;
	overflow: hidden;
`;

export const Img = styled.img`
  display: block;
  width: "auto";
  height: "100%";
`

export const ThumbsContainer = styled.aside`
 display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  padding: 20px;
`

export const DropZone = styled.div`
height:200px;
display:flex;
border: 1px solid black;
justify-content:center
`

export const DropzoneText = styled.p`
align-self:center;
`

export const ThumbButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(0,0,0,.8);
  color: "#fff";
  border: 0px;
  border-radius: .325em;
  cursor: pointer;
`