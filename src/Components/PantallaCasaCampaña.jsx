import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  ContainerLista,
  ContainerLogoNav,
  ContainerVideo,
  Division,
  GlobalStyle,
  IconBuscar,
  ImgIcon,
  InputBuscar,
  LogoNav,
  Navegacion,
  TablaSolicitudes,
  Titulo,
  TituloUsuario,
} from "./DiseñoPantallaPrincipal";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  faAdd,
  faArrowRightFromBracket,
  faFile,
  faFilePen,
  faFolder,
  faHomeUser,
  faHouse,
  faInfoCircle,
  faPerson,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./InputSolicitud";
import {
  ContainerInformacion,
  ContainerMateriales,
  ContainerUsuario,
  DetalleUsuario,
} from "./DiseñoPantallaCasaCampaña";
import axios from "axios";
import { url } from "./VariablesEntorni";
import {
  BotonAñadir,
  ContainerBoton,
  ContainerImgIcon,
  ContainerListaMateriales,
  ImgIconEliminar,
} from "./DiseñoModalCasaCampaña";
import { TextBox } from "./DiseñoInputSolicitud";
import ModalInformacionSolicitud from "./ModalInformacionSolicitud";
import Swal from "sweetalert2";
import ModalMiembro from "./ModalMiembro";
import { Carga } from "./DiseñoInicio";
export default function PantallaCasaCampaña() {
  const [extender, setExtender] = useState(false);
  const [opcion, setOpcion] = useState(0);
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [nombreLogistica, setNombreLogistica] = useState({
    campo: "",
    valido: null,
  });
  const [nombreRedes, setNombreRedes] = useState({ campo: "", valido: null });
  const [nombreHacienda, setNombreHacienda] = useState({
    campo: "",
    valido: null,
  });
  const [nombreActas, setNombreActas] = useState({ campo: "", valido: null });
  const [nombreJuventud, setNombreJuventud] = useState({
    campo: "",
    valido: null,
  });
  const [codigo, setCodigo] = useState({ campo: "pedrito", valido: null });
  const [ubicacion, setUbicacion] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const expresiones = {
    nombre: /^(?=\S)(?!.*\s{2})[a-zA-ZÀ-ÿ\s-]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cantidad: /^\d{0,3}$/, // 7 a 14 numeros.
    telefono: /^\d{7,8}$/, // 7 a 14 numeros.
    carnet: /^[a-zA-Z0-9-]{6,15}$/,
    fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
    lugar: /^[a-zA-ZÀ-ÿ\s0-9- ]{3,40}$/,
    texto: /^(?=\S)(?!.*\s{2})[a-zA-Z0-9-ÿ\s-]{3,200}$/,
    hora: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  };
  const [casaUsuario, setCasaUsuario] = useState(null);

  const location = useLocation();
  const isEffectExecuted = useRef(false);
  const [modalMiembro, setModalMiembro] = useState(false);
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    if (opcion === 0 && casaUsuario === null && !isEffectExecuted.current) {
      const codCasa = location.pathname.substring(18, location.pathname.length);
      if (codCasa !== "") {
        isEffectExecuted.current = true;
        axios.get(`${url}obtenerCasaCampaña/${codCasa}`).then((response) => {
          setCasaUsuario(response.data);
          console.log(response.data);
          document.title = response.data.NOMBREENCARGADO;
        });
      }
    }
    if (opcion === 1) {
      setNombre({ campo: casaUsuario.NOMBREENCARGADO, valido: null });
      setDireccion({ campo: casaUsuario.DIRECCION, valido: null });
      setCelular({ campo: casaUsuario.CELULARCASA, valido: null });
    }
    if (opcion === 2) {
      obtenerSolicitudes();
      obtenerMiembros();
      obtenerMiembrosOtra();
    }
    if (opcion === 3) {
      setNombre({ campo: casaUsuario.NOMBREENCARGADO, valido: null });
      setCodigo({ campo: casaUsuario.CODCASACAMPANA, valido: null });
      setCorreo({ campo: casaUsuario.CORREOCASA, valido: null });
      setDireccion({ campo: casaUsuario.DIRECCION, valido: null });
      setCelular({ campo: casaUsuario.CELULARCASA, valido: null });
      setContraseña({ campo: casaUsuario.CONTRASENACASA, valido: null });
    }
    if (opcion === 4) {
      setNombre({ campo: casaUsuario.NOMBREENCARGADO, valido: null });
      if (casaUsuario.directiva !== null) {
        setNombreLogistica({
          campo: casaUsuario.directiva.NOMBRERESPONSABLELOGITICA,
          valido: null,
        });
        setNombreRedes({
          campo: casaUsuario.directiva.NOMBRERESPONSABLEREDES,
          valido: null,
        });
        setNombreActas({
          campo: casaUsuario.directiva.NOMBRERESPONSABLEACTAS,
          valido: null,
        });
        setNombreHacienda({
          campo: casaUsuario.directiva.NOMBRERESPONSABLEHACIENDA,
          valido: null,
        });
        setNombreJuventud({
          campo: casaUsuario.directiva.NOMBRERESPONSABLEJUVENTUD,
          valido: null,
        });
      }
    }
    if (opcion === 5) {
      obtenerMiembros();
    }
    if (opcion == 6) {
      obtenerSolicitudes();
    }
  }, [opcion, casaUsuario, modalMiembro]);

  const [tipoEvento, setTipoEvento] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [fechaEvento, setFechaEvento] = useState({ campo: "", valido: null });
  const [material, setMaterial] = useState({ campo: "", valido: null });
  const [horaEvento, setHoraEvento] = useState({ campo: "", valido: null });
  const [cantidadMaterial, setCantidadMaterial] = useState({
    campo: "",
    valido: null,
  });
  const [ubicacionEvento, setUbicacionEvento] = useState({
    campo: "",
    valido: null,
  });

  const materialInicial = [
    "Sillas",
    "Mesas",
    "Sombrillas",
    "Banderas",
    "Lapiceros",
    "Otro",
  ];
  const [manual, setManual] = useState(false);

  const [listaMateriales, setListaMateriales] = useState(materialInicial);
  const [materialesAñadidos, setMaterialesAñadidos] = useState([]);
  const agregarMaterial = () => {
    if (material.campo !== "" && cantidadMaterial.campo !== "") {
      const nuevaLista = listaMateriales.filter(
        (item) => item !== material.campo
      );
      setListaMateriales(nuevaLista);
      setMaterialesAñadidos((prev) => [
        ...prev,
        {
          nombre: material.texto,
          cantidad: parseInt(cantidadMaterial.campo, 10),
        },
      ]);
      setMaterial({ campo: "", texto: "" });
      setCantidadMaterial({ campo: "", valido: null });
      setManual(false);
    } else {
      alert("Selecciona un material y agrega una cantidad válida.");
    }
  };
  const eliminarMaterial = (nombreMaterial) => {
    const nuevosMaterialesAñadidos = materialesAñadidos.filter(
      (material) => material.nombre !== nombreMaterial
    );
    setMaterialesAñadidos(nuevosMaterialesAñadidos);

    setListaMateriales((prev) => [...prev, nombreMaterial]);
  };

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
  function generarCodigo() {
    var codigo = "";
    var año = new Date().getFullYear();
    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const numeroAleatorio = Math.floor(100 + Math.random() * 900);
    const partes = tipoEvento.campo.toLowerCase().split(" ");
    codigo =
      año +
        "" +
        mes +
        "" +
        dia +
        "" +
        partes[0]?.slice(0, 3) +
        numeroAleatorio || "";
    return codigo.toUpperCase();
  }
  const borrarDatos = () => {
    setTipoEvento({ campo: "", valido: null });
    setDescripcion({ campo: "", valido: null });
    setFechaEvento({ campo: "", valido: null });
    setHoraEvento({ campo: "", valido: null });
    setListaMateriales(materialInicial);
    setMaterialesAñadidos([]);
    setUbicacionEvento({ campo: "", valido: null });
  };
  const titulosI = {
    fontWeight: 1000,
    color: "#000000",
    fontSize: "10px",
  };
  const filaVerde = {
    backgroundColor: "#98FB98",
  };

  const filaRoja = {
    backgroundColor: "#ff6f6f", // Color para "Rechazado"
  };

  const filaNormal = {
    backgroundColor: "transparent", // Sin color para "Pendiente"
  };
  const enviarSolicitud = () => {
    const fechaBolivia = new Date();
    fechaBolivia.setHours(fechaBolivia.getHours() - 4); // Ajusta a la hora de Bolivia
    const fechaBoliviaString = fechaBolivia.toISOString().split("T")[0];
    axios
      .post(url + "crearSolicitud", {
        CODCASACAMPANA: casaUsuario.CODCASACAMPANA,
        CODSOLICITUD: generarCodigo(),
        DESCRIPCION: descripcion.campo,
        FECHASOLICITADA: fechaBoliviaString,
        FECHAPROGRAMADA: fechaEvento.campo,
        TIPOEVENTO: tipoEvento.campo,
        MATERIALES: materialesAñadidos,
        ESTADO: "Pendiente",
        HORAEVENTO: horaEvento.campo,
        UBICACIONEVENTO: ubicacionEvento.campo,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Solicitud creada con exito.",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpcion(0);
        borrarDatos();
      });
  };
  //Buscar---------------------------------------
  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const obtenerSolicitudes = () => {
    axios
      .get(url + "obtenerSolicitudes/" + casaUsuario.CODCASACAMPANA)
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
  //-----------------------------------------------------------------
  //MIEMBROS------------------------------------
  const [listaMiembros, setListaMiembros] = useState([]);
  const [listaMiembrosOtra, setListaMiembrosOtra] = useState([]);

  const obtenerMiembros = () => {
    axios
      .get(url + "obtenerMiembros/" + casaUsuario.CODCASACAMPANA)
      .then((response) => {
        setListaMiembros(response.data);
        console.table(response.data);
      });
  };
  const obtenerMiembrosOtra = () => {
    axios
      .get(url + "obtenerMiembrosOtra/" + casaUsuario.CODCASACAMPANA)
      .then((response) => {
        setListaMiembrosOtra(response.data);
        console.table(response.data);
      });
  };
  const [paginaM, setPaginaM] = useState(0);
  const [rowPerPageM, setRowPerPageM] = useState(5);
  const cambiarPaginaM = (event, newpage) => {
    setPaginaM(newpage);
  };
  const cambiarPerPageM = (event) => {
    setRowPerPageM(+event.target.value);
    setPaginaM(0);
  };
  let listaResMiembros = [];
  const [buscarM, setBuscarM] = useState("");
  if (!buscarM) {
    listaResMiembros = listaMiembros;
  } else {
    listaResMiembros = listaMiembros.filter((item) =>
      item.NOMBREMIEMBRO.toLowerCase().includes(buscarM.toLowerCase())
    );
  }
  //-------------------------------------------
  const guardarDatos = () => {
    axios
      .put(url + "modificarCasaCampaña/" + codigo.campo, {
        NOMBREENCARGADO: nombre.campo,
        UBICACION: ubicacion.campo,
        DIRECCION: direccion.campo,
        CONTRASENACASA: contraseña.campo,
        CELULARCASA: celular.campo,
        CORREOCASA: correo.campo,
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
        setCasaUsuario(null);
      });
  };
  const guardarDatosDirectiva = () => {
    axios
      .put(
        url + "modificarDirectivaCasaCampaña/" + casaUsuario.CODCASACAMPANA,
        {
          NOMBREENCARGADO: nombre.campo,
          NOMBRERESPONSABLELOGITICA: nombreLogistica.campo,
          NOMBRERESPONSABLEHACIENDA: nombreHacienda.campo,
          NOMBRERESPONSABLEACTAS: nombreActas.campo,
          NOMBRERESPONSABLEREDES: nombreRedes.campo,
          NOMBRERESPONSABLEJUVENTUD: nombreJuventud.campo,
        }
      )
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
        setCasaUsuario(null);
      });
  };
  const [informacion, setInformacion] = useState([]);
  const [modalInformacionSolicitud, setInformacionSolicitud] = useState(false);
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const generarPDF = () => {
    setCargando(true);
    axios
      .get(`${url}obtenerPDFCasa/${casaUsuario.CODCASACAMPANA}`, {
        responseType: "blob",
      })
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
              Crear solicitud
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 2 ? "true" : "false"}
              onClick={() => {
                setOpcion(2);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faFile} />
              Solicitudes
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 3 ? "true" : "false"}
              onClick={() => {
                setOpcion(3);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faHouse} />
              Casa campaña
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 4 ? "true" : "false"}
              onClick={() => {
                setOpcion(4);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faHomeUser} />
              Directiva
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 5 ? "true" : "false"}
              onClick={() => {
                setOpcion(5);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faPerson} />
              Miembros
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 6 ? "true" : "false"}
              onClick={() => {
                setOpcion(6);
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
                navigate(`/`, { replace: true });
              }}
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
                <Titulo>CREAR SOLICITUD</Titulo>
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
                  estado={direccion}
                  cambiarEstado={setDireccion}
                  label={"Direccion:"}
                  placeholder={"Direccion"}
                  name={"Direccion"}
                  expresionRegular={expresiones.lugar}
                  tipo={"text"}
                />
                <Input
                  estado={celular}
                  cambiarEstado={setCelular}
                  label={"Celular:"}
                  placeholder={"Celular"}
                  name={"Celular"}
                  expresionRegular={expresiones.telefono}
                  tipo={"text"}
                />
                <Input
                  estado={tipoEvento}
                  cambiarEstado={setTipoEvento}
                  label={"Tipo evento:"}
                  placeholder={"Tipo evento"}
                  name={"Tipo evento"}
                  expresionRegular={expresiones.nombre}
                  tipo={"text"}
                  editable={true}
                />
                <Input
                  estado={ubicacionEvento}
                  cambiarEstado={setUbicacionEvento}
                  label={"Ubicacion del evento:"}
                  placeholder={"Link ubicacion GoogleMaps"}
                  name={"Tipo evento"}
                  expresionRegular={expresiones.direccion}
                  tipo={"text"}
                  editable={true}
                />
                <Input
                  estado={descripcion}
                  cambiarEstado={setDescripcion}
                  label={"Descripción:"}
                  placeholder={"Descripción"}
                  name={"Descripción"}
                  expresionRegular={expresiones.texto}
                  tipo={"text"}
                  editable={true}
                  boxText={true}
                />
                <Input
                  estado={fechaEvento}
                  cambiarEstado={setFechaEvento}
                  label={"Fecha evento:"}
                  placeholder={"Fecha evento"}
                  name={"Fecha evento"}
                  expresionRegular={expresiones.texto}
                  tipo={"date"}
                  editable={true}
                />
                <Input
                  estado={horaEvento}
                  cambiarEstado={setHoraEvento}
                  label={"Hora evento:"}
                  placeholder={"Hora evento"}
                  name={"Hora evento"}
                  expresionRegular={expresiones.hora}
                  tipo={"time"}
                  editable={true}
                />
                <ContainerMateriales>
                  <Input
                    estado={material}
                    cambiarEstado={setMaterial}
                    label={"Material:"}
                    placeholder={"Material"}
                    name={"Material"}
                    expresionRegular={expresiones.nombre}
                    tipo={"select"}
                    editable={true}
                    select={true}
                    listaMateriales={listaMateriales}
                    manual={manual}
                    setManual={setManual}
                  />
                  <Input
                    estado={cantidadMaterial}
                    cambiarEstado={setCantidadMaterial}
                    label={"Cantidad:"}
                    placeholder={"Cantidad material"}
                    name={"Cantidad material"}
                    expresionRegular={expresiones.cantidad}
                    tipo={"number"}
                    editable={true}
                  />
                  <IconBuscar
                    añadirMaterial
                    icon={faAdd}
                    onClick={agregarMaterial}
                  />
                </ContainerMateriales>
                {materialesAñadidos.length > 0 && (
                  <ContainerListaMateriales>
                    <TextBox>Materiales Añadidos:</TextBox>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={titulos}>
                            Nº
                          </TableCell>
                          <TableCell align="center" sx={titulos}>
                            MATERIAL
                          </TableCell>
                          <TableCell align="center" sx={titulos}>
                            CANTIDAD
                          </TableCell>
                          <TableCell align="center" sx={titulos}>
                            ACCIÓN
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materialesAñadidos.map((material, index) => (
                          <TableRow>
                            <TableCell align="center" sx={celdas}>
                              {index + 1}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              {material.nombre}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              {material.cantidad}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              <ContainerImgIcon
                                onClick={() =>
                                  eliminarMaterial(material.nombre)
                                }
                              >
                                <ImgIconEliminar
                                  icon={faTrash}
                                ></ImgIconEliminar>
                              </ContainerImgIcon>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ContainerListaMateriales>
                )}
                <ContainerBoton>
                  <BotonAñadir solicitud onClick={enviarSolicitud}>
                    {" "}
                    Enviar solicitud
                  </BotonAñadir>
                </ContainerBoton>
              </DetalleUsuario>
            </ContainerUsuario>
          )}
          {opcion === 2 && (
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
                          FECHA SOLICITADA
                        </TableCell>
                        <TableCell align="center" sx={titulos}>
                          FECHA PROGRAMADA
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
                        let filaEstilo;
                        switch (solicitud.ESTADO) {
                          case "Aceptado":
                            filaEstilo = filaVerde;
                            break;
                          case "Rechazado":
                            filaEstilo = filaRoja;
                            break;
                          default:
                            filaEstilo = filaNormal;
                            break;
                        }
                        return (
                          <TableRow
                            key={solicitud.CODSOLICITUD}
                            sx={filaEstilo}
                          >
                            <TableCell sx={celdas}>{rowNumS}</TableCell>
                            <TableCell sx={celdas}>
                              {solicitud.CODSOLICITUD}
                            </TableCell>
                            <TableCell sx={celdas}>
                              {solicitud.TIPOEVENTO}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              {solicitud.FECHASOLICITADA}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              {solicitud.FECHAPROGRAMADA}
                            </TableCell>
                            <TableCell align="center" sx={celdas}>
                              <ContainerImgIcon
                                title="Ver información"
                                onClick={() => {
                                  setInformacion(solicitud);
                                  setInformacionSolicitud(
                                    !modalInformacionSolicitud
                                  );
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
                estado={modalInformacionSolicitud}
                cambiarEstado={setInformacionSolicitud}
                solicitud={informacion}
                codigo={casaUsuario.NOMBREENCARGADO}
                casa={true}
                miembrosInicial={listaMiembros}
                miembrosInicialOtra={listaMiembrosOtra}
                directivaInicial={casaUsuario.directiva}
              />
            </ContainerUsuario>
          )}
          {opcion === 3 && (
            <ContainerUsuario>
              <DetalleUsuario>
                <Titulo>INFORMACION CASA CAMPAÑA</Titulo>
                <ContainerInformacion>
                  <Input
                    estado={codigo}
                    cambiarEstado={setCodigo}
                    label={"Codigo casa de campaña:"}
                    placeholder={"Nombre responsable"}
                    name={"Nombre responsable"}
                    expresionRegular={expresiones.nombre}
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
                    estado={direccion}
                    cambiarEstado={setDireccion}
                    label={"Direccion:"}
                    placeholder={"Direccion"}
                    name={"Direccion"}
                    expresionRegular={expresiones.lugar}
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
                    estado={correo}
                    cambiarEstado={setCorreo}
                    label={"Correo:"}
                    placeholder={"Celular"}
                    name={"Celular"}
                    expresionRegular={expresiones.correo}
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
          {opcion === 4 && (
            <ContainerUsuario>
              <DetalleUsuario>
                <Titulo>INFORMACION DIRECTIVA CASA CAMPAÑA</Titulo>
                <ContainerInformacion>
                  <Input
                    estado={nombre}
                    cambiarEstado={setNombre}
                    label={"Nombre responsable:"}
                    placeholder={"Nombre responsable"}
                    name={"Nombre responsable"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <Input
                    estado={nombreHacienda}
                    cambiarEstado={setNombreHacienda}
                    label={"Nombre responsable hacienda:"}
                    placeholder={"Nombre responsable hacienda"}
                    name={"Nombre responsable hacienda"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <Input
                    estado={nombreActas}
                    cambiarEstado={setNombreActas}
                    label={"Nombre responsable actas:"}
                    placeholder={"Nombre responsable actas"}
                    name={"Nombre responsable actas"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <Input
                    estado={nombreLogistica}
                    cambiarEstado={setNombreLogistica}
                    label={"Nombre responsable logistica:"}
                    placeholder={"Nombre responsable logistica"}
                    name={"Nombre responsable logistica"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <Input
                    estado={nombreRedes}
                    cambiarEstado={setNombreRedes}
                    label={"Nombre responsable redes:"}
                    placeholder={"Nombre responsable redes"}
                    name={"Nombre responsable redes"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <Input
                    estado={nombreJuventud}
                    cambiarEstado={setNombreJuventud}
                    label={"Nombre responsable juventud:"}
                    placeholder={"Nombre responsable juventud"}
                    name={"Nombre responsable juventud"}
                    expresionRegular={expresiones.nombre}
                    tipo={"text"}
                    editable={true}
                    completo
                  />
                  <ContainerBoton>
                    <BotonAñadir modificar onClick={guardarDatosDirectiva}>
                      Guardar cambios
                    </BotonAñadir>
                  </ContainerBoton>
                </ContainerInformacion>
              </DetalleUsuario>
            </ContainerUsuario>
          )}
          {opcion === 5 && (
            <ContainerUsuario>
              <DetalleUsuario>
                <Titulo>MIEMBROS</Titulo>
                <ContainerBuscar>
                  <IconBuscar icon={faSearch} />
                  <InputBuscar
                    placeholder="Buscar miembro"
                    value={buscarM}
                    onChange={(e) => {
                      setBuscarM(e.target.value);
                    }}
                  />
                  <IconBuscar
                    añadir
                    icon={faAdd}
                    onClick={() => {
                      setModalMiembro(!modalMiembro);
                    }}
                  />
                </ContainerBuscar>
                <TablaSolicitudes>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={titulos}>Nº</TableCell>
                        <TableCell sx={titulos}>NOMBRE</TableCell>
                        <TableCell sx={titulos}>CELULAR</TableCell>
                        <TableCell sx={titulos}>CARGO</TableCell>
                      </TableRow>
                    </TableHead>
                    {listaResMiembros
                      .slice(
                        paginaM * rowPerPageM,
                        paginaM * rowPerPageM + rowPerPageM
                      )
                      .map((miembro, index) => {
                        const rowNumS = paginaS * rowPerPageS + index + 1;
                        return (
                          <TableRow key={miembro.CODCASACAMPANA}>
                            <TableCell sx={celdas}>{rowNumS}</TableCell>
                            <TableCell sx={celdas}>
                              {miembro.NOMBREMIEMBRO}
                            </TableCell>
                            <TableCell sx={celdas}>
                              {miembro.CELULARMIEMBRO}
                            </TableCell>
                            <TableCell sx={celdas}>{miembro.CARGO}</TableCell>
                          </TableRow>
                        );
                      })}
                  </Table>
                </TablaSolicitudes>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rowsPerPage={rowPerPageM}
                  page={paginaM}
                  count={listaResMiembros.length}
                  component="div"
                  onPageChange={cambiarPaginaM}
                  onRowsPerPageChange={cambiarPerPageM}
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
              <ModalMiembro
                estado={modalMiembro}
                cambiarEstado={setModalMiembro}
                casa={casaUsuario.CODCASACAMPANA}
              />
            </ContainerUsuario>
          )}
          {opcion === 6 && (
            <>
              <ContainerLista>
                <Titulo>INFORME</Titulo>
                <TablaSolicitudes informe>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Nombre:</Division>
                    <Division>{casaUsuario.NOMBREENCARGADO}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Codigo:</Division>
                    <Division>{casaUsuario.CODCASACAMPANA}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Cargo:</Division>
                    <Division>Casa de campaña</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Celular:</Division>
                    <Division>{casaUsuario.CELULARCASA}</Division>
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
                            ENCARGADO
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            ESTADO
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            OBSERVACIONES
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
                                {solicitud.nombreAdministrador}
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
                  <Division negrilla>Asignados:</Division>
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
                            CODIGO ENCARGADO LOGISTICA
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            ENCARGADO LOGISTICA
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            CODIGO ENCARGADO REDES
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            ENCARGADO REDES
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
                                {solicitud.codLogistica}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.encargadoLogistica}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.codRedes}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.encargadoRedes}
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
                            CODIGO ENCARGADO LOGISTICA
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
                                {solicitud.codLogistica}
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
                  <Division negrilla>Participantes del evento:</Division>
                  <ContainerFilaInforme>
                    {listaSolicitudes.map((solicitud, index) => {
                      return (
                        <>
                          <Division>
                            {index + 1}
                            {".- "} {solicitud.CODSOLICITUD}
                            {" - "}
                            {solicitud.TIPOEVENTO.toUpperCase()}
                          </Division>
                          <ContainerFilaInforme>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center" sx={titulosI}>
                                    Nº
                                  </TableCell>
                                  <TableCell align="center" sx={titulosI}>
                                    CASA DE CAMPAÑA
                                  </TableCell>
                                  <TableCell align="center" sx={titulosI}>
                                    NOMBRE PARTICIPANTE
                                  </TableCell>
                                  <TableCell align="center" sx={titulosI}>
                                    ROL
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {solicitud.participantes.length > 0 &&
                                  solicitud.participantes.map(
                                    (participante, i) => (
                                      <TableRow
                                        key={`${solicitud.CODSOLICITUD}-${i}`}
                                      >
                                        <TableCell align="center" sx={celdas}>
                                          {i + 1}
                                        </TableCell>
                                        <TableCell align="center" sx={celdas}>
                                          {participante.PERTENECE || "N/A"}
                                        </TableCell>
                                        <TableCell align="center" sx={celdas}>
                                          {participante.NOMBREPARTICIPANTE}
                                        </TableCell>
                                        <TableCell align="center" sx={celdas}>
                                          {participante.ROL}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                              </TableBody>
                            </Table>
                          </ContainerFilaInforme>
                        </>
                      );
                    })}
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
                          solicitud.imagenes.map((url, imgIndex) => {
                            const esVideo =
                              url.endsWith(".mp4") ||
                              url.endsWith(".webm") ||
                              url.endsWith(".ogg");
                            return esVideo ? (
                              <ContainerVideo key={index} controls>
                                <source src={url} type="video/mp4" />
                                Tu navegador no soporta la reproducción de
                                video.
                              </ContainerVideo>
                            ) : (
                              <ContainerFoto
                                key={index}
                                src={url}
                                alt="Imagen"
                              />
                            );
                          })
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
