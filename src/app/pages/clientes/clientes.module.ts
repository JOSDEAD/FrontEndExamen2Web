import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertarComponent } from './insertar/insertar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificarCedulaDirective } from './verificar-cedula.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroPipe } from './consultar/filtro.pipe';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesService } from './clientes.service';
import { ModalConfirmacionService } from '../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ModalConfirmacionComponent } from '../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { PagesModule } from '../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ClientesRoutingModule,
    PagesModule
  ],
  declarations: [InsertarComponent, ConsultarComponent, VerificarCedulaDirective, FiltroPipe, ClientesComponent],
  providers: [ToasterManagerService, ClientesService, ModalConfirmacionService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class ClientesModule { }
