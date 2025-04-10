import styled, { createGlobalStyle, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #6603b2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%239203bd' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%23c302c8' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%23d302ad' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%23de0289' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%23e90160' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%23f50133' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23FF0101' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
`;
export const Container = styled.div`
  width: 100%;
  height: 97vh;
`;
export const Navegacion = styled.div`
  width: 16%;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  box-sizing: border-box;
  margin: 0;
  @media (max-width: 550px) {
    display: none;
    width: 0px;
    ${(props) =>
      props.extender === "true" &&
      css`
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 49.9%;
        z-index: 99;
        height: 100vh;
      `}
  }
`;
export const BarrasNav = styled.button`
  width: 70px;
  height: 50px;
  border: none;
  background: none;
  color: black;
  font-size: 45px;
  cursor: pointer;
  position: absolute;
  left: 10px;
  z-index: 100;
  ${(props) =>
    props.extender &&
    css`
      left: 37%;
      z-index: 100;
    `}
  @media (min-width: 550px) {
    display: none;
  }
`;
export const ContainerLogoNav = styled.div`
  width: 100%;
  height: 15%;
  justify-content: center;
  display: flex;
  margin-bottom: 20px;
`;
export const LogoNav = styled.img`
  width: 80%;
  margin-top: 20px;
  height: 75%;
  cursor: pointer;
`;

export const ContainerBotonNav = styled.div`
  width: 100%;
  height: 74.7vh;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const BotonNav = styled.button`
  width: 80%;
  margin-left: 20px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  text-align: start;
  background: transparent;
  cursor: pointer;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 20px;
  ${(props) =>
    props.seleccionado === "true" &&
    css`
      background: #6603b2;
      border: 1px solid black;
      color: white;
    `}
  ${(props) =>
    props.cerrar === "true" &&
    css`
      position: absolute;
      bottom: -30px;
    `}
`;
export const ImgIcon = styled(FontAwesomeIcon)`
  color: black;
  margin-right: 15px;
  margin-left: 10px;
  ${(props) =>
    props.tabla &&
    css`
      margin-right: 0px;
      margin-left: 0px;
      transform: scale(2);
      transition: all 0.3s ease;
    `}
`;
export const ContainerContenido = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ContainerLista = styled.div`
  background-color: white;
  border-radius: 15px;
  height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  width: 60%;
  z-index: 0;
  margin-top: 35px;
  margin-bottom: 20px;
  padding: 20px;
  @media (max-width: 550px) {
    width: 100%;
    margin-left: 0%;
  }
  ${(props) =>
    props.informe &&
    css`
      align-items: center;
    `};
    ${(props) =>
    props.completo &&
    css`
    background-color: orange;
  `};
  ${(props) =>
    props.solicitud &&
    css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      justify-content: center;
      align-items: center;
      z-index: 1;
    `};
`;
export const TablaSolicitudes = styled.div`
  width: 100%;
  height: 70%;
  overflow: auto;
  ${(props) =>
    props.informe &&
    css`
      height: 100%;
    `};
`;

export const ContainerBuscar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 25px;
  margin-bottom: 15px;
  position: relative;
`;
export const InputBuscar = styled.input`
  width: 55%;
  height: 40px;
  border: 1px solid black;
  border-radius: 15px;
  padding-left: 10px;
`;
export const IconBuscar = styled(FontAwesomeIcon)`
  color: black;
  margin-top: 15px;
  margin-right: 25px;
  margin-left: 25px;
  ${(props) =>
    props.añadir &&
    css`
      position: absolute;
      right: -5px;
      margin-top: 5px;
      border-radius: 50%;
      padding: 10px;
      border: 1px solid black;
      transition: all 0.3s ease;
      &:hover {
        border: 2px solid black;
        outline: none;
        background-color: black;
        color: white;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
      }
    `}
  ${(props) =>
    props.añadirMaterial &&
    css`
      position: absolute;
      right: -5px;
      margin-top: 35px;
      border-radius: 50%;
      padding: 10px;
      border: 1px solid black;
      transition: all 0.3s ease;
      &:hover {
        border: 2px solid black;
        outline: none;
        background-color: black;
        color: white;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
      }
    `}
`;
export const Titulo = styled.span`
  font-size: 20px;
  font-weight: 1000;
  position: relative;
  color: black;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 22px;
  }
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
    background: #d6d6d6;
  }
`;

export const LetraInformacion = styled.span`
  width: 100%;
  font-size: 18px;
  font-weight: 1000;
  font-family: bold;
`;
export const Letra = styled.span`
  font-weight: 10;
  margin-right: 10px;
  font-size: 15px;
`;
export const Seccion = styled.div`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.completo &&
    css`
      align-items: center;
      width: 100%;
    `};
`;
export const ContainerLetra = styled.div`
  width: 100%;
`;

export const ContainerFilaInforme = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.letra &&
    css`
      flex-direction: row;
    `};
`;
export const Division = styled.div`
  margin-left: 3px;
  margin-top: 10px;
  ${(props) =>
    props.negrilla &&
    css`
      font-weight: 1000;
    `};
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
export const TituloUsuario = styled.h3`
  margin: 10px 0;
  font-size: 15px;
`;
export const ContainerFoto = styled.img`
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 20px;
`;
export const ContainerVideo = styled.video`
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 20px;
`;
export const ContainerImagenes = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
`;
export const Celda = styled.div`
  display: flex;
  flex-direction: column;
`;
