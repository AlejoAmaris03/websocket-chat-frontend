import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/public-layout/public-layout'),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/public-layout/pages/home/home'),
                title: 'WebSocket | Home',
            },
            {
                path: 'chat',
                loadComponent: () => import('./features/public-layout/pages/chat/chat'),
                title: 'WebSocket | Chat'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: ''
            }
        ]
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
];
