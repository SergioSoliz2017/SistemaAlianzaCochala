import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BoxCampo = styled.div`
  width: cal(100% / 2 - 10px);
  position: relative;
  z-index: 90;
  
`;
export const IconoValidacion = styled(FontAwesomeIcon)`
  position: absolute;
  right: 1px;
  bottom: 14px;
  z-index: 100;
  font-size: 20px;
  opacity: 0;
  top: 37px;
  ${(props) =>
    props.valido === "false" &&
    css`
      opacity: 1;
      color: red;
    `}
  ${(props) =>
    props.valido === "true" &&
    css`
      opacity: 1;
      color: green;
    `}
`;
export const InputBox = styled.input`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  height: 40px;
  width: 100%;
  padding-left: 10px;
  font-family: bold;
  outline: none;
  border-radius: 5px;
  border: 2px solid #3b256a;
  font-size: 18px;
  border-bottom-width: 2px;
  transition: all 0.1s ease;
  line-height: 45px;
  &:hover {
    border: 2px solid black;
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  &:focus {
    border: 2px solid black;
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  ${(props) =>
    props.valido === "true" &&
    css`
      border: 3px solid green;
    `}
  ${(props) =>
    props.valido === "false" &&
    css`
      border: 3px solid red;
    `}
`;
export const TextBox = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 16px;
  margin-left: 10px;
  font-family: "bold";
`;
