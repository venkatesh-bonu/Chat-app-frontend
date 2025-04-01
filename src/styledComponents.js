import styled from "styled-components";
import { styled as styledFromMui } from "@mui/material";
import { StyleRounded } from "@mui/icons-material";
import {Link as LinkComponent} from 'react-router-dom'
import { gray, matBlack } from "./ constants/colors";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image : linear-gradient(to right, #56ccf2, #2f80ed);
`;

export const LoginForm = styled.form`
  width: 100%;
  @media (min-width : 768px){
    width : 350px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VisuallyHidden = styledFromMui("input")({
  border : 0,
  clip : "rect(0 0 0 0)",
  height : 1,
  margin : -1,
  overflow : "hidden",
  padding : 0,
  position : "absolute",
  whiteSpace : "nowrap",
  width : "1px"
})

export const Link = styled(LinkComponent)`
    text-decoration : none;
    color : black;
    padding : 0rem;
    &:hover{
      background-color : #0f0f0f10;
    }
`;

export const InputBox = styled("input")`
    width : 100%;
    height : 100%;
    border : none;
    outline : none;
    padding : 1rem;
    padding-left : 3rem;
    border-radius : 1.5rem;
    background-color : ${gray};

`

export const SearchField = styled('input')`
    padding : 1rem 2rem;
    width : 20vmax;
    border : none;
    outline : none;
    border-radius : 1.5rem;
    background-color : ${gray};
    font-size : 1.1rem;

`

export const CurveButton = styled('button')`
    border-radius : 1.5rem;
    padding : 1rem 2rem;
    border : none;
    outline : none;
    cursor : pointer;
    background-color : ${matBlack};
    color : white;
    font-size : 1.1rem;
    &:hover {
      background-color : rgba(0,0,0,0.8);
    }
`