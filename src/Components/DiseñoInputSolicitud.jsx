import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BoxCampo = styled.div`
  width: 80%;
  position: relative;
  z-index: 90;
  margin-top: 10px;
  ${(props) =>
    props.ubicacion &&
    css`
      margin-top: -30px;
    `}
  ${(props) =>
    props.tipo === "number" &&
    css`
      width: 25%;
    `}
    ${(props) =>
    props.completo &&
    css`
      width: 100%;
    `}
    ${(props) =>
    props.select &&
    css`
      width: 40%;
      margin-right: 20px;
    `}
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

export const InputOpcion = styled.input`
  height: 40px;
  margin-top: 5px;
  width: 87%;
  font-family: bold;
  outline: none;
  border-radius: 5px;
  border: 2px solid #3b256a;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid black;
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
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
export const TextAreaBox = styled.textarea`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  height: 100px; /* Altura inicial */
  width: 100%;
  padding: 10px;
  font-family: bold;
  outline: none;
  border-radius: 5px;
  border: 2px solid #3b256a;
  font-size: 18px;
  border-bottom-width: 2px;
  transition: all 0.1s ease;
  line-height: 1.5;
  resize: none; /* Evita que el usuario cambie el tamaño manualmente */
  overflow-y: auto;

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
  ${(props) =>
    props.espacio  &&
    css`
      margin-top: 20px;
    `}
`;

export const Select = styled.select`
  height: 45px;
  width: 100%;
  font-family: bold;
  outline: none;
  border-radius: 5px;
  border: 2px solid #3b256a;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

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
