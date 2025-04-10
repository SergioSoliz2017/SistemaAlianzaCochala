import {
  Document,
  Text,
  Page,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";

export default function PDF({ administrador }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 30,
    },
    container: {
      width: "100%",
      marginTop: 10,
      flexDirection: "row", // Para que los elementos estén en la misma línea
      backgroundColor: "red", // Color de fondo para el contenedor (solo para visualizar en el ejemplo)
      padding: 5, // Añadir algo de espacio alrededor
    },
    containerTitulo: {
      width: "100%",
      marginTop: "10px",
      display: "flex",
      textAlign: "center",
      backgroundColor: "red",
    },
  });
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.containerTitulo}>
          <Text style={styles.containerTitulo}>Informe</Text>
        </View>
        <View style={styles.container}>
          <Text>Nombre:</Text>
          <Text>{administrador.NOMBREADMINISTRADOR}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Codigo:</Text>
          <Text style={styles.valueText}>{administrador.CODADMINISTRADOR}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Cargo:</Text>
          <Text style={styles.valueText}>Administrador</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Celular:</Text>
          <Text style={styles.valueText}>
            {administrador.CELULARADMINISTRADOR}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Fecha:</Text>
          <Text style={styles.valueText}>
            {new Date().toISOString().split("T")[0]}
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.textLabel}>Imagen:</Text>
          <Image
            style={styles.image}
            src="http://localhost:8000/2025128FVD675/Logistica%20sergio/1738089804_Captura%20de%20pantalla%202025-01-10%20144516.png"
          />
        </View>
      </Page>
    </Document>
  );
}
