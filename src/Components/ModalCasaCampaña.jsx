import React, { useEffect, useRef, useState } from "react";
import {
  BotonAñadir,
  BotonCerrar,
  ContainerBoton,
  ContainerMapa,
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
import { apiKey, url, urlF } from "./VariablesEntorni";
import GoogleMapReact from "google-map-react";
import { BoxCampo, TextBox } from "./DiseñoInput";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

import { EmailJSResponseStatus } from "@emailjs/browser";
export default function ModalCasaCampaña({ estado, cambiarEstado }) {
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [ubicacion, setUbicacion] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [nombreGrupo, setNombreGrupo] = useState({ campo: "", valido: null });
  const [zona, setZona] = useState({ campo: "", valido: null });
  const [distrito, setDistrito] = useState({ campo: "", valido: null });
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
    setUbicacion({ campo: "", valido: null });
    setCelular({ campo: "", valido: null });
    setCorreo({ campo: "", valido: null });
    setDireccion({ campo: "", valido: null });
    setNombreGrupo({ campo: "", valido: null });
    setZona({ campo: "", valido: null });
    setDistrito({ campo: "", valido: null });
  };
  const generarCodigo = (nombreCompleto) => {
    const partes = nombreCompleto.toLowerCase().split(" ");
    const primerNombre = partes[0]?.slice(0, 3) || "";
    const primerApellido = partes[1]?.slice(0, 3) || "";
    const numeroAleatorio = Math.floor(100 + Math.random() * 900);
    return `${primerNombre}${primerApellido}${numeroAleatorio}`.toUpperCase();
  };
  const guardar = () => {
    var codigo = generarCodigo(nombre.campo);
    axios
      .post(url + "agregarCasaCampaña", {
        CODCASACAMPANA: codigo,
        NOMBREENCARGADO: nombre.campo,
        UBICACION: ubicacion.campo,
        DIRECCION: direccion.campo,
        CONTRASENACASA: codigo,
        CELULARCASA: celular.campo,
        CORREOCASA: correo.campo,
        ZONA : zona.campo,
        DISTRITO : distrito.campo,
        NOMBREGRUPO: nombreGrupo.campo,
      })
      .then((response) => {
        var templateParams = {
          nombre: nombre.campo,
          correo: correo.campo,
          id: codigo,
          rol: "CASA DE CAMPAÑA",
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
                title: "Casa de campaña creada con exito.",
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
              cambiarEstado(false);
              borrar();
            }
          );

        //        window.location.href = 'https://api.whatsapp.com/send?phone=59176905990&text=Hola%20este%20es%20tu%20codigo%20y%20tu%20contrase%C3%B1a%20del%20sistema';
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
              <Titulo>AÑADIR CASA CAMPAÑA</Titulo>
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
                estado={celular}
                cambiarEstado={setCelular}
                label={"Celular:"}
                placeholder={"Celular"}
                name={"Celular"}
                expresionRegular={expresiones.telefono}
                tipo={"number"}
              />
              <Input
                estado={correo}
                cambiarEstado={setCorreo}
                label={"Correo:"}
                placeholder={"Correo"}
                name={"Corre"}
                expresionRegular={expresiones.correo}
                tipo={"text"}
              />
              <Input
                estado={direccion}
                cambiarEstado={setDireccion}
                label={"Direccion:"}
                placeholder={"Direccion"}
                name={"Direccion"}
                expresionRegular={expresiones.ubicacion}
                tipo={"text"}
              />
              <Input
                estado={ubicacion}
                cambiarEstado={setUbicacion}
                label={"Ubicacion:"}
                placeholder={"Copiar ubicacion GoogleMaps"}
                name={"Ubicacion"}
                expresionRegular={expresiones.ubicacion}
                tipo={"text"}
              />
              <Input
                estado={zona}
                cambiarEstado={setZona}
                label={"Zona:"}
                placeholder={"Zona"}
                name={"Zona"}
                expresionRegular={expresiones.ubicacion}
                tipo={"text"}
              />
              <Input
                estado={distrito}
                cambiarEstado={setDistrito}
                label={"Distrito:"}
                placeholder={"Distrito"}
                name={"Distrito"}
                expresionRegular={expresiones.ubicacion}
                tipo={"text"}
              />
              <Input
                estado={nombreGrupo}
                cambiarEstado={setNombreGrupo}
                label={"Nombre grupo:"}
                placeholder={"Nombre grupo"}
                name={"Nombre grupo"}
                expresionRegular={expresiones.ubicacion}
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
