import React, { useState } from "react";
import {
  BotonInicio,
  Carga,
  Container,
  ContainerCampos,
  ContainerInicio,
  ContainerLogo,
  GlobalStyle,
  ImagenLogo,
  Input,
} from "./DiseñoInicio";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "./VariablesEntorni";
import Swal from "sweetalert2";

export default function Inicio() {
  const [codigo, setCodigo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [carga, setCarga] = useState(false);
  const navigate = useNavigate();
  document.title = "Sistema Alianza Cochala"
  function ingresar() {
    setCarga(true);
    if (valido()) {
      setCarga(false);
      axios
        .get(url + "iniciarSesion", {
          params: {
            CODIGO: codigo,
            CONTRASEÑA: contrasena,
          },
        })
        .then((response) => {
          if (response.data === "Administrador") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Inicio correcto.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`/home/${codigo}`);
          } else {
            if (response.data === "CasaCampaña") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Inicio correcto.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(`/casaCampaña/${codigo}`);
            } else {
              if (response.data === "Logistica") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Inicio correcto.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(`/logistica/${codigo}`);
              } else {
                if (response.data === "Redes") {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio correcto.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate(`/redes/${codigo}`);
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.data,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
            }
          }
        });
    } else {
      setCarga(false);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Ingresar datos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function valido() {
    var valido = true;
    if (codigo === "") {
      valido = false;
    }
    if (contrasena === "") {
      valido = false;
    }
    return valido;
  }
  return (
    <>
      <GlobalStyle />
      <Container>
        <ContainerInicio>
          <ContainerLogo>
            <ImagenLogo src={require("../Images/Logo.webp")} />
          </ContainerLogo>
          <ContainerCampos>
            <Input
              placeholder="Codigo"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="Contraseña"
              value={contrasena}
              type="password"
              onChange={(e) => {
                setContrasena(e.target.value);
              }}
            ></Input>
            <BotonInicio disabled={carga} onClick={ingresar}>
              {carga ? (
                <Carga src={require("../Images/Carga.gif")} />
              ) : (
                <>Iniciar sesión</>
              )}
            </BotonInicio>
          </ContainerCampos>
        </ContainerInicio>
      </Container>
    </>
  );
}
