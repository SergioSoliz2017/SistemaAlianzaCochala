import React, { useEffect, useRef, useState } from "react";
import {
  BarrasNav,
  BotonNav,
  Celda,
  Container,
  ContainerBotonNav,
  ContainerBuscar,
  ContainerContenido,
  ContainerFilaInforme,
  ContainerFoto,
  ContainerImgIcon,
  ContainerLista,
  ContainerLogoNav,
  Division,
  GlobalStyle,
  IconBuscar,
  ImgIcon,
  InputBuscar,
  LogoNav,
  Navegacion,
  TablaSolicitudes,
  Titulo,
} from "./DiseñoPantallaPrincipal";
import {
  faArrowRightFromBracket,
  faFile,
  faFilePen,
  faFolder,
  faHouse,
  faInfoCircle,
  faPerson,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Input from "./InputSolicitud";

import { useLocation, useNavigate } from "react-router-dom";
import {
  ContainerInformacion,
  ContainerUsuario,
  DetalleUsuario,
} from "./DiseñoPantallaCasaCampaña";
import axios from "axios";
import { url } from "./VariablesEntorni";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ModalInformacionSolicitud from "./ModalInformacionSolicitud";
import { BotonAñadir, ContainerBoton } from "./DiseñoModalCasaCampaña";
import { Carga } from "./DiseñoInicio";

export default function PantallaLogistica() {
  const [extender, setExtender] = useState();
  const [opcion, setOpcion] = useState(0);

  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [logistica, setLogistica] = useState(null);
  const isEffectExecuted = useRef(false);
  const location = useLocation();
  const [modalInformacion, setModalInformacion] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (opcion === 0 && logistica === null && !isEffectExecuted.current) {
      const codLogistica = location.pathname.substring(
        11,
        location.pathname.length
      );
      if (codLogistica !== "") {
        isEffectExecuted.current = true;
        axios.get(`${url}obtenerLogistica/${codLogistica}`).then((response) => {
          setLogistica(response.data);
          document.title= response.data.NOMBRERESPONSABLE
        });
      }
    }
    if (opcion === 1 || opcion === 3) {
      obtenerSolicitudes();
    }
    if (opcion === 2){
      setNombre({ campo: logistica.NOMBRERESPONSABLE, valido: null });
      setCodigo({ campo: logistica.CODLOGISTICA, valido: null });
      setEncargado({ campo: logistica.ENCARGADOLOGISTICA, valido: null });
      setCelular({ campo: logistica.CELULARLOGISTICA, valido: null });
      setContraseña({ campo: logistica.CONTRASENALOGISTICA, valido: null });
    }
  }, [opcion, logistica]);
  const obtenerSolicitudes = () => {
    axios
      .get(url + "obtenerSolicitudesLogistica/" + logistica.CODLOGISTICA)
      .then((response) => {
        setListaSolicitudes(response.data);
        console.table(response.data);
      });
  };
  const [paginaS, setPaginaS] = useState(0);
  const [rowPerPageS, setRowPerPageS] = useState(5);
  const cambiarPaginaS = (event, newpage) => {
    setPaginaS(newpage);
  };
  const cambiarPerPageS = (event) => {
    setRowPerPageS(+event.target.value);
    setPaginaS(0);
  };
  let listaResSolicitud = [];
  const [buscarS, setBuscarS] = useState("");
  if (!buscarS) {
    listaResSolicitud = listaSolicitudes;
  } else {
    listaResSolicitud = listaSolicitudes.filter((item) =>
      item.TIPOEVENTO.toLowerCase().includes(buscarS.toLowerCase())
    );
  }
  const titulos = {
    fontWeight: 1000,
    color: "#000000",
    fontSize: "12px",
  };

  const celdas = {
    fontWeight: 10,
    color: "#000000",
    fontSize: "10px",
  };
  const [informacion, setInformacion] = useState();

  const [nombre, setNombre] = useState({ campo: "pedrito", valido: null });
  const [codigo, setCodigo] = useState({ campo: "pedrito", valido: null });
  const [encargado, setEncargado] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const expresiones = {
    nombre: /^(?=\S)(?!.*\s{2})[a-zA-ZÀ-ÿ\s-]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cantidad: /^\d{0,3}$/, // 7 a 14 numeros.
    telefono: /^\d{7,8}$/, // 7 a 14 numeros.
    carnet: /^[a-zA-Z0-9-]{6,15}$/,
    fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
    lugar: /^[a-zA-ZÀ-ÿ\s0-9- ]{3,40}$/,
    texto: /^(?=\S)(?!.*\s{2})[a-zA-Z0-9-ÿ\s-]{3,200}$/,
  };
  const guardarDatos = () => {
    axios
      .put(url + "modificarLogistica/" + codigo.campo, {
        NOMBRERESPONSABLE: nombre.campo,
        ENCARGADOLOGISTICA: encargado.campo,
        CONTRASENALOGISTICA: contraseña.campo,
        CELULARLOGISTICA: celular.campo,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos guardados correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpcion(0);
        isEffectExecuted.current = false;
        setLogistica(null);
      });
  };
  const [cargando, setCargando] = useState(false);
  const generarPDF = () => {
    setCargando(true);
    axios
      .get(`${url}obtenerPDFLogistica/${logistica.CODLOGISTICA}`, { responseType: "blob" })
      .then((response) => {
        const uri = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        window.open(uri, "_blank");
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al generar el PDF:", error);
        alert("No se pudo generar el PDF. Verifica si hay datos disponibles.");
      });
  };
  const fechaBolivia = new Date();
  fechaBolivia.setHours(fechaBolivia.getHours() - 4); // Ajusta a la hora de Bolivia
  const fechaBoliviaString = fechaBolivia.toISOString().split("T")[0];
  const titulosI = {
    fontWeight: 1000,
    color: "#000000",
    fontSize: "10px",
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <BarrasNav
          extender={extender ? "true" : undefined}
          onClick={() => {
            setExtender(!extender);
          }}
        >
          {extender ? <>&#215;</> : <>&#8801;</>}
        </BarrasNav>
        <Navegacion extender={extender ? "true" : undefined}>
          <ContainerLogoNav>
            <LogoNav
              onClick={() => {
                setOpcion(0);
              }}
              src={require("../Images/Logo.webp")}
            />
          </ContainerLogoNav>
          <ContainerBotonNav>
            <BotonNav
              seleccionado={opcion == 1 ? "true" : "false"}
              onClick={() => {
                setOpcion(1);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faFilePen} />
              Solicitudes
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 2 ? "true" : "false"}
              onClick={() => {
                setOpcion(2);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faFile} />
              Logistica
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 3 ? "true" : "false"}
              onClick={() => {
                setOpcion(3);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faInfoCircle} />
              Informe
            </BotonNav>
            <BotonNav
              onClick={() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Sesión cerrada.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(`/`, { replace: true });              }}
              cerrar="true"
            >
              <ImgIcon icon={faArrowRightFromBracket} />
              Cerrar Sesion
            </BotonNav>
          </ContainerBotonNav>
        </Navegacion>
        <ContainerContenido>
          {opcion === 1 && (
            <ContainerUsuario>
              <DetalleUsuario>
                <Titulo>SOLICITUDES</Titulo>
                <ContainerBuscar>
                  <IconBuscar icon={faSearch} />
                  <InputBuscar
                    placeholder="Buscar solicitud"
                    value={buscarS}
                    onChange={(e) => {
                      setBuscarS(e.target.value);
                    }}
                  />
                </ContainerBuscar>
                <TablaSolicitudes>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={titulos}>Nº</TableCell>
                        <TableCell sx={titulos}>CODIGO</TableCell>
                        <TableCell sx={titulos}>EVENTO</TableCell>
                        <TableCell align="center" sx={titulos}>
                          FECHA PROGRAMADA
                        </TableCell>
                        <TableCell align="center" sx={titulos}>
                          ENCARGADO
                        </TableCell>
                        <TableCell sx={titulos}>INFORMACION</TableCell>
                      </TableRow>
                    </TableHead>
                    {listaResSolicitud
                      .slice(
                        paginaS * rowPerPageS,
                        paginaS * rowPerPageS + rowPerPageS
                      )
                      .map((solicitud, index) => {
                        const rowNumS = paginaS * rowPerPageS + index + 1;
                        return (
                          <TableRow key={solicitud.CODSOLICITUD}>
                            <TableCell sx={celdas}>{rowNumS}</TableCell>
                            <TableCell sx={celdas}>
                              {solicitud.CODSOLICITUD}
                            </TableCell>
                            <TableCell sx={celdas}>
                              {solicitud.TIPOEVENTO}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              {solicitud.FECHAPROGRAMADA}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                            {solicitud.casa_campañas[0]?.NOMBREENCARGADO || solicitud.CasaCampañas[0]?.NOMBREENCARGADO}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              <ContainerImgIcon
                                title="Ver información"
                                onClick={() => {
                                  setModalInformacion(!modalInformacion);
                                  setInformacion(solicitud);
                                }}
                              >
                                <ImgIcon tabla icon={faFolder} />
                              </ContainerImgIcon>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </Table>
                </TablaSolicitudes>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rowsPerPage={rowPerPageS}
                  page={paginaS}
                  count={listaResSolicitud.length}
                  component="div"
                  onPageChange={cambiarPaginaS}
                  onRowsPerPageChange={cambiarPerPageS}
                  labelRowsPerPage="Filas por página:"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count}`
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "55px",
                  }}
                />
              </DetalleUsuario>
              <ModalInformacionSolicitud
                estado={modalInformacion}
                cambiarEstado={setModalInformacion}
                solicitud={informacion}
                codigo={logistica.NOMBRERESPONSABLE}
                logistica={true}
              />
            </ContainerUsuario>
          )}
          {opcion === 2 && (
            <ContainerUsuario>
              <DetalleUsuario>
                <Titulo>INFORMACION CASA CAMPAÑA</Titulo>
                <ContainerInformacion>
                  <Input
                    estado={codigo}
                    cambiarEstado={setCodigo}
                    label={"Codigo de logistica:"}
                    placeholder={"Codigo de logistica"}
                    name={"Codigo de logistica"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                  />
                  <Input
                    estado={encargado}
                    cambiarEstado={setEncargado}
                    label={"Encargado:"}
                    placeholder={"Encargado"}
                    name={"Encargado"}
                    expresionRegular={expresiones.lugar}
                    tipo={"text"}
                  />
                  <Input
                    estado={nombre}
                    cambiarEstado={setNombre}
                    label={"Nombre responsable:"}
                    placeholder={"Nombre responsable"}
                    name={"Nombre responsable"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                  />

                  <Input
                    estado={celular}
                    cambiarEstado={setCelular}
                    label={"Celular:"}
                    placeholder={"Celular"}
                    name={"Celular"}
                    expresionRegular={expresiones.telefono}
                    tipo={"text"}
                    editable={true}
                  />
                  <Input
                    estado={contraseña}
                    cambiarEstado={setContraseña}
                    label={"Contraseña:"}
                    placeholder={"Celular"}
                    name={"Celular"}
                    expresionRegular={expresiones.carnet}
                    tipo={"text"}
                    editable={true}
                  />
                  <ContainerBoton>
                    <BotonAñadir modificar onClick={guardarDatos}>
                      Guardar cambios
                    </BotonAñadir>
                  </ContainerBoton>
                </ContainerInformacion>
              </DetalleUsuario>
            </ContainerUsuario>
          )}
           {opcion === 3 && (
            <>
              <ContainerLista>
                <Titulo>INFORME</Titulo>
                <TablaSolicitudes informe>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Nombre:</Division>
                    <Division>{logistica.NOMBRERESPONSABLE}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Codigo:</Division>
                    <Division>{logistica.CODLOGISTICA}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Cargo:</Division>
                    <Division>Logistica</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Celular:</Division>
                    <Division>{logistica.CELULARLOGISTICA}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Fecha:</Division>
                    <Division>{fechaBoliviaString}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme>
                    <Division negrilla>Solicitudes:</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={titulosI}>
                            Nº
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            CÓDIGO DE SOLICITUD
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            CASA DE CAMPAÑA
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            NOMBRE ENCARGADO 
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            EVENTO
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            DESCRIPCIÓN
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            FECHA SOLICITADA
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            FECHA PROGRAMADA
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            FECHA APROBADA
                          </TableCell>
                          <TableCell sx={titulosI}>HORA</TableCell>
                          <TableCell align="center" sx={titulosI}>
                            ADMINISTRADOR ENCARGADO
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            ESTADO
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listaSolicitudes.map((solicitud, index) => {
                          return (
                            <TableRow key={solicitud.CODSOLICITUD}>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.CODSOLICITUD}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.casa_campañas[0]?.CODCASACAMPANA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {solicitud.casa_campañas[0]?.NOMBREENCARGADO || solicitud.CasaCampañas[0]?.NOMBREENCARGADO}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {solicitud.TIPOEVENTO}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {solicitud.DESCRIPCION}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.FECHASOLICITADA}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.FECHAPROGRAMADA}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.FECHAAPROBADA}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.HORAEVENTO?.slice(0, 5)}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.NOMBREADMINISTRADOR}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.ESTADO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.OBSERVACIONES}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ContainerFilaInforme>
                  <Division negrilla>Material solicitado / entregado:</Division>
                  <ContainerFilaInforme>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={titulosI}>
                            Nº
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            CÓDIGO DE SOLICITUD
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            MATERIAL
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listaSolicitudes.map((solicitud, index) => {
                          return (
                            <TableRow key={solicitud.CODSOLICITUD}>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.CODSOLICITUD}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.materiales.map((material) => {
                                  return (
                                    <Celda>
                                      {material.CANTIDADPEDIDA +
                                        " " +
                                        material.MATERIALPEDIDO}
                                    </Celda>
                                  );
                                })}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ContainerFilaInforme>
                  <Division negrilla>Imagenes:</Division>
                  <ContainerFilaInforme>
                    {listaSolicitudes.map((solicitud, index) => (
                      <div key={index}>
                        <Division negrilla>
                          Solicitud:{" "}
                          {solicitud.CODSOLICITUD +
                            " - " +
                            solicitud.TIPOEVENTO.toUpperCase()}
                        </Division>
                        {solicitud.imagenes && solicitud.imagenes.length > 0 ? (
                          solicitud.imagenes.map((url, imgIndex) => (
                              <ContainerFoto
                                key={`${index}-${imgIndex}`}
                                src={url}
                                alt={`Imagen de ${solicitud.casa_campañas[0].NOMBREENCARGADO}`}
                              />
                          ))
                        ) : (
                          <p>No hay imágenes disponibles</p>
                        )}
                      </div>
                    ))}
                  </ContainerFilaInforme>
                </TablaSolicitudes>
                <ContainerBoton>
                  <BotonAñadir disabled={cargando} onClick={generarPDF}>
                    {cargando ? (
                      <Carga src={require("../Images/Carga.gif")} />
                    ) : (
                      "Generar PDF"
                    )}
                  </BotonAñadir>
                </ContainerBoton>
              </ContainerLista>
            </>
          )}
        </ContainerContenido>
      </Container>
    </>
  );
}
