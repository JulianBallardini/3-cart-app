import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { Catalogo } from './components/catalogo/catalogo';

export const routes: Routes = [
    {path: '', redirectTo: '/catalogo', pathMatch: 'full'},
    { path: 'cart', component: Cart },
    { path: 'catalogo', component: Catalogo}
];
