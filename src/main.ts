/* 

  Sprint 1 (Clase 02):
    - Armado del proyecto
    - Subido a heroku o firebase.
    - Componente de Login.
    - Componente Home.
    - Componente “Quién Soy”
      ● Datos personales del alumno.
      ● Imagen del alumno
      ● Explicación del juego propio
    - Favicon

  Sprint 2 (Clase 03)

    - Componente Home
      ● Tiene que ser el componente principal, el cual tendrá los accesos a los diferentes
      juegos y listados.
      ● Si el usuario está logueado, mostrar información del mismo y botón de Log Out. (No
      se debe mostrar los botones de Registro y Login una vez que el usuario está
      logueado)

    - Componente Login
      ● Tiene que tener la validación de usuario contra firebase
      ● Registrar el log de ese usuario en firebase.
        ○ En caso de que sea exitoso registrar:
          ■ Usuario
          ■ Fecha de ingreso
      ● En caso correcto deber rutear a la home
      ● Debe tener botones de acceso rápido.
        ○ Estos botones tienen que completar los campos de email y contraseña con
        un usuario válido que al presionar el botón ingresar acceda a la home.

    - Componente Registro
      ● Tiene que generar un nuevo usuario y redirigir al home al crearlo exitosamente, es
      decir, loguear al usuario automáticamente.
      ● Emitir mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)

  Sprint 3 (Clase 04)

    - Incorporar el chat
      ● Solamente usuarios logueados podrán acceder a la sala de chat.
        ○ Debemos marcar el usuario y hora que envió el mensaje

    - Incorporar módulos y loadchildren
    - Incorporar los juegos
      ● Ahorcado
        ○ No se debe ingresar datos desde el teclado. Utilizar botones para el
        ingreso de las letras.

      ● Mayor o Menor
        ○ Desde un mazo de carta se va a preguntar si la siguiente es mayor o menor.
        El jugador sumará un punto ante cada carta que adivine.

  Sprint 4 (Clase 05)
    - Agregar el juego Preguntados
      ● Tiene que obtener las imágenes de una api.
      ● Realizar el llamado a la api desde un Service.
      ● Dar al jugador opciones de elección. No se puede ingresar datos por teclado.
    - Juego propio
      ● Realizar juego propio.
        ○ Juegos que no se pueden utilizar
          ■ TATETI
          ■ MEMOTEST
          ■ PIEDRA PAPEL O TIJERA
      ● Agregar descripción de su juego en la sección “Quién soy”. Debe contar con
      información de qué juego es y cómo se juega.
        
*/

/* 

  TO DO:

  Sprint 2 (Clase 03)

    - Componente Login
      ● Registrar el log de ese usuario en firebase.
        ○ En caso de que sea exitoso registrar:
          ■ Usuario
          ■ Fecha de ingreso
        
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './environments/environment.development';

/* 

PASO 1: Instalé firebase tools con este comando:

npm install -g firebase-tools

*/

// PASO 2: Metí el bloque de configuración en ./environments/environment.development.ts

// Paso 3: Importé las funciones que necesito de firebase en ./main.ts (también se aplicaron en ./app/app.config.ts)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Paso 4: Inicialicé firebase en ./main.ts

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* 

PASO 5: Instalé firebase CLI con este comando:

npm install firebase

*/

/* 

Paso 6: logeo con google con este comando

firebase login

*/

/* 

Paso 7: inicio el proyecto con este comando

firebase init

*/

/* 

Paso 8: deployeo con este comando

firebase deploy

*/

/*

Paso 9 deployeo al hosting cada vez que hago avances con este comando.

npm run deploy

*/

/* 

Paso 10 agrego authentication, firestore, y cloud storage con este comando

ng add @angular/fire

*/


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));