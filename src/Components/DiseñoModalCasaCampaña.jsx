import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 2s ease-in-out;
  z-index: 90;
`;
export const ContenedorModal = styled.div`
  transition: all 0.5s ease-in-out;
  width: 70%;
  height: 70%;
  min-height: 100px;
  background: #f7fbfc;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 8px 7px 29px 8px;
  padding: 30px;
  top: 10px;
  overflow: auto;
`;
export const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;
export const Titulo = styled.div`
  font-size: 25px;
  font-weight: 1000;
  position: relative;
  width: 100%;
  text-align: center;
`;
export const BotonCerrar = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 30px;
  width: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: black;
  &:hover {
    background: red;
  }
`;
export const DetalleUsuario = styled.div`
   width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-items: center;
  z-index: 1;
  gap: 30px;
  ${(props) =>
    props.info &&
    css`
    width: 100%;
      background-color: orange;
      flex-wrap: nowrap;
    `}
`;

export const BotonAñadir = styled.button`
width: 40%;
height: 35px;
background-color: #6603b2;
color: white;
padding: 10px;
border-radius: 15px;
border: 1px solid black;
${(props) =>
    props.solicitud &&
    css`
      width: 50%;
      height: 35px;
    `}
    ${(props) =>
    props.modificar &&
    css`
      width: 60%;
      height: 35px;
      margin-bottom: 50px;
    `}
`

export const ContainerBoton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  margin-top: 20px;
  ${(props) =>
    props.ubicacion &&
    css`
      margin-top: 0px;
      height: auto;
    `}
`
export const ContainerMapa = styled.div `
  width: 500px;
  height: 300px;
  margin-top: -20px;
`
export const ContainerListaMateriales = styled.div`
  width: 80%;
  overflow: auto;
`

export const ContainerImgIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 1px;
  border-radius: 50%;
  &:hover {
    background: #d6d6d6;
  }
`;
export const ImgIconEliminar = styled(FontAwesomeIcon)`
  
`;