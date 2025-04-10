import styled from "styled-components";

export const ContainerUsuario = styled.div`
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
`;
export const DetalleUsuario = styled.div`
   width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 100%;
`;
export const ContainerMateriales = styled.div`
   width: 80%;
  position: relative;
  padding: 10px; 
  display: flex;
`
export const ContainerInformacion = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;