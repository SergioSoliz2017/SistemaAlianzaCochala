import React, { useEffect, useRef, useState } from "react";
import {
  BotonAñadir,
  BotonCerrar,
  BotonSubir,
  ContainerBoton,
  ContainerFoto,
  ContainerFotos,
  ContainerUsuario,
  ContainerVideo,
  ContenedorModal,
  DetalleUsuario,
  EncabezadoModal,
  FotosGrid,
  Overlay,
  Titulo,
  TituloUsuario,
} from "./DiseñoModalInformacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  ContainerLetra,
  IconBuscar,
  Letra,
  LetraInformacion,
  Seccion,
} from "./DiseñoPantallaPrincipal";
import axios from "axios";
import { url } from "./VariablesEntorni";
import Swal from "sweetalert2";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ContainerMateriales } from "./DiseñoPantallaCasaCampaña";
import Input from "./InputSolicitud";
import {
  ContainerImgIcon,
  ContainerListaMateriales,
  ImgIconEliminar,
} from "./DiseñoModalCasaCampaña";
import { TextBox } from "./DiseñoInputSolicitud";
export default function ModalInformacionSolicitud({
  estado,
  cambiarEstado,
  solicitud,
  casa,
  logistica,
  codigo,
  admin,
  redes,
  miembrosInicial,
  miembrosInicialOtra,
  directivaInicial,
}) {
  const [fotos, setFotos] = useState(false);
  const [participantes, setParticipantes] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [obtenerFotos, setObtenerFotos] = useState();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [obtenido, setObtenido] = useState(false);
  const [listaDirectiva, setlistaDirectiva] = useState([]);

  useEffect(() => {
    const obtenerImagenes = async () => {
      if (fotos) {
        try {
          const response = await axios.get(url + "obtenerImagenes", {
            params: {
              esAdmin: admin,
              codSolicitud: solicitud.CODSOLICITUD,
              codUsuario: codigo,
            },
          });
          setObtenerFotos(false);
          console.log(response.data.images); // Verifica que las imágenes sean correctas
          setImagenes(response.data.images);
        } catch (error) {
          console.error("Error al obtener las imágenes:", error);
        }
      }
    };
    if (!obtenido && participantes && !admin) {
      
      const nuevoElemento = {
        PERTENECE: solicitud.casa_campañas[0]?.CODCASACAMPANA, // Puedes cambiar este valor dinámicamente
        NOMBREMIEMBRO: solicitud.casa_campañas[0]?.NOMBREENCARGADO, // También puedes modificarlo según necesidad
        ROL: "Responsable casa de campaña",
      };
      setListaDirectivaAñadidos([...listaDirectivaAñadidos, nuevoElemento]);

      axios
        .get(url + "obtenerMiembrosAgregados/" + solicitud.CODSOLICITUD)
        .then((reponse) => {
          if (reponse.data.length <= 0) {
            setlistaDirectiva(directivaInicial);
            setListaMiembros(miembrosInicial);
            setListaMiembrosOtra(miembrosInicialOtra);
            setObtenido(true);
          } else {
            setParticipantes(false);
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Ya agrego anteriormente.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
    if (!obtenido && participantes && admin) {
      axios
        .get(url + "obtenerMiembrosAgregados/" + solicitud.CODSOLICITUD)
        .then((response) => {
          const añadidos = [];
          const añadidosOtro = [];
          response.data.map((miembro) => {
            if (
              miembro.PERTENECE === solicitud.casa_campañas[0]?.CODCASACAMPANA
            ) {
              añadidos.push({
                NOMBREMIEMBRO: miembro.NOMBREPARTICIPANTE,
                PERTENECE: miembro.PERTENECE,
                ROL: miembro.ROL,
              });
            } else {
              añadidosOtro.push({
                NOMBREMIEMBRO: miembro.NOMBREPARTICIPANTE,
                PERTENECE: miembro.PERTENECE,
                ROL: miembro.ROL,
              });
            }
          });
          setMiembrosAñadidos(añadidos);
          setMiembrosAñadidosOtra(añadidosOtro);
        });
    }
    console.log(solicitud);
    obtenerImagenes();
  }, [fotos, obtenerFotos, participantes]);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // 'image' es el nombre del archivo en la solicitud
    formData.append("codSolicitud", solicitud.CODSOLICITUD); // Enviar el CODSOLICITUD
    formData.append("codUsuario", codigo); // Enviar el CODUSUARIO
    try {
      const response = await axios.post(url + "subirImagen", formData);
      setObtenerFotos(true);
      setSelectedFile(null);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Imagen agregada.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen.");
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (url) => {
    if (selectedImage === url) {
      setSelectedImage(null); // Cerrar imagen si ya está seleccionada
    } else {
      setSelectedImage(url); // Seleccionar imagen
    }
  };
  const [miembro, setMiembro] = useState({ campo: "", valido: null });
  const [miembroOtra, setMiembroOtra] = useState({ campo: "", valido: null });
  const [directiva, setDirectiva] = useState({ campo: "", valido: null });

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
  const [listaMiembros, setListaMiembros] = useState([]);

  const [miembrosAñadidosOtra, setMiembrosAñadidosOtra] = useState([]);
  const [listaMiembrosOtra, setListaMiembrosOtra] = useState([]);

  const [miembrosAñadidos, setMiembrosAñadidos] = useState([]);
  const [listaDirectivaAñadidos, setListaDirectivaAñadidos] = useState([]);

  const agregarDirectiva = () => {
    if (directiva.campo !== "") {
      const existe = listaDirectivaAñadidos.some(
        (item) => item.ROL === directiva.campo
      );
      if (existe) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Miembro de directiva añadido.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const nuevoElemento = {
          PERTENECE: solicitud.casa_campañas[0]?.CODCASACAMPANA, // Puedes cambiar este valor dinámicamente
          NOMBREMIEMBRO: directiva.texto, // También puedes modificarlo según necesidad
          ROL: directiva.campo,
        };
        setListaDirectivaAñadidos([...listaDirectivaAñadidos, nuevoElemento]);
      }
      setDirectiva({ campo: "", valido: null });
    } else {
      alert("Selecciona un miembro.");
    }
  };
  const eliminarDirectiva = (nombreMiembro) => {
    setListaDirectivaAñadidos(
      listaDirectivaAñadidos.filter(
        (item) => item.NOMBREMIEMBRO !== nombreMiembro
      )
    );
  };
  const agregarMiembro = () => {
    if (miembro.campo !== "") {
      // Buscar el miembro en listaMiembrosOtra para obtener su información completa
      const miembroSeleccionado = listaMiembros.find(
        (item) => item.NOMBREMIEMBRO === miembro.campo
      );

      if (!miembroSeleccionado) {
        alert("Miembro no encontrado en la lista.");
        return;
      }

      // Filtrar la lista para eliminar el miembro seleccionado
      const nuevaLista = listaMiembros.filter(
        (item) => item.NOMBREMIEMBRO !== miembro.campo
      );
      setListaMiembros(nuevaLista);

      // Agregar el miembro a la lista de miembros añadidos con todos sus datos
      setMiembrosAñadidos((prev) => [
        ...prev,
        {
          NOMBREMIEMBRO: miembroSeleccionado.NOMBREMIEMBRO,
          PERTENECE: miembroSeleccionado.CODCASACAMPANA,
          ROL : miembroSeleccionado.CARGO
        },
      ]);

      // Resetear el input
      setMiembro({ campo: "", texto: "" });
    } else {
      alert("Selecciona un miembro.");
    }
  };
  const eliminarMaterial = (nombreMiembro) => {
    // Filtramos los miembros añadidos para eliminar el seleccionado
    const nuevosMiembrosAñadidos = miembrosAñadidos.filter(
      (miembro) => miembro.NOMBREMIEMBRO !== nombreMiembro
    );
    setMiembrosAñadidos(nuevosMiembrosAñadidos);

    // Buscamos el miembro en `miembrosInicial` para restaurarlo a `listaMiembros`
    const miembroRestaurado = miembrosInicial.find(
      (miembro) => miembro.NOMBREMIEMBRO === nombreMiembro
    );

    // Si el miembro existe en la lista inicial, lo agregamos de vuelta a `listaMiembros`
    if (miembroRestaurado) {
      setListaMiembros((prev) => [...prev, miembroRestaurado]);
    }
  };
  const agregarMiembroOtra = () => {
    if (miembroOtra.campo !== "") {
      // Buscar el miembro en listaMiembrosOtra para obtener su información completa
      const miembroSeleccionado = listaMiembrosOtra.find(
        (item) => item.NOMBREMIEMBRO === miembroOtra.campo
      );

      if (!miembroSeleccionado) {
        alert("Miembro no encontrado en la lista.");
        return;
      }

      // Filtrar la lista para eliminar el miembro seleccionado
      const nuevaLista = listaMiembrosOtra.filter(
        (item) => item.NOMBREMIEMBRO !== miembroOtra.campo
      );
      setListaMiembrosOtra(nuevaLista);

      // Agregar el miembro a la lista de miembros añadidos con todos sus datos
      setMiembrosAñadidosOtra((prev) => [
        ...prev,
        {
          NOMBREMIEMBRO: miembroSeleccionado.NOMBREMIEMBRO,
          PERTENECE: miembroSeleccionado.CODCASACAMPANA,
          ROL : miembroSeleccionado.CARGO
        },
      ]);

      // Resetear el input
      setMiembroOtra({ campo: "", texto: "" });
    } else {
      alert("Selecciona un miembro.");
    }
  };

  const eliminarMaterialOtra = (nombreMiembro) => {
    // Filtrar los miembros añadidos para eliminar el seleccionado
    const nuevosMiembrosAñadidos = miembrosAñadidosOtra.filter(
      (miembro) => miembro.NOMBREMIEMBRO !== nombreMiembro
    );
    setMiembrosAñadidosOtra(nuevosMiembrosAñadidos);

    // Buscar el miembro eliminado en la lista de añadidos
    const miembroRestaurado = miembrosAñadidosOtra.find(
      (miembro) => miembro.NOMBREMIEMBRO === nombreMiembro
    );

    // Si el miembro existe, restaurarlo a la lista original
    if (miembroRestaurado) {
      setListaMiembrosOtra((prev) => [...prev, miembroRestaurado]);
    }
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
  const subirLista = () => {
    const data = {
      miembrosAñadidos,
      miembrosAñadidosOtra,
      listaDirectivaAñadidos,
      CODSOLICITUD: solicitud.CODSOLICITUD,
    };
    axios.post(url + "subirLista", data).then((response) => {
      setParticipantes(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Lista subida con exito.",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <Titulo>INFORMACIÓN DE SOLICITUD</Titulo>
            </EncabezadoModal>
            <BotonCerrar
              onClick={() => {
                if (fotos) {
                  setFotos(false);
                } else {
                  if (participantes) {
                    setObtenido(false);
                    setParticipantes(false);
                  } else {
                    setObtenido(false);
                    cambiarEstado(false);
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </BotonCerrar>
            <DetalleUsuario fotos={fotos}>
              {!fotos && !logistica && !redes && !participantes && (
                <>
                  <Seccion>
                    <LetraInformacion>Codigo:</LetraInformacion>
                    <Letra>{solicitud.CODSOLICITUD}</Letra>
                    <LetraInformacion>Fecha solicitada:</LetraInformacion>
                    <Letra>{solicitud.FECHASOLICITADA}</Letra>
                    <LetraInformacion>Fecha del evento:</LetraInformacion>
                    <Letra>{solicitud.FECHAPROGRAMADA}</Letra>
                    <LetraInformacion>Casa de campaña:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CODCASACAMPANA}</Letra>
                    <LetraInformacion>Nombre encargado:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.NOMBREENCARGADO}</Letra>
                    <LetraInformacion>Dirección:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.DIRECCION}</Letra>
                    <LetraInformacion>Celular:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CELULARCASA}</Letra>
                    <LetraInformacion>Correo:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CORREOCASA}</Letra>
                    {solicitud.CODADMINISTRADOR !== null && (
                      <>
                        <LetraInformacion>Creado por:</LetraInformacion>
                        <Letra>{solicitud.CODADMINISTRADOR}</Letra>
                      </>
                    )}
                  </Seccion>
                  <Seccion>
                    <LetraInformacion>Estado:</LetraInformacion>
                    <Letra>{solicitud.ESTADO}</Letra>
                    <LetraInformacion>Tipo de evento:</LetraInformacion>
                    <Letra>{solicitud.TIPOEVENTO}</Letra>
                    <LetraInformacion>Hora del evento:</LetraInformacion>
                    <Letra>{solicitud.HORAEVENTO?.slice(0, 5)}</Letra>
                    <LetraInformacion>Ubicación:</LetraInformacion>
                    <Letra>
                      <Link
                        href={solicitud.UBICACIONEVENTO}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {solicitud.UBICACIONEVENTO}
                      </Link>
                    </Letra>
                    <LetraInformacion>Descripción:</LetraInformacion>
                    <Letra>{solicitud.DESCRIPCION}</Letra>
                    <LetraInformacion>
                      Materiales:{" "}
                      {solicitud.materiales.map((material) => {
                        return (
                          <ContainerLetra>
                            <Letra> - {material.CANTIDADPEDIDA}</Letra>
                            <Letra>{material.MATERIALPEDIDO}</Letra>
                          </ContainerLetra>
                        );
                      })}
                    </LetraInformacion>
                    {solicitud.ESTADO === "Aceptado" && (
                      <>
                        <LetraInformacion>Aceptado por:</LetraInformacion>
                        <Letra>{solicitud.nombreAdministrador}</Letra>
                        <Letra>{solicitud.celularAdministrador}</Letra>
                        <Letra>{solicitud.FECHAAPROBADA}</Letra>
                        <LetraInformacion>
                          Encargado logistica:
                        </LetraInformacion>
                        <Letra>{solicitud.encargadoLogistica}</Letra>
                        <Letra>{solicitud.celularLogistica}</Letra>
                        <LetraInformacion>Encargado redes:</LetraInformacion>
                        <Letra>{solicitud.encargadoRedes}</Letra>
                        <Letra>{solicitud.celularRedes}</Letra>
                      </>
                    )}
                    {solicitud.ESTADO === "Rechazado" && (
                      <>
                        <LetraInformacion>Rechazado por:</LetraInformacion>
                        <Letra>{solicitud.nombreAdministrador}</Letra>
                        <Letra>{solicitud.celularAdministrador}</Letra>
                        <Letra>{solicitud.FECHAAPROBADA}</Letra>
                        <LetraInformacion>Observacion:</LetraInformacion>
                        <Letra>{solicitud.OBSERVACIONES}</Letra>
                      </>
                    )}
                  </Seccion>
                </>
              )}
              {fotos && !participantes && (
                <>
                  {admin && (
                    <ContainerFotos admin>
                      {Object.keys(imagenes).length > 0 ? (
                        Object.keys(imagenes).map((key, index) => (
                          <ContainerUsuario key={index}>
                            <TituloUsuario>{key}</TituloUsuario>
                            <FotosGrid>
                              {imagenes[key].map((url, idx) => (
                                <ContainerFoto
                                  key={idx}
                                  selected={selectedImage === url} // Marca la imagen seleccionada
                                  src={url}
                                  onClick={() => handleImageClick(url)} // Maneja el clic en la imagen
                                />
                              ))}
                            </FotosGrid>
                          </ContainerUsuario>
                        ))
                      ) : (
                        <p>No hay imágenes disponibles.</p>
                      )}
                    </ContainerFotos>
                  )}

                  {!admin && (
                    <>
                      <ContainerBoton subir>
                        <BotonSubir type="file" onChange={handleFileChange} />
                        <BotonAñadir onClick={handleUpload}>
                          {redes ? "Subir Imagen/Video" : "Subir Imagen"}
                        </BotonAñadir>
                      </ContainerBoton>
                      <ContainerFotos>
                        {imagenes.map((url, index) => {
                          const esVideo =
                            url.endsWith(".mp4") ||
                            url.endsWith(".webm") ||
                            url.endsWith(".ogg");
                          return esVideo ? (
                            <ContainerVideo key={index} controls>
                              <source src={url} type="video/mp4" />
                              Tu navegador no soporta la reproducción de video.
                            </ContainerVideo>
                          ) : (     
                            <ContainerFoto key={index} src={url} alt="Imagen" />
                          );
                        })}
                      </ContainerFotos>
                    </>
                  )}
                </>
              )}
              {logistica && !fotos && !participantes && (
                <>
                  <Seccion>
                    <LetraInformacion>Codigo:</LetraInformacion>
                    <Letra>{solicitud.CODSOLICITUD}</Letra>
                    <LetraInformacion>Fecha solicitada:</LetraInformacion>
                    <Letra>{solicitud.FECHASOLICITADA}</Letra>
                    <LetraInformacion>Fecha programada:</LetraInformacion>
                    <Letra>{solicitud.FECHAPROGRAMADA}</Letra>
                    <LetraInformacion>Casa de campaña:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CODCASACAMPANA}</Letra>
                    <LetraInformacion>Nombre encargado:</LetraInformacion>
                    <Letra>
                      {solicitud.casa_campañas[0]?.NOMBREENCARGADO ||
                        solicitud.CasaCampañas[0]?.NOMBREENCARGADO}
                    </Letra>
                    <LetraInformacion>Dirección:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.DIRECCION}</Letra>
                    <LetraInformacion>Celular:</LetraInformacion>
                    <Letra>
                      {solicitud.casa_campañas[0]?.CELULARCASA ||
                        solicitud.CasaCampañas[0]?.CELULARCASA}
                    </Letra>
                    <LetraInformacion>Correo:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CORREOCASA}</Letra>
                    {solicitud.CODADMINISTRADOR !== null && (
                      <>
                        <LetraInformacion>Creado por:</LetraInformacion>
                        <Letra>{solicitud.CODADMINISTRADOR}</Letra>
                      </>
                    )}
                  </Seccion>
                  <Seccion>
                    <LetraInformacion>Estado:</LetraInformacion>
                    <Letra>{solicitud.ESTADO}</Letra>
                    <LetraInformacion>Tipo de evento:</LetraInformacion>
                    <Letra>{solicitud.TIPOEVENTO}</Letra>
                    <LetraInformacion>Hora del evento:</LetraInformacion>
                    <Letra>{solicitud.HORAEVENTO?.slice(0, 5)}</Letra>
                    <LetraInformacion>Ubicación:</LetraInformacion>
                    <Letra>
                      <Link
                        href={solicitud.UBICACIONEVENTO}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {solicitud.UBICACIONEVENTO}
                      </Link>
                    </Letra>
                    <LetraInformacion>Descripción:</LetraInformacion>
                    <Letra>{solicitud.DESCRIPCION}</Letra>
                    <LetraInformacion>
                      Materiales:{" "}
                      {solicitud.materiales.map((material) => {
                        return (
                          <ContainerLetra>
                            <Letra> - {material.CANTIDADPEDIDA}</Letra>
                            <Letra>{material.MATERIALPEDIDO}</Letra>
                          </ContainerLetra>
                        );
                      })}
                    </LetraInformacion>
                    <LetraInformacion>Aceptado por:</LetraInformacion>
                    <Letra>{solicitud.NOMBREADMINISTRADOR}</Letra>
                    <Letra>{solicitud.CELULARADMINISTRADOR}</Letra>
                    <Letra>{solicitud.FECHAAPROBADA}</Letra>
                  </Seccion>
                </>
              )}
              {redes && !fotos && !participantes && (
                <>
                  <Seccion>
                    <LetraInformacion>Codigo:</LetraInformacion>
                    <Letra>{solicitud.CODSOLICITUD}</Letra>
                    <LetraInformacion>Fecha solicitada:</LetraInformacion>
                    <Letra>{solicitud.FECHASOLICITADA}</Letra>
                    <LetraInformacion>Fecha programada:</LetraInformacion>
                    <Letra>{solicitud.FECHAPROGRAMADA}</Letra>
                    <LetraInformacion>Casa de campaña:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CODCASACAMPANA}</Letra>
                    <LetraInformacion>Nombre encargado:</LetraInformacion>
                    <Letra>
                      {solicitud.casa_campañas[0]?.NOMBREENCARGADO ||
                        solicitud.CasaCampañas[0]?.NOMBREENCARGADO}
                    </Letra>
                    <LetraInformacion>Dirección:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.DIRECCION}</Letra>
                    <LetraInformacion>Celular:</LetraInformacion>
                    <Letra>
                      {solicitud.casa_campañas[0]?.CELULARCASA ||
                        solicitud.CasaCampañas[0]?.CELULARCASA}
                    </Letra>
                    <LetraInformacion>Correo:</LetraInformacion>
                    <Letra>{solicitud.casa_campañas[0]?.CORREOCASA}</Letra>
                    {solicitud.CODADMINISTRADOR !== null && (
                      <>
                        <LetraInformacion>Creado por:</LetraInformacion>
                        <Letra>{solicitud.CODADMINISTRADOR}</Letra>
                      </>
                    )}
                  </Seccion>
                  <Seccion>
                    <LetraInformacion>Estado:</LetraInformacion>
                    <Letra>{solicitud.ESTADO}</Letra>
                    <LetraInformacion>Tipo de evento:</LetraInformacion>
                    <Letra>{solicitud.TIPOEVENTO}</Letra>
                    <LetraInformacion>Hora del evento:</LetraInformacion>
                    <Letra>{solicitud.HORAEVENTO?.slice(0, 5)}</Letra>
                    <LetraInformacion>Ubicación:</LetraInformacion>
                    <Letra>
                      <Link
                        href={solicitud.UBICACIONEVENTO}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {solicitud.UBICACIONEVENTO}
                      </Link>
                    </Letra>
                    <LetraInformacion>Descripción:</LetraInformacion>
                    <Letra>{solicitud.DESCRIPCION}</Letra>
                    <LetraInformacion>
                      Materiales:{" "}
                      {solicitud.materiales.map((material) => {
                        return (
                          <ContainerLetra>
                            <Letra> - {material.CANTIDADPEDIDA}</Letra>
                            <Letra>{material.MATERIALPEDIDO}</Letra>
                          </ContainerLetra>
                        );
                      })}
                    </LetraInformacion>
                    <LetraInformacion>Aceptado por:</LetraInformacion>
                    <Letra>{solicitud.NOMBREADMINISTRADOR}</Letra>
                    <Letra>{solicitud.CELULARADMINISTRADOR}</Letra>
                    <Letra>{solicitud.FECHAAPROBADA}</Letra>
                  </Seccion>
                </>
              )}
              {participantes && !fotos && !admin && (
                <Seccion completo>
                  <TextBox>Directiva casa de campaña</TextBox>
                  <ContainerMateriales>
                    <Input
                      estado={directiva}
                      cambiarEstado={setDirectiva}
                      label={"Directiva:"}
                      placeholder={"Directiva"}
                      name={"Directiva"}
                      expresionRegular={expresiones.nombre}
                      tipo={"select"}
                      editable={true}
                      select={true}
                      listaMateriales={listaDirectiva}
                      directiva
                    />
                    <IconBuscar
                      añadirMaterial
                      icon={faAdd}
                      onClick={agregarDirectiva}
                    />
                  </ContainerMateriales>
                  {listaDirectivaAñadidos.length > 0 && (
                    <ContainerListaMateriales>
                      <TextBox>Miembros:</TextBox>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={titulos}>
                              Nº
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              NOMBRE
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              CASA CAMPAÑA
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ROL
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ACCIÓN
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listaDirectivaAñadidos.map((miembro, index) => (
                            <TableRow>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.NOMBREMIEMBRO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.PERTENECE}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.ROL}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                <ContainerImgIcon
                                  onClick={() =>
                                    eliminarDirectiva(miembro.NOMBREMIEMBRO)
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
                  <TextBox>Participantes casa de campaña</TextBox>
                  <ContainerMateriales>
                    <Input
                      estado={miembro}
                      cambiarEstado={setMiembro}
                      label={"Miembro:"}
                      placeholder={"Miembro"}
                      name={"Miembro"}
                      expresionRegular={expresiones.nombre}
                      tipo={"select"}
                      editable={true}
                      select={true}
                      listaMateriales={listaMiembros}
                      casa
                    />
                    <IconBuscar
                      añadirMaterial
                      icon={faAdd}
                      onClick={agregarMiembro}
                    />
                  </ContainerMateriales>
                  {miembrosAñadidos.length > 0 && (
                    <ContainerListaMateriales>
                      <TextBox>Miembros:</TextBox>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={titulos}>
                              Nº
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              NOMBRE
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              CASA CAMPAÑA
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ROL
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ACCIÓN
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {miembrosAñadidos.map((miembro, index) => (
                            <TableRow>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.NOMBREMIEMBRO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.PERTENECE}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.ROL}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                <ContainerImgIcon
                                  onClick={() =>
                                    eliminarMaterial(miembro.NOMBREMIEMBRO)
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
                  <TextBox>Participantes de otras casas de camapaña</TextBox>
                  <ContainerMateriales>
                    <Input
                      estado={miembroOtra}
                      cambiarEstado={setMiembroOtra}
                      label={"Miembro:"}
                      placeholder={"Miembro"}
                      name={"Miembro"}
                      expresionRegular={expresiones.nombre}
                      tipo={"select"}
                      editable={true}
                      select={true}
                      listaMateriales={listaMiembrosOtra}
                      casa
                    />
                    <IconBuscar
                      añadirMaterial
                      icon={faAdd}
                      onClick={agregarMiembroOtra}
                    />
                  </ContainerMateriales>
                  {miembrosAñadidosOtra.length > 0 && (
                    <ContainerListaMateriales>
                      <TextBox>Miembros:</TextBox>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={titulos}>
                              Nº
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              NOMBRE
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              CASA CAMPAÑA
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ROL
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ACCIÓN
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {miembrosAñadidosOtra.map((miembro, index) => (
                            <TableRow key={index}>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.NOMBREMIEMBRO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.PERTENECE}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.ROL}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                <ContainerImgIcon
                                  onClick={() =>
                                    eliminarMaterialOtra(miembro.NOMBREMIEMBRO)
                                  }
                                >
                                  <ImgIconEliminar icon={faTrash} />
                                </ContainerImgIcon>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ContainerListaMateriales>
                  )}
                  <ContainerBoton>
                    <BotonAñadir asignar onClick={subirLista}>
                      Subir lista
                    </BotonAñadir>
                  </ContainerBoton>
                </Seccion>
              )}
              {participantes && !fotos && admin && (
                <Seccion completo>
                  <TextBox>Participantes casa de campaña</TextBox>
                  {miembrosAñadidos.length > 0 && (
                    <ContainerListaMateriales>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={titulos}>
                              Nº
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              NOMBRE
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              CASA CAMPAÑA
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ROL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {miembrosAñadidos.map((miembro, index) => (
                            <TableRow>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.NOMBREMIEMBRO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.PERTENECE}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.ROL}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ContainerListaMateriales>
                  )}
                  <TextBox espacio>
                    Participantes de otras casas de campañas
                  </TextBox>
                  {miembrosAñadidosOtra.length > 0 && (
                    <ContainerListaMateriales>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={titulos}>
                              Nº
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              NOMBRE
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              CASA CAMPAÑA
                            </TableCell>
                            <TableCell align="center" sx={titulos}>
                              ROL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {miembrosAñadidosOtra.map((miembro, index) => (
                            <TableRow key={index}>
                              <TableCell align="center" sx={celdas}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.NOMBREMIEMBRO}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.PERTENECE}
                              </TableCell>
                              <TableCell align="center" sx={celdas}>
                                {miembro.ROL}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ContainerListaMateriales>
                  )}
                </Seccion>
              )}
            </DetalleUsuario>
            {!fotos && !participantes && solicitud.ESTADO === "Aceptado" && (
              <>
                <ContainerBoton>
                  <BotonAñadir
                    asignar
                    onClick={() => {
                      setFotos(true);
                    }}
                  >
                    {admin ? "Ver fotos" : "Subir fotos"}
                  </BotonAñadir>
                </ContainerBoton>
                {!logistica && !redes && (
                  <ContainerBoton>
                    <BotonAñadir
                      asignar
                      onClick={() => {
                        setParticipantes(true);
                      }}
                    >
                      {admin ? "Ver participantes" : "Agregar participantes"}
                    </BotonAñadir>
                  </ContainerBoton>
                )}
              </>
            )}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
}
