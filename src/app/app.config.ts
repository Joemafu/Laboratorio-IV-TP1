import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"mesadejuegostp1laboiv","appId":"1:756127278108:web:046dc48a494de39318ebd9","storageBucket":"mesadejuegostp1laboiv.appspot.com","apiKey":"AIzaSyAygokkIT2187ttxiV02BiZv7JJP4JkAb0","authDomain":"mesadejuegostp1laboiv.firebaseapp.com","messagingSenderId":"756127278108"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"mesadejuegostp1laboiv","appId":"1:756127278108:web:046dc48a494de39318ebd9","storageBucket":"mesadejuegostp1laboiv.appspot.com","apiKey":"AIzaSyAygokkIT2187ttxiV02BiZv7JJP4JkAb0","authDomain":"mesadejuegostp1laboiv.firebaseapp.com","messagingSenderId":"756127278108"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))/*  ,
      importProvidersFrom(
        AngularFireModule.initializeApp(environment.development.firebaseConfig), 
    )*/
  ]
};
