import { Routes } from '@angular/router';

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
        path: '**', redirectTo: 'error'
    }
];
