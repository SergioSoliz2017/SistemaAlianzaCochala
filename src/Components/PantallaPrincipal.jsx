import React, { useRef, useState } from "react";
import { useEffect } from "react";
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
  ContainerFotos,
  ContainerImgIcon,
  ContainerLista,
  ContainerLogoNav,
  ContainerUsuario,
  ContainerVideo,
  Division,
  FotosGrid,
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
  Link,
} from "@mui/material";
import {
  faAdd,
  faArrowRightFromBracket,
  faCheck,
  faFile,
  faFilePen,
  faFolder,
  faGear,
  faGlobe,
  faHouse,
  faInfoCircle,
  faSearch,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { url } from "./VariablesEntorni";
import ModalCasaCampaña from "./ModalCasaCampaña";
import ModalLogistica from "./ModalLogistica";
import ModalInformacionSolicitud from "./ModalInformacionSolicitud";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ModalAsignar from "./ModalAsignar";
import ModalRedes from "./ModalRedes";
import {
  BotonAñadir,
  ContainerBoton,
  ContainerListaMateriales,
  ImgIconEliminar,
} from "./DiseñoModalCasaCampaña";
import { Carga } from "./DiseñoInicio";
import Input from "./InputSolicitud";
import { ContainerMateriales } from "./DiseñoPantallaCasaCampaña";
import { TextBox } from "./DiseñoInput";

const titulos = {
  fontWeight: 1000,
  color: "#000000",
  fontSize: "12px",
};
const titulosI = {
  fontWeight: 1000,
  color: "#000000",
  fontSize: "10px",
};
const celdas = {
  fontWeight: 10,
  color: "#000000",
  fontSize: "10px",
  border: "none",
};
const celdasI = {
  fontWeight: 10,
  color: "#000000",
  fontSize: "8px",
  border: "none",
};
const accion = {
  fontWeight: 10,
  color: "#000000",
  fontSize: "10px",
  display: "flex",
  border: "none",
};
export default function PantallaPrincipal() {
  const [extender, setExtender] = useState(false);
  const [opcion, setOpcion] = useState(0);
  const [modalAñadirCasa, setModalAñadirCasa] = useState(false);
  const [modalAñadirLogistica, setModalAñadirLogistica] = useState(false);
  const [modalAñadirRedes, setModalAñadirRedes] = useState(false);
  const [modalInformacionSolicitud, setInformacionSolicitud] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const location = useLocation();
  const [administrador, setAdministrador] = useState(null);
  const isEffectExecuted = useRef(false);

  const codAdmin = location.pathname.substring(6, location.pathname.length);
  const [casa, setCasa] = useState({ campo: "", texto: "" });

  useEffect(() => {
    if (opcion === 0 && administrador === null && !isEffectExecuted.current) {
      if (codAdmin !== "") {
        isEffectExecuted.current = true;
        axios.get(`${url}obtenerAdministrador/${codAdmin}`).then((response) => {
          setAdministrador(response.data);
          document.title = response.data.NOMBREADMINISTRADOR;
        });
      }
    }
    if (opcion === 1) {
      if (listaCasaCampaña !== null){
        obtenerCasaCampaña()
      }
      setNombre({ campo: administrador.NOMBREADMINISTRADOR, valido: null });
      setCelular({ campo: administrador.CELULARADMINISTRADOR, valido: null });
      if (casa.campo !== ""){
        const casaEncontrada = listaCasaCampaña.find(
          (casaC) => casaC.CODCASACAMPANA === casa.campo
        );
        setDireccion({ campo: casaEncontrada.DIRECCION, valido: null });
      }else{
        setDireccion({ campo: "", texto: "" })
      }
    }
    if (opcion == 2) {
      obtenerSolicitudes();
    }
    if (opcion == 6) {
      obtenerSolicitudesAdmin();
    }
    if (opcion == 3 && !modalAñadirCasa) {
      obtenerCasaCampaña();
    }
    if (opcion == 4 && !modalAñadirLogistica) {
      obtenerLogistica();
    }
    if (opcion == 5 && !modalAñadirRedes) {
      obtenerRedes();
    }
    if (modalAsignar) {
      obtenerLogistica();
      obtenerRedes();
    }
    if (opcion == 6) {
    }
  }, [
    opcion,
    modalAñadirCasa,
    modalAñadirLogistica,
    modalAñadirRedes,
    actualizar,
    modalAsignar,casa
  ]);
  // Solicitudes-------------------------------------------------------
  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const obtenerSolicitudes = () => {
    axios.get(url + "obtenerSolicitudes").then((response) => {
      setListaSolicitudes(response.data);
      console.log(response.data);
      setActualizar(false);
    });
  };
  const [listaSolicitudesAdmin, setListaSolicitudesAdmin] = useState([]);
  const obtenerSolicitudesAdmin = () => {
    axios.get(url + "solicitudesAdministrador/" + codAdmin).then((response) => {
      setListaSolicitudesAdmin(response.data);
      console.log(response.data);
      setActualizar(false);
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
    listaResSolicitud = listaSolicitudes.filter(
      (item) =>
        item.TIPOEVENTO.toLowerCase().includes(buscarS.toLowerCase()) ||
        item.casa_campañas[0].NOMBREENCARGADO.toLowerCase().includes(
          buscarS.toLowerCase()
        ) ||
        item.CODSOLICITUD.toLowerCase().includes(buscarS.toLowerCase())
    );
  }
  //------------------------------------------------------------------------
  //Casa Campaña--------------------------------------------------------
  const [listaCasaCampaña, setListaCasaCampaña] = useState([]);
  const [paginaCC, setPaginaCC] = useState(0);
  const [rowPerPageCC, setRowPerPageCC] = useState(5);
  const cambiarPaginaCC = (event, newpage) => {
    setPaginaCC(newpage);
  };
  const cambiarPerPageCC = (event) => {
    setRowPerPageCC(+event.target.value);
    setPaginaCC(0);
  };

  const obtenerCasaCampaña = () => {
    axios.get(url + "obtenerCasaCampaña").then((response) => {
      setListaCasaCampaña(response.data);
    });
  };
  let listaResCasaCamapaña = [];
  const [buscarCC, setBuscarCC] = useState("");
  if (!buscarCC) {
    listaResCasaCamapaña = listaCasaCampaña;
  } else {
    listaResCasaCamapaña = listaCasaCampaña.filter(
      (item) =>
        item.NOMBREENCARGADO.toLowerCase().includes(buscarCC.toLowerCase()) ||
        item.DIRECCION.toLowerCase().includes(buscarCC.toLowerCase()) ||
        item.CODCASACAMPANA.toLowerCase().includes(buscarCC.toLowerCase())
    );
  }
  //-----------------------------------------------------------------
  //lOGISTICA--------------------------------------------------------
  const [listaLogistica, setListaLogistica] = useState([]);
  const [paginaL, setPaginaL] = useState(0);
  const [rowPerPageL, setRowPerPageL] = useState(5);
  const cambiarPaginaL = (event, newpage) => {
    setPaginaL(newpage);
  };
  const cambiarPerPageL = (event) => {
    setRowPerPageL(+event.target.value);
    setPaginaL(0);
  };

  const obtenerLogistica = () => {
    axios.get(url + "obtenerLogistica").then((response) => {
      setListaLogistica(response.data);
    });
  };
  let listaResLogistica = [];
  const [buscarL, setBuscarL] = useState("");
  if (!buscarL) {
    listaResLogistica = listaLogistica;
  } else {
    listaResLogistica = listaLogistica.filter(
      (item) =>
        item.NOMBRERESPONSABLE.toLowerCase().includes(buscarL.toLowerCase()) ||
        item.ENCARGADOLOGISTICA.toLowerCase().includes(buscarL.toLowerCase()) ||
        item.CODLOGISTICA.toLowerCase().includes(buscarL.toLowerCase())
    );
  }
  //-----------------------------------------------------------------
  //REDES--------------------------------------------------------
  const [listaRedes, setListaRedes] = useState([]);
  const [paginaR, setPaginaR] = useState(0);
  const [rowPerPageR, setRowPerPageR] = useState(5);
  const cambiarPaginaR = (event, newpage) => {
    setPaginaR(newpage);
  };
  const cambiarPerPageR = (event) => {
    setRowPerPageR(+event.target.value);
    setPaginaR(0);
  };

  const obtenerRedes = () => {
    axios.get(url + "obtenerRedes").then((response) => {
      setListaRedes(response.data);
    });
  };
  let listaResRedes = [];
  const [buscarR, setBuscarR] = useState("");
  if (!buscarR) {
    listaResRedes = listaRedes;
  } else {
    listaResRedes = listaRedes.filter(
      (item) =>
        item.NOMBREREDES.toLowerCase().includes(buscarR.toLowerCase()) ||
        item.ENCARGADOREDES.toLowerCase().includes(buscarR.toLowerCase()) ||
        item.CODREDES.toLowerCase().includes(buscarR.toLowerCase())
    );
  }
  //-----------------------------------------------------------------
  const filaVerde = {
    borderBottom: "1px solid black",
    backgroundColor: "#98FB98",
  };

  const filaRoja = {
    borderBottom: "1px solid black",
    backgroundColor: "#ff6f6f",
  };

  const filaNormal = {
    borderBottom: "1px solid black",
    backgroundColor: "transparent",
  };
  const navigate = useNavigate();

  const [informacion, setInformacion] = useState([]);
  const rechazar = (solicitud) => {
    Swal.fire({
      title: "Rechazar solicitud",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputPlaceholder: "Escriba motivo", // Placeholder
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      confirmButtonColor: "#6603b2",
      confirmButtonText: "Rechazar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const motivoRechazo = Swal.getInput().value; // Obtener el texto ingresado
        if (!motivoRechazo.trim()) {
          // Verificar si está vacío o solo contiene espacios
          Swal.showValidationMessage("Por favor, ingrese un motivo de rechazo"); // Mostrar mensaje de validación
          return false; // Detener la ejecución del preConfirm
        }

        try {
          const fechaBolivia = new Date();
          fechaBolivia.setHours(fechaBolivia.getHours() - 4); // Ajusta a la hora de Bolivia
          const fechaBoliviaString = fechaBolivia.toISOString().split("T")[0];
          const response = await axios.put(
            url + "rechazarSolicitud/" + solicitud.CODSOLICITUD,
            {
              ACEPTO: codAdmin,
              OBSERVACIONES: motivoRechazo,
              FECHAAPROBADA: fechaBoliviaString,
            }
          );
          if (response.status !== 200) {
            Swal.showValidationMessage("Rechazo fallido");
          } else {
            setActualizar(true);
          }
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Rechazo registrado.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const [cargando, setCargando] = useState(false);
  const generarPDF = () => {
    setCargando(true);
    axios
      .get(`${url}obtenerPDF/${codAdmin}`, { responseType: "blob" })
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
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [ubicacion, setUbicacion] = useState({ campo: "", valido: null });
  const [celular, setCelular] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
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
  const enviarSolicitud = () => {
  
     axios
      .post(url + "crearSolicitud", {
        CODADMINISTRADOR: codAdmin,
        CODCASACAMPANA:casa.campo,
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
  const borrarDatos = () => {
    setTipoEvento({ campo: "", valido: null });
    setDescripcion({ campo: "", valido: null });
    setFechaEvento({ campo: "", valido: null });
    setHoraEvento({ campo: "", valido: null });
    setListaMateriales(materialInicial);
    setMaterialesAñadidos([]);
    setUbicacionEvento({ campo: "", valido: null });
    setCasa({ campo: "", valido: null });
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <BarrasNav
          extender={extender ? "true" : undefined} // O pasar "false" si es necesario
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
              <ImgIcon icon={faGear} />
              Logistica
            </BotonNav>
            <BotonNav
              seleccionado={opcion == 5 ? "true" : "false"}
              onClick={() => {
                setOpcion(5);
                setExtender(false);
              }}
            >
              <ImgIcon icon={faGlobe} />
              Redes
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
            <ContainerLista solicitud>
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
                estado={celular}
                cambiarEstado={setCelular}
                label={"Celular:"}
                placeholder={"Celular"}
                name={"Celular"}
                expresionRegular={expresiones.telefono}
                tipo={"text"}
              />
              <Input
                  estado={casa}
                  cambiarEstado={setCasa}
                  label={"Asignar casa de campaña:"}
                  placeholder={"Asignar casa de campaña"}
                  name={"Asignar casa de campaña"}
                  expresionRegular={expresiones.nombre}
                  tipo={"select"}
                  editable={true}
                  select={true}
                  listaMateriales={listaCasaCampaña}
                  admin = {true}
                />
              <Input
                estado={direccion}
                cambiarEstado={setDireccion}
                label={"Direccion:"}
                placeholder={"Direccion"}
                name={"Direccion"}
                expresionRegular={expresiones.lugar}
                tipo={"text"}
                editable={casa.campo === ""}
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
                              onClick={() => eliminarMaterial(material.nombre)}
                            >
                              <ImgIconEliminar icon={faTrash}></ImgIconEliminar>
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
              </ContainerLista >

          )}
          {opcion === 2 && (
            <ContainerLista>
              <Titulo>LISTA SOLICITUDES</Titulo>
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
                      <TableCell sx={titulos}>CÓDIGO</TableCell>
                      <TableCell sx={titulos}>NOMBRE</TableCell>
                      <TableCell sx={titulos}>EVENTO</TableCell>
                      <TableCell align="center" sx={titulos}>
                        FECHA SOLICITADA
                      </TableCell>
                      <TableCell align="center" sx={titulos}>
                        FECHA PROGRAMADA
                      </TableCell>
                      <TableCell sx={titulos}>INFORMACIÓN</TableCell>
                      <TableCell align="center" sx={titulos}>
                        ACCIÓN
                      </TableCell>
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
                        <TableRow key={solicitud.CODSOLICITUD} sx={filaEstilo}>
                          <TableCell sx={celdas}>{rowNumS}</TableCell>
                          <TableCell sx={celdas}>
                            {solicitud.CODSOLICITUD}
                          </TableCell>
                          <TableCell sx={celdas}>
                            {solicitud.casa_campañas[0]?.NOMBREENCARGADO ||
                                  administrador.NOMBREADMINISTRADOR}
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
                          <TableCell align="center" sx={accion}>
                            {solicitud.ESTADO === "Pendiente" && (
                              <>
                                <ContainerImgIcon
                                  title="Aceptar solicitud"
                                  onClick={() => {
                                    setModalAsignar(!modalAsignar);
                                    setInformacion(solicitud);
                                  }}
                                >
                                  <ImgIcon tabla icon={faCheck} />
                                </ContainerImgIcon>
                                <ContainerImgIcon
                                  title="Rechazar solicitud"
                                  onClick={() => rechazar(solicitud)} // Usamos una función anónima
                                >
                                  <ImgIcon tabla icon={faXmark} />
                                </ContainerImgIcon>
                              </>
                            )}
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
              <ModalInformacionSolicitud
                estado={modalInformacionSolicitud}
                cambiarEstado={setInformacionSolicitud}
                solicitud={informacion}
                admin={true}
              />
              <ModalAsignar
                estado={modalAsignar}
                cambiarEstado={setModalAsignar}
                listaLogistica={listaLogistica}
                listaRedes={listaRedes}
                solicitud={informacion}
                actualizar={setActualizar}
                admin={codAdmin}
              />
            </ContainerLista>
          )}
          {opcion === 3 && (
            <>
              <ContainerLista>
                <Titulo>LISTA CASA CAMPAÑA</Titulo>
                <ContainerBuscar>
                  <IconBuscar icon={faSearch} />
                  <InputBuscar
                    placeholder="Buscar casa de campaña"
                    value={buscarCC}
                    onChange={(e) => {
                      setBuscarCC(e.target.value);
                    }}
                  />
                  <IconBuscar
                    añadir
                    icon={faAdd}
                    onClick={() => {
                      setModalAñadirCasa(!modalAñadirCasa);
                    }}
                  />
                </ContainerBuscar>
                <TablaSolicitudes>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={titulos}>Nº</TableCell>
                        <TableCell sx={titulos}>CODIGO</TableCell>
                        <TableCell sx={titulos}>ENCARGADO</TableCell>
                        <TableCell sx={titulos}>DISTRITO</TableCell>
                        <TableCell sx={titulos}>ZONA</TableCell>
                        <TableCell sx={titulos}>DIRECCION</TableCell>
                        <TableCell sx={titulos}>UBICACION</TableCell>
                        <TableCell sx={titulos}>CELULAR</TableCell>
                        <TableCell sx={titulos}>GRUPO</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaResCasaCamapaña
                        .slice(
                          paginaCC * rowPerPageCC,
                          paginaCC * rowPerPageCC + rowPerPageCC
                        )
                        .map((casaCampaña, index) => {
                          const rowNumCC = paginaCC * rowPerPageCC + index + 1;
                          return (
                            <TableRow key={casaCampaña.CODCASACAMPANA}>
                              <TableCell sx={celdas}>{rowNumCC}</TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.CODCASACAMPANA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.NOMBREENCARGADO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {casaCampaña.DISTRITO}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.ZONA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.DIRECCION}
                              </TableCell>
                              <TableCell sx={celdas}>
                                <Link
                                  href={casaCampaña.UBICACION}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {casaCampaña.UBICACION}
                                </Link>
                              </TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.CELULARCASA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {casaCampaña.NOMBREGRUPO}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TablaSolicitudes>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rowsPerPage={rowPerPageCC}
                  page={paginaCC}
                  count={listaResCasaCamapaña.length}
                  component="div"
                  onPageChange={cambiarPaginaCC}
                  onRowsPerPageChange={cambiarPerPageCC}
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
              </ContainerLista>
              <ModalCasaCampaña
                estado={modalAñadirCasa}
                cambiarEstado={setModalAñadirCasa}
              />
            </>
          )}
          {opcion === 4 && (
            <>
              <ContainerLista>
                <Titulo>LISTA LOGISTICA</Titulo>
                <ContainerBuscar>
                  <IconBuscar icon={faSearch} />
                  <InputBuscar
                    placeholder="Buscar miembro logistica"
                    value={buscarL}
                    onChange={(e) => {
                      setBuscarL(e.target.value);
                    }}
                  />
                  <IconBuscar
                    añadir
                    icon={faAdd}
                    onClick={() => {
                      setModalAñadirLogistica(!modalAñadirLogistica);
                    }}
                  />
                </ContainerBuscar>
                <TablaSolicitudes>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={titulos}>Nº</TableCell>
                        <TableCell sx={titulos}>CODIGO</TableCell>
                        <TableCell sx={titulos}>NOMBRE</TableCell>
                        <TableCell sx={titulos}>ENCARGADO</TableCell>
                        <TableCell sx={titulos}>CELULAR</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaResLogistica
                        .slice(
                          paginaL * rowPerPageL,
                          paginaL * rowPerPageL + rowPerPageL
                        )
                        .map((logistica, index) => {
                          const rowNumL = paginaL * rowPerPageL + index + 1;
                          return (
                            <TableRow key={logistica.CODLOGISTICA}>
                              <TableCell sx={celdas}>{rowNumL}</TableCell>
                              <TableCell sx={celdas}>
                                {logistica.CODLOGISTICA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.NOMBRERESPONSABLE}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.ENCARGADOLOGISTICA}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.CELULARLOGISTICA}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TablaSolicitudes>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rowsPerPage={rowPerPageL}
                  page={paginaL}
                  count={listaResLogistica.length}
                  component="div"
                  onPageChange={cambiarPaginaL}
                  onRowsPerPageChange={cambiarPerPageL}
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
              </ContainerLista>
              <ModalLogistica
                estado={modalAñadirLogistica}
                cambiarEstado={setModalAñadirLogistica}
              />
            </>
          )}
          {opcion === 5 && (
            <>
              <ContainerLista>
                <Titulo>LISTA REDES</Titulo>
                <ContainerBuscar>
                  <IconBuscar icon={faSearch} />
                  <InputBuscar
                    placeholder="Buscar miembro redes"
                    value={buscarR}
                    onChange={(e) => {
                      setBuscarR(e.target.value);
                    }}
                  />
                  <IconBuscar
                    añadir
                    icon={faAdd}
                    onClick={() => {
                      setModalAñadirRedes(!modalAñadirRedes);
                    }}
                  />
                </ContainerBuscar>
                <TablaSolicitudes>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={titulos}>Nº</TableCell>
                        <TableCell sx={titulos}>CODIGO</TableCell>
                        <TableCell sx={titulos}>NOMBRE</TableCell>
                        <TableCell sx={titulos}>ENCARGADO</TableCell>
                        <TableCell sx={titulos}>CELULAR</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaResRedes
                        .slice(
                          paginaR * rowPerPageR,
                          paginaR * rowPerPageR + rowPerPageR
                        )
                        .map((logistica, index) => {
                          const rowNumR = paginaR * rowPerPageR + index + 1;
                          return (
                            <TableRow key={logistica.CODREDES}>
                              <TableCell sx={celdas}>{rowNumR}</TableCell>
                              <TableCell sx={celdas}>
                                {logistica.CODREDES}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.NOMBREREDES}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.ENCARGADOREDES}
                              </TableCell>
                              <TableCell sx={celdas}>
                                {logistica.CELULARREDES}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TablaSolicitudes>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rowsPerPage={rowPerPageR}
                  page={paginaR}
                  count={listaResRedes.length}
                  component="div"
                  onPageChange={cambiarPaginaR}
                  onRowsPerPageChange={cambiarPerPageR}
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
              </ContainerLista>
              <ModalRedes
                estado={modalAñadirRedes}
                cambiarEstado={setModalAñadirRedes}
              />
            </>
          )}
          {opcion === 6 && (
            <>
              <ContainerLista>
                <Titulo>INFORME</Titulo>
                <TablaSolicitudes informe>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Nombre:</Division>
                    <Division>{administrador.NOMBREADMINISTRADOR}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Codigo:</Division>
                    <Division>{administrador.CODADMINISTRADOR}</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Cargo:</Division>
                    <Division>Administrador</Division>
                  </ContainerFilaInforme>
                  <ContainerFilaInforme letra>
                    <Division negrilla>Celular:</Division>
                    <Division>{administrador.CELULARADMINISTRADOR}</Division>
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
                            ESTADO
                          </TableCell>
                          <TableCell align="center" sx={titulosI}>
                            OBSERVACIONES
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listaSolicitudesAdmin.map((solicitud, index) => {
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
                              <TableCell align="center" sx={celdas}>
                                {solicitud.casa_campañas[0]?.NOMBREENCARGADO}
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
                            CASA DE CAMPAÑA
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
                        {listaSolicitudesAdmin.map((solicitud, index) => {
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
                              <TableCell align="center" sx={celdas}>
                                {solicitud.tarea_logistica?.logistica
                                  ?.CODLOGISTICA}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.tarea_logistica?.logistica
                                  ?.NOMBRERESPONSABLE }
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.tarea_redes?.redes?.CODREDES }
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.tarea_redes?.redes?.NOMBREREDES }
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
                            CASA DE CAMPAÑA
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
                        {listaSolicitudesAdmin.map((solicitud, index) => {
                          return (
                            <TableRow key={solicitud.CODSOLICITUD}>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.CODSOLICITUD}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.casa_campañas[0]?.CODCASACAMPANA }
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {solicitud.tarea_logistica?.logistica
                                  ?.CODLOGISTICA }
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
                  {listaSolicitudesAdmin.map((solicitud, index) => {
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
                  <Division negrilla>Imagenes:</Division>
                  <ContainerFilaInforme>
                    {listaSolicitudesAdmin.map((solicitud, index) => (
                      <div key={index}>
                        <Division negrilla>
                          Solicitud:{" "}
                          {solicitud.CODSOLICITUD +
                            " - " +
                            solicitud.TIPOEVENTO.toUpperCase()}
                        </Division>
                        {solicitud.imagenes &&
                          Object.entries(solicitud.imagenes).map(
                            ([nombre, urls]) => (
                              <TituloUsuario
                                key={`${index}-${nombre}`}
                                style={{ marginBottom: "15px" }}
                              >
                                <TituloUsuario>Usuario: {nombre}</TituloUsuario>
                                {urls.map((url, imgIndex) => {
                                  // Determinar si es una imagen o un video
                                  const esVideo =
                                    url.endsWith(".mp4") ||
                                    url.endsWith(".webm") ||
                                    url.endsWith(".ogg");
                                  return esVideo ? (
                                    <ContainerVideo
                                      key={`${index}-${nombre}-${imgIndex}`}
                                      controls
                                    >
                                      <source src={url} type="video/mp4" />
                                      Tu navegador no soporta la reproducción de
                                      video.
                                    </ContainerVideo>
                                  ) : (
                                    <ContainerFoto
                                      key={`${index}-${nombre}-${imgIndex}`}
                                      src={url}
                                      alt={`Imagen de ${nombre}`}
                                    />
                                  );
                                })}
                              </TituloUsuario>
                            )
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
