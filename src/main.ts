import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';







/* 

PASO 1: Instalé firebase tools con este comando:

npm install -g firebase-tools

*/

// PASO 2: Metí este bloque (no estoy seguro de que vaya en este archivo) para inicializar firebase en mi proyecto

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbtVOsRUKuduPscMEvfIKj_2jPuISnfmY",
  authDomain: "saladejuegostp1laboiv.firebaseapp.com",
  projectId: "saladejuegostp1laboiv",
  storageBucket: "saladejuegostp1laboiv.appspot.com",
  messagingSenderId: "943509236202",
  appId: "1:943509236202:web:8303de901dd17f6ab62a93",
  measurementId: "G-2TKKC0MC7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* 

PASO 3: Instalé firebase CLI con este comando:

npm install firebase

*/

/* 

Paso 4: logeo con google con este comando

firebase login

*/

/* 

Paso 4: inicio el prosyecto con este comando

firebase init

*/

/* 

Paso 4: deployeo con este comando

firebase deploy

*/







bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
