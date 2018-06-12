import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { Facturacion } from '../facturacion';
import { FacturacionService } from '../facturacion.service';

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
  opciones = ['Identificador', 'Cedula'];
  //Opcion por default.
  opcionSeleccionada: any = 'Identificador';
  private datosFacturacion: Facturacion[];

  constructor(private modalService: NgbModal, private facturacionService: FacturacionService, private modalConfirmacionService: ModalConfirmacionService, private toasterManagerService: ToasterManagerService) { }


  //Obtiene la lista de las facturas existentes.
  getFacturas(): void {
    this.facturacionService.consultarFacturas()
      .subscribe(res => this.datosFacturacion = res['facturas']);
  }

  ngOnInit() {
    this.getFacturas();
  }


  //Abrir modal, para insertar o para modificar.
  abrirModal(Facturacion: Facturacion) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.datosFacturacion = this.datosFacturacion;
    modalRef.componentInstance.facturacion = Facturacion;
  }


  // Al dar clic al boton de eliminar.
  borrarFactura(facturacion: Facturacion) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar la factura ' + facturacion.id + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosFacturacion.findIndex(
            (fact: Facturacion) => {
              return fact.id === facturacion.id;
            },
          );
          this.facturacionService.borrarFactura(facturacion.id).subscribe(
            () => {
              this.datosFacturacion.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Eliminar',
                  'Factura eliminada')
            },
            error => {
              this.toasterManagerService.makeToast('error', '¡No se completo el eliminar!',
                'No se ha eliminado la factura debido a un error con el servidor.')
            },
          );
        }
      })
  }

}
