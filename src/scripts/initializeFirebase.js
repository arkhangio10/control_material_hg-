// Script para inicializar las colecciones en Firebase
// Guardar como src/scripts/initializeFirebase.js

import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {

};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Función para crear colecciones y documentos iniciales
async function initializeFirebaseCollections() {
  try {
    console.log("Iniciando creación de colecciones...");
    
    // 1. Crear usuario administrador
    const adminEmail = "admin@sistema.com";
    const adminPassword = "Admin123!"; // Cambiar después de la inicialización
    
    let adminUid;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      adminUid = userCredential.user.uid;
      console.log("Usuario administrador creado:", adminUid);
    } catch (error) {
      console.log("El administrador ya existe o hubo un error:", error.message);
      console.log("Continuando con la inicialización...");
      // Aquí podrías implementar lógica para obtener el UID si el usuario ya existe
      adminUid = "admin-uid-placeholder"; // Reemplazar con un UID real si el usuario ya existe
    }
    
    // 2. Crear documento de usuario administrador
    await setDoc(doc(db, "usuarios", adminUid), {
      uid: adminUid,
      username: "admin",
      nombreCompleto: "Administrador Sistema",
      email: adminEmail,
      rol: "admin",
      telefono: "",
      estado: "activo",
      ultimoAcceso: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Documento de usuario administrador creado");
    
    // 3. Crear colecciones vacías (estructura básica)
    const colecciones = [
      "trabajadores",
      "codigosQR",
      "proyectos",
      "materiales",
      "movimientos",
      "asignacionesEquipos",
      "proveedores",
      "inventarioHistorico",
      "mantenimientoEquipos"
    ];
    
    for (const coleccion of colecciones) {
      // Crear un documento dummy que luego borraremos
      // Esto asegura que la colección existe en Firestore
      const dummyDocRef = doc(collection(db, coleccion));
      await setDoc(dummyDocRef, {
        _dummy: true,
        _info: `Documento temporal para crear la colección ${coleccion}`,
        createdAt: serverTimestamp()
      });
      console.log(`Colección "${coleccion}" creada`);
      
      // Opcional: borrar inmediatamente el documento dummy
      // await deleteDoc(dummyDocRef);
      // console.log(`Documento dummy en "${coleccion}" eliminado`);
    }
    
    // 4. Crear datos de ejemplo (opcional)
    // Proyecto de ejemplo
    const proyectoId = "PROY001";
    await setDoc(doc(db, "proyectos", proyectoId), {
      id: proyectoId,
      nombre: "Construcción Edificio Central",
      descripcion: "Proyecto de construcción del edificio principal de oficinas",
      ubicacion: "Av. Principal 123",
      fechaInicio: serverTimestamp(),
      fechaFinEstimada: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      fechaFinReal: null,
      estado: "activo",
      presupuestoMateriales: 50000,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Proyecto de ejemplo creado");
    
    // Proveedor de ejemplo
    const proveedorId = "PROV001";
    await setDoc(doc(db, "proveedores", proveedorId), {
      id: proveedorId,
      nombreEmpresa: "Materiales Constructora S.A.",
      contactoNombre: "Juan Pérez",
      telefono: "123456789",
      email: "contacto@materialesconstructora.com",
      direccion: "Calle Industrial 456",
      rucNit: "20123456789",
      estado: "activo",
      creditoLimite: 10000,
      diasCredito: 30,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Proveedor de ejemplo creado");
    
    // Material de ejemplo
    const materialId = "MAT001";
    await setDoc(doc(db, "materiales", materialId), {
      id: materialId,
      nombre: "Cemento Portland",
      descripcion: "Cemento tipo Portland para construcción general",
      tipo: "consumible",
      unidad: "kg",
      stockActual: 1000,
      stockMinimo: 200,
      precioUnitario: 25.50,
      proveedorId: proveedorId,
      ubicacionAlmacen: "Estante A-1",
      estado: "disponible",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Material de ejemplo creado");
    
    // Trabajador de ejemplo
    const trabajadorId = "12345678901234"; // DNI + 4 dígitos aleatorios
    await setDoc(doc(db, "trabajadores", trabajadorId), {
      id: trabajadorId,
      nombre: "Carlos",
      apellido: "Rodríguez",
      posicion: "Albañil",
      telefono: "987654321",
      email: "carlos@ejemplo.com",
      cedula: "12345678",
      fechaIngreso: serverTimestamp(),
      estado: "activo",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Trabajador de ejemplo creado");
    
    // Código QR de ejemplo
    const codigoQR = `QR-${trabajadorId}`;
    await setDoc(doc(db, "codigosQR", codigoQR), {
      codigo: codigoQR,
      trabajadorId: trabajadorId,
      fechaGeneracion: serverTimestamp(),
      fechaActivacion: serverTimestamp(),
      estado: "activo",
      motivoDesactivacion: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Código QR de ejemplo creado");
    
    console.log("¡Inicialización completada con éxito!");
    return { success: true, message: "Todas las colecciones fueron creadas exitosamente" };
  } catch (error) {
    console.error("Error durante la inicialización:", error);
    return { success: false, error: error.message };
  }
}

// Ejecutar la inicialización
initializeFirebaseCollections()
  .then((result) => {
    console.log("Resultado:", result);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error no controlado:", error);
    process.exit(1);
  });

// ------------------------------------
// Instrucciones para ejecutar el script
// ------------------------------------
// 1. Guarda este archivo como src/scripts/initializeFirebase.js
// 2. Reemplaza la configuración de Firebase con tus credenciales
// 3. Ejecuta el script con uno de estos métodos:

// Método 1: Usando Node con ES modules
// Añade "type": "module" a tu package.json
// Ejecuta: node src/scripts/initializeFirebase.js

// Método 2: Usando Babel-node
// Instala babel: npm install -D @babel/core @babel/node @babel/preset-env
// Ejecuta: npx babel-node src/scripts/initializeFirebase.js

// Método 3: Crear un comando npm
// Añade este script a tu package.json:
// "scripts": {
//   "init-firebase": "babel-node src/scripts/initializeFirebase.js"
// }
// Ejecuta: npm run init-firebase
