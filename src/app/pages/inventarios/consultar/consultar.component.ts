import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { Inventario } from '../inventario';
import { InventariosService } from '../inventarios.service';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

import { ModalConfirmacionService } from '../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  config = configToasterManager;

  modalOption: NgbModalOptions = {}; // not null!
  //Opciones de busqueda.
  opciones = ['Identificador', 'Id.Producto', 'Nom.Producto'];
  //Opcion por default.
  opcionSeleccionada: any = 'Identificador';
  private datosInventario: Inventario[];


  constructor(private modalService: NgbModal, private inventariosService: InventariosService, private modalConfirmacionService: ModalConfirmacionService, private toasterManagerService: ToasterManagerService) { }


  //Obtiene la lista de los inventario existentes.
  getInventarios(): void {
    this.inventariosService.consultarInventarios()
      .subscribe(res => this.datosInventario = res['inventario']);
  }

  ngOnInit() {
    this.getInventarios();
  }


  //Abrir modal, para insertar o para modificar.
  abrirModal(Inventario: Inventario) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.datosInventario = this.datosInventario;
    modalRef.componentInstance.inventario = Inventario;
  }


  // Al dar clic al boton de eliminar.
  borrarProducto(inventario: Inventario) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el inventario ' + inventario.nombre + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosInventario.findIndex(
            (invent: Inventario) => {
              return invent.identificador === inventario.identificador;
            },
          );
          this.inventariosService.borrarInventario(inventario.id).subscribe(
            () => {
              this.datosInventario.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Eliminar',
                  'Inventario eliminado')
            },
            error => {
              this.toasterManagerService.makeToast('error', '¡No se completo el eliminar!',
                'No se ha eliminado el inventario debido a un error con el servidor.')
            },
          );
        }
      })
  }

}
