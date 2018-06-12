import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { InsertarComponent } from './insertar/insertar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroPipe } from './consultar/filtro.pipe';
import { InventariosRoutingModule } from './inventarios-routing.module';
import { InventariosComponent } from './inventarios.component';
import { InventariosService } from './inventarios.service';
import { ModalConfirmacionService } from '../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ModalConfirmacionComponent } from '../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { PagesModule } from '../pages.module';
import { VerificarIdentificadorDirective } from './verificar-identificador.directive';
import { ThemeModule } from '../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot(),
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InventariosRoutingModule,
    NgSelectModule,
    PagesModule
  ],
  declarations: [InsertarComponent, ConsultarComponent, FiltroPipe, InventariosComponent, VerificarIdentificadorDirective],
  providers: [ToasterManagerService, InventariosService, ModalConfirmacionService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class InventariosModule { }
