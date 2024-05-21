import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
    { 
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { 
        // Lazy Loading
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
        ...canActivate(() => redirectLoggedInToHome()),
    },
    {
        // Lazy Loading
        path: 'quien-soy',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading 
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading
        path: 'error',
        loadComponent: () => import('./components/error/error.component').then(c => c.ErrorComponent),
    },
    {
        // Lazy Loading
        path: 'registrar',
        loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent),
        ...canActivate(() => redirectLoggedInToHome()),
    },
    {
        // Lazy Loading
        path: 'mayor-menor',
        loadComponent: () => import('./components/mayor-menor/mayor-menor.component').then(c => c.MayorMenorComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading
        path: 'trivia',
        loadComponent: () => import('./components/trivia/trivia.component').then(c => c.TriviaComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading
        path: 'ahorcado',
        loadComponent: () => import('./components/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading
        path: 'trato-hecho',
        loadComponent: () => import('./components/trato-hecho/trato-hecho.component').then(c => c.TratoHechoComponent),
        ...canActivate(() => redirectUnauthorizedToLogin()),
    },
    {
        // Lazy Loading
        path: 'sitio-en-construccion',
        loadComponent: () => import('./components/sitio-en-construccion/sitio-en-construccion.component').then(c => c.SitioEnConstruccionComponent),
    },/* 
    {
        // Lazy Loading
        path: 'chat',
        loadComponent: () => import('./components/chat/chat.component').then(c => c.ChatComponent),
    }, */
    { 
        path: '**', redirectTo: 'error'
    }
];
