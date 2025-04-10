import styled, { createGlobalStyle } from "styled-components";

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerInicio = styled.div`
  width: 80%;
  height: 60%;
  background-color: white;
  border-radius: 5%;
  @media (min-width: 550px) {
    width: 60%;
  }
  @media (min-width: 700px) {
    width: 30%;

  }
`;
export const ContainerLogo = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  @media (min-width: 450px) {
    height: 30%;

  }
  @media (min-width: 700px) {
    height: 40%;

  }
`;
export const ImagenLogo = styled.img`
  height: 100%;
  
`;
export const ContainerCampos = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Input = styled.input`
  margin-top: 30px;
  width: 60%;
  height: 10%;
  border: 1px solid black;
  border-radius: 15px;
  outline: none;
  padding-right: 10px;
  padding-left: 10px;
  &:focus {
    border: 2px solid black;
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;
export const BotonInicio = styled.button`
  margin-top: 30px;
  width: 40%;
  height: 10%;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  &:focus {
    border: 2px solid black;
    outline: none;
    background-color: black;
    color: white;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;
export const Carga = styled.img `
  height: 100%;
`
