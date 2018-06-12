import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'clientes',
      loadChildren: './clientes/clientes.module#ClientesModule',
    },
    {
      path: 'productos',
      loadChildren: './productos/productos.module#ProductosModule',
    },
    {
      path: 'inventarios',
      loadChildren: './inventarios/inventarios.module#InventariosModule',
    },
    {
      path: 'facturacion',
      loadChildren: './facturacion/facturacion.module#FacturacionModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
