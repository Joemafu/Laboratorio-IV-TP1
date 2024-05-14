import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    { 
        path: 'test', redirectTo: 'home', 
    },
    { 
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { 
        // Lazy Loading
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
    },
    {
        // Lazy Loading
        path: 'quien-soy',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent),    
    },
    {
        // Lazy Loading 
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
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
    },
    {
        // Lazy Loading
        path: 'mayor-menor',
        loadComponent: () => import('./components/mayor-menor/mayor-menor.component').then(c => c.MayorMenorComponent),
    },
    {
        // Lazy Loading
        path: 'preguntados',
        loadComponent: () => import('./components/preguntados/preguntados.component').then(c => c.PreguntadosComponent),
    },
    {
        // Lazy Loading
        path: 'ahorcado',
        loadComponent: () => import('./components/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
    },
    {
        // Lazy Loading
        path: 'sitio-en-construccion',
        loadComponent: () => import('./components/sitio-en-construccion/sitio-en-construccion.component').then(c => c.SitioEnConstruccionComponent),
    },
    {
        // Lazy Loading
        path: 'chat',
        loadComponent: () => import('./components/chat/chat.component').then(c => c.ChatComponent),
    },
    { 
        path: '**', redirectTo: 'error'
    }
];
