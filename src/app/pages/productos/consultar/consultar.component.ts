import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { Producto } from '../producto';
import { ProductosService } from '../productos.service';

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
  opciones = ['Identificador', 'Nombre', 'Impuesto'];
  //Opcion por default.
  opcionSeleccionada: any = 'Identificador';
  private datosProducto: Producto[];

  constructor(private modalService: NgbModal, private productosService: ProductosService, private modalConfirmacionService: ModalConfirmacionService, private toasterManagerService: ToasterManagerService) { }


  //Obtiene la lista de los productos existentes.
  getProductos(): void {
    this.productosService.consultarProductos()
      .subscribe(res => this.datosProducto = res['productos']);
  }

  ngOnInit() {
    this.getProductos();
  }


  //Abrir modal, para insertar o para modificar.
  abrirModal(Producto: Producto) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.datosProducto = this.datosProducto;
    modalRef.componentInstance.producto = Producto;
  }


  // Al dar clic al boton de eliminar.
  borrarProducto(producto: Producto) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el cliente ' + producto.nombre + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosProducto.findIndex(
            (product: Producto) => {
              return product.identificador === producto.identificador;
            },
          );
          this.productosService.borrarProducto(producto.identificador).subscribe(
            () => {
              this.datosProducto.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Eliminar',
                  'Producto eliminado')
            },
            error => {
              this.toasterManagerService.makeToast('error', '¡No se completo el eliminar!',
                'No se ha eliminado el producto debido a un error con el servidor.')
            },
          );
        }
      })
  }

}
