import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ConsultarComponent } from './consultar/consultar.component';

const routes: Routes = [{
    path: '',
    component: ProductosComponent,
    children: [
        {
            path: 'consultar',
            component: ConsultarComponent,
        },
        // Add the next components here
    ],
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductosRoutingModule { }
