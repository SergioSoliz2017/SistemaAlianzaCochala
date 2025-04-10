import React, { useRef, useState } from "react";
import {
  BotonAñadir,
  BotonCerrar,
  ContainerBoton,
  ContenedorModal,
  DetalleUsuario,
  EncabezadoModal,
  Overlay,
  Titulo,
} from "./DiseñoModalCasaCampaña";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import axios from "axios";
import { url, urlF } from "./VariablesEntorni";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

export default function ModalRedes({ estado, cambiarEstado}) {
  
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [encargado, setEncargado] = useState({ campo: "", valido: null });
  const expresiones = {
    nombre: /^(?=\S)(?!.*\s{2})[a-zA-ZÀ-ÿ\s-]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,8}$/, // 7 a 14 numeros.
    carnet: /^[a-zA-Z0-9-]{6,15}$/,
    fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
    lugar: /^[a-zA-ZÀ-ÿ\s0-9- ]{3,40}$/,
  };
  const borrar = () => {
    setNombre({ campo: "", valido: null });
    setEncargado({ campo: "", valido: null });
    setCelular({ campo: "", valido: null });
    setCorreo({ campo: "", valido: null });
  };
  const generarCodigo = (nombreCompleto) => {
    const partes = nombreCompleto.toLowerCase().split(" ");
    const primerNombre = partes[0]?.slice(0, 3) || "";
    const primerApellido = partes[1]?.slice(0, 3) || "";
    const numeroAleatorio = Math.floor(100 + Math.random() * 900);
    return `${primerNombre}${primerApellido}${numeroAleatorio}`.toUpperCase();
  };
    const [correo,setCorreo] = useState({ campo: "", valido: null })
  
  const guardar = () => {
    var codigo = generarCodigo(nombre.campo);
    axios
      .post(url + "agregarRedes", {
        CODREDES : codigo,
        CONTRASENAREDES: codigo,
        NOMBREREDES: nombre.campo,
        ENCARGADOREDES : encargado.campo,
        CELULARREDES : celular.campo
      })
      .then((response) => {
        var templateParams = {
          nombre: nombre.campo,
          correo: correo.campo,
          id: codigo,
          rol: "ENCARGADO DE REDES",
          sistema: urlF, 
        };
        emailjs
          .send(
            "service_r3b6ai8",
            "template_sqeuwv9",
            templateParams,
            "eD1UxYI2Wm51phRO3"
          )
          .then(
            function (response) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Encargado de redes creado con exito.",
                showConfirmButton: false,
                timer: 1500,
              });
              cambiarEstado(false);
              borrar();
            },
            function (error) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
      })
      .catch((error) => {
        console.error("Error al guardar:", error);
      });
  };
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <Titulo>AÑADIR LOGISTICA</Titulo>
            </EncabezadoModal>
            <BotonCerrar
              onClick={() => {
                cambiarEstado(false);
                borrar();
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </BotonCerrar>
            <DetalleUsuario>
              <Input
                estado={nombre}
                cambiarEstado={setNombre}
                label={"Nombre responsable:"}
                placeholder={"Nombre responsable"}
                name={"Nombre responsable"}
                expresionRegular={expresiones.nombre}
                tipo={"text"}
              />
              <Input
                estado={correo}
                cambiarEstado={setCorreo}
                label={"Correo:"}
                placeholder={"Correo"}
                name={"Correo"}
                expresionRegular={expresiones.correo}
                tipo={"text"}
              />
              <Input
                estado={celular}
                cambiarEstado={setCelular}
                label={"Celular:"}
                placeholder={"Celular"}
                name={"Celular"}
                expresionRegular={expresiones.telefono}
                tipo={"number"}
              />
              <Input
                estado={encargado}
                cambiarEstado={setEncargado}
                label={"Encargado:"}
                placeholder={"Encargado"}
                name={"Encargado"}
                expresionRegular={expresiones.nombre}
                tipo={"text"}
              />
            </DetalleUsuario>
            <ContainerBoton>
              <BotonAñadir onClick={guardar}>Añadir</BotonAñadir>
            </ContainerBoton>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
}
