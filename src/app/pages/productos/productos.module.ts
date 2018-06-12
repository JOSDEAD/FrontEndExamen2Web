import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { InsertarComponent } from './insertar/insertar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroPipe } from './consultar/filtro.pipe';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ProductosService } from './productos.service';
import { ModalConfirmacionService } from '../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ModalConfirmacionComponent } from '../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { PagesModule } from '../pages.module';
import { VerificarIdentificadorDirective } from './verificar-identificador.directive';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot(),
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProductosRoutingModule,
    PagesModule
  ],
  declarations: [InsertarComponent, ConsultarComponent, FiltroPipe, ProductosComponent, VerificarIdentificadorDirective],
  providers: [ToasterManagerService, ProductosService, ModalConfirmacionService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class ProductosModule { }
