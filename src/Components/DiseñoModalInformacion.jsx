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
  width: 40%;
  height: 60%;
  min-height: 100px;
  background: #f7fbfc;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 8px 7px 29px 8px;
  padding: 30px;
  top: 10px;
  overflow: auto;
  @media (max-width: 800px) {
    width: 70%;
  }
  ${(props) =>
    props.asignar &&
    css`
      height: 35%;
    `}
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
  ${(props) =>
    props.asignar &&
    css`
      justify-content: center;
    `}
  ${(props) =>
    props.fotos &&
    css`
      flex-direction: column;
    `}
`;

export const BotonAñadir = styled.button`
  width: 50%;
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
    props.asignar &&
    css`
      width: 80%;
      height: 35px;
    `}
    ${(props) =>
    props.modificar &&
    css`
      width: 50%;
      height: 35px;
      margin-bottom: 50px;
    `}
`;

export const ContainerBoton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 40px;
  margin-top: 20px;
  ${(props) =>
    props.subir &&
    css`
      height: auto;
      margin-bottom: 10px;
      align-items: center;
      flex-direction: column;
    `}
`;

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
    color: #d6d6d6;
    background: red;
  }
`;

export const ContainerFotos = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  overflow: auto;
  ${(props) =>
    props.admin &&
    css`
      display: inline;
      width: 100%;
      height: auto;
      padding: 10px;
      overflow: auto;
    `}
`;
export const ContainerUsuario = styled.div`
  margin-bottom: 20px; /* Espacio entre grupos de usuarios */
`;
export const TituloUsuario = styled.h3`
  margin: 10px 0;
  font-size: 18px;
  color: #333;
`;
export const FotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 imágenes por fila */
  gap: 10px;
`;
export const ContainerVideo = styled.video`
   width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
`;
export const ContainerFoto = styled.img`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  ${(props) =>
    props.admin &&
    css`
      background-color: red;
      width: 100%;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
    `}
  ${(props) =>
    props.selected &&
    css`
      position: absolute; /* Hacer que la imagen se apile encima de las otras */
      top: 0;
      left: 0;
      width: 99.5%;
      height: 99.5%; /* Hace que ocupe toda la pantalla */
      background-size: contain; /* Ajustar la imagen al tamaño */
      background-repeat: no-repeat;
      z-index: 10; /* Asegura que esta imagen esté por encima */
    `}
`;
export const BotonSubir = styled.input`
  border: 1px solid black;
  margin-bottom: 5px;
`;
