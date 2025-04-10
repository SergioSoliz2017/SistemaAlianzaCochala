import React, { useState } from "react";
import {
  BoxCampo,
  IconoValidacion,
  InputBox,
  InputOpcion,
  Select,
  TextAreaBox,
  TextBox,
} from "./DiseñoInputSolicitud";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function InputSolicitud({
  estado,
  cambiarEstado,
  tipo,
  label,
  placeholder,
  name,
  expresionRegular,
  editable,
  boxText,
  select,
  listaMateriales,
  logistica,
  redes,
  manual,
  setManual,
  casa,
  completo,
  admin,
  directiva,
}) {
  const validacion = () => {
    if (tipo !== "date") {
      if (!logistica && !redes && !casa && !admin) {
        if (expresionRegular && estado.campo != "") {
          if (expresionRegular.test(estado.campo)) {
            cambiarEstado({ ...estado, valido: "true" });
          } else {
            cambiarEstado({ ...estado, valido: "false" });
          }
        } else {
          if (estado.campo === "") {
            cambiarEstado({ ...estado, valido: null });
          }
        }
      } else {
        cambiarEstado({ ...estado, valido: true });
      }
    } else {
      if (estado.campo !== "") {
        const fechaIngresada = new Date(estado.campo); // Convertir la fecha ingresada a un objeto Date
        const fechaHoy = new Date(); // Obtener la fecha actual
        // Establecer solo la fecha (sin horas) para evitar problemas de comparación por tiempo
        fechaHoy.setHours(0, 0, 0, 0);
        if (fechaIngresada >= fechaHoy) {
          cambiarEstado({ ...estado, valido: "true" });
        } else {
          cambiarEstado({ ...estado, valido: "false" });
        }
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }
  };
  return (
    <BoxCampo completo={completo} tipo={tipo} select={select}>
      <TextBox>{label}</TextBox>
      {!boxText && !select && (
        <>
          <InputBox
            type={tipo}
            placeholder={placeholder}
            id={name}
            value={estado.campo}
            onChange={(e) => {
              cambiarEstado({ ...estado, campo: e.target.value });
            }}
            onKeyUp={validacion}
            onBlur={validacion}
            valido={estado.valido}
            disabled={!editable}
          />
          <IconoValidacion
            icon={estado.valido === "true" ? faCircleCheck : faCircleXmark}
            valido={estado.valido}
          />
        </>
      )}
      {boxText && (
        <TextAreaBox
          type={tipo}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={(e) => {
            cambiarEstado({ ...estado, campo: e.target.value });
          }}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
          disabled={!editable}
        />
      )}
      {select && (
        <>
          <Select
            id={name}
            value={estado.campo}
            valido={estado.valido}
            onChange={(e) => {
              if (e.target.value !== "Otro") {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const textoSeleccionado = selectedOption.text;
                console.log(selectedOption)
                cambiarEstado({
                  ...estado,
                  campo: e.target.value,
                  texto: textoSeleccionado,
                });
                if (!logistica && !redes && !casa && !admin && !directiva) {
                  setManual(false);
                }
              } else {
                setManual(true);
              }
            }}
            onKeyUp={validacion}
            onBlur={validacion}
          >
            <option value="">Seleccionar opcion</option>
            {admin &&
              !logistica &&
              !redes &&
              !casa &&
              !directiva &&
              listaMateriales.map((material) => {
                return (
                  <option value={material.CODCASACAMPANA}>
                    {material.NOMBREENCARGADO}
                  </option>
                );
              })}
            {directiva && (
              <>
                <option value={"Responsable logistica"}>
                  {listaMateriales.NOMBRERESPONSABLELOGITICA}
                </option>
                <option value={"Responsable hacienda"}>
                  {listaMateriales.NOMBRERESPONSABLEHACIENDA}
                </option>
                <option value={"Responsable actas"}>
                  {listaMateriales.NOMBRERESPONSABLEACTAS}
                </option>
                <option value={"Responsable redes"}>
                  {listaMateriales.NOMBRERESPONSABLEREDES}
                </option>
                <option value={"Responsable juventud"}>
                  {listaMateriales.NOMBRERESPONSABLEJUVENTUD}
                </option>
              </>
            )}
            {logistica &&
            !directiva &&
              listaMateriales.map((material) => {
                return (
                  <option value={material.CODLOGISTICA}>
                    {material.NOMBRERESPONSABLE}
                  </option>
                );
              })}
            {redes &&
              !logistica && !directiva &&
              listaMateriales.map((material) => {
                return (
                  <option value={material.CODREDES}>
                    {material.NOMBREREDES}
                  </option>
                );
              })}
            {!logistica &&
              !redes &&
              !casa &&
              !admin &&
              !directiva &&
              listaMateriales.map((material) => {
                return <option value={material}>{material}</option>;
              })}
            {casa &&
              !redes &&
              !logistica &&
              !directiva &&
              listaMateriales.map((material) => {
                return (
                  <option value={material.NOMBREMIEMBRO}>
                    {material.NOMBREMIEMBRO}
                  </option>
                );
              })}
          </Select>
          {manual && (
            <InputOpcion
              type="text"
              placeholder="Escribe tu opción"
              value={estado.campo}
              onChange={(e) => {
                cambiarEstado({
                  ...estado,
                  campo: e.target.value,
                  texto: e.target.value,
                });
              }}
              onBlur={validacion}
            />
          )}
        </>
      )}
    </BoxCampo>
  );
}
