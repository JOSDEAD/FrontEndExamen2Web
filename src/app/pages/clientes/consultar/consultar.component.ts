import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';

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
  opciones = ['Cedula', 'Nombre'];
  //Opcion por default.
  opcionSeleccionada: any = 'Cedula';
  private datosCliente: Cliente[];

  constructor(private modalService: NgbModal, private clientesService: ClientesService, private modalConfirmacionService: ModalConfirmacionService, private toasterManagerService: ToasterManagerService) { }



  //Obtiene la lista de los clientes existentes.
  getClientes(): void {
    this.clientesService.consultarClientes()
      .subscribe(res => this.datosCliente = res['clientes']);
  }

  ngOnInit() {
    this.getClientes();
  }


  //Abrir modal, para insertar o para modificar.
  abrirModal(Cliente: Cliente) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.datosCliente = this.datosCliente;
    modalRef.componentInstance.cliente = Cliente;
  }


  // Al dar clic al boton de eliminar.
  borrarCliente(cliente: Cliente) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el cliente ' + cliente.nombreCompleto + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosCliente.findIndex(
            (client: Cliente) => {
              return client.cedula === cliente.cedula;
            },
          );
          this.clientesService.borrarCliente(cliente.id).subscribe(
            () => {
              this.datosCliente.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Eliminar',
                  'Cliente eliminado')
            },
            error => {
              this.toasterManagerService.makeToast('error', '¡No se completo el eliminar!',
                'No se ha eliminado el cliente debido a un error con el servidor.')
            },
          );
        }
      })
  }

}
