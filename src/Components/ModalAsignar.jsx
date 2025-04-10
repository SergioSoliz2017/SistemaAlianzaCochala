import React, { useEffect, useRef, useState } from "react";
import {
  BotonAñadir,
  BotonCerrar,
  ContainerBoton,
  ContenedorModal,
  DetalleUsuario,
  EncabezadoModal,
  Overlay,
  Titulo,
} from "./DiseñoModalInformacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  ContainerLetra,
  Letra,
  LetraInformacion,
  Seccion,
} from "./DiseñoPantallaPrincipal";
import InputSolicitud from "./InputSolicitud";
import axios from "axios";
import { url } from "./VariablesEntorni";
import Swal from "sweetalert2";
export default function ModalAsignar({
  estado,
  cambiarEstado,
  solicitud,
  actualizar,
  listaLogistica,
  listaRedes,
  admin,
  nombreAdmin
}) {
  const [logistica, setLogistica] = useState({ campo: "", valido: null });
  const [redes, setRedes] = useState({ campo: "", valido: null });
  const asignarTarea = () => {
    const fechaBolivia = new Date();
    fechaBolivia.setHours(fechaBolivia.getHours() - 4); // Ajusta a la hora de Bolivia
    const fechaBoliviaString = fechaBolivia.toISOString().split("T")[0];
    axios
      .post(url + "asignarTarea", {
        FECHAAPROBADA:fechaBoliviaString,
        CODSOLICITUD: solicitud.CODSOLICITUD,
        CODREDES: redes.campo,
        CODLOGISTICA: logistica.campo,
        FECHATAREA:solicitud.FECHAPROGRAMADA,
        DESTINO:solicitud.casa_campañas[0]?.DIRECCION,
        RESPONSABLE:solicitud.casa_campañas[0]?.NOMBREENCARGADO,
        MATERIALES: solicitud.materiales,
        ADMIN:admin
      })
      .then((response) => {
        console.log(response.data)
        setLogistica({ campo: "", valido: null });
        setRedes({ campo: "", valido: null });
        cambiarEstado(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Asignacion exitosa con exito.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal asignar>
            <EncabezadoModal>
              <Titulo>ASIGNACIÓN DE SOLICITUD</Titulo>
            </EncabezadoModal>
            <BotonCerrar
              onClick={() => {
                cambiarEstado(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </BotonCerrar>
            <DetalleUsuario asignar>
              <InputSolicitud
                estado={logistica}
                cambiarEstado={setLogistica}
                label={"Encargado logistica:"}
                placeholder={"Encargado Logistica"}
                name={"Encargado Logistica"}
                expresionRegular={[]}
                tipo={"select"}
                editable={true}
                select={true}
                listaMateriales={listaLogistica}
                logistica={true}
              />
              <InputSolicitud
                estado={redes}
                cambiarEstado={setRedes}
                label={"Encargado redes:"}
                placeholder={"Encargado redes"}
                name={"Encargado redes"}
                expresionRegular={[]}
                tipo={"select"}
                editable={true}
                select={true}
                listaMateriales={listaRedes}
                redes={true}
              />
            </DetalleUsuario>
            <ContainerBoton>
              <BotonAñadir asignar onClick={asignarTarea}>Asignar tarea</BotonAñadir>
            </ContainerBoton>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
}
