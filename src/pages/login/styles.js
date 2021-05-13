import styled from "styled-components";

export const Container = styled.div`
	flex-direction: column;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: center;
	height: 70vh;
`;

export const Text = styled.p`
	font-size: 60px;
	text-align: center;
`;

export const BtnFacebook = styled.button`
    width: 165px;
    height:35px;  
    border-radius: 4px;
    background: #3b5998;
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:5px;
    display: inline-block;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`;

export const BtnGoogle = styled.button`
    margin:5px;
    width: 165px;
    height:35px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`;