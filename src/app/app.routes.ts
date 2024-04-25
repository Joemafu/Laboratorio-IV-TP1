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
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    },
    {
        // Lazy Loading
        path: 'quien-soy',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(m => m.QuienSoyComponent),    
    },
    {
        // Lazy Loading 
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    },
    { 
        path: '**', redirectTo: 'home'
    }
];
