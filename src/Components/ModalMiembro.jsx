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
import { url } from "./VariablesEntorni";
import Swal from "sweetalert2";
export default function ModalMiembro({ estado, cambiarEstado, casa }) {
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [cargo, setCargo] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
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
    setCargo({ campo: "", valido: null });
    setCelular({ campo: "", valido: null });
    setCorreo({ campo: "", valido: null });
  };

  const guardar = () => {
    axios
      .post(url + "agregarMiembro", {
        CELULARMIEMBRO: celular.campo,
        NOMBREMIEMBRO: nombre.campo,
        CORREOMIEMBRO: correo.campo,
        CARGO: cargo.campo,
        CODCASACAMPANA: casa,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Miembro agregado con exito con exito.",
          showConfirmButton: false,
          timer: 1500,
        });
        cambiarEstado(false);
        borrar();
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
              <Titulo>AÑADIR MIEMBRO</Titulo>
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
                label={"Nombre miembro:"}
                placeholder={"Nombre miembro"}
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
                name={"Encargado"}
                expresionRegular={expresiones.correo}
                tipo={"text"}
              />
              <Input
                estado={cargo}
                cambiarEstado={setCargo}
                label={"Cargo:"}
                placeholder={"Cargo"}
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
