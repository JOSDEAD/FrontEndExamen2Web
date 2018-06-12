import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../producto'
import { ProductosService } from '../productos.service';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

import { COMPOSITION_BUFFER_MODE } from '@angular/forms';



@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {

  @Input() producto: Producto;
  @Input() datosProducto;

  private Productos;
  private titulo;
  private solicitudActual;

  config = configToasterManager;

  constructor(public activeModal: NgbActiveModal, private ProductosService: ProductosService,
    private toasterManagerService: ToasterManagerService) { }


  ngOnInit() {
    this.solicitudActual = new Producto();
    this.ProductosService.consultarProductos()
      .subscribe(res => this.Productos = res);
    //Si se inicia para insertar    
    if (this.producto == null) {
      this.solicitudActual = new Producto();
      this.titulo = 'Insertar Producto';
    }
    //Si se inicia para modificar o para ver los datos:
    else {
      this.titulo = 'Modificar Producto';
      Object.assign(this.solicitudActual, this.producto);
      //this.solicitudActual = JSON.parse(JSON.stringify(this.cliente));
    }

  }

  guardarDatos() {
    //Si se inicia para insertar    
    if (this.producto == null) {
      this.ProductosService.insertarProducto(this.solicitudActual).subscribe(
        producto => {
          this.datosProducto.push(producto["producto"])
          this.toasterManagerService.makeToast('success', 'Agregar', 'Producto agregado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el agregar! ',
            'No se ha agregado el producto debido a un error con el servidor.');
        },
      );
    }

    //Si se inicia para modificar    
    else {
      this.ProductosService.modificarProducto(this.solicitudActual).subscribe(
        producto => {
          this.producto.identificador = producto["producto"].identificador;
          this.producto.nombre = producto["producto"].nombre;
          this.producto.impuesto = producto["producto"].impuesto;
          this.producto.precio = producto["producto"].precio;
          this.toasterManagerService.makeToast('success', 'Modificar', 'Producto modificado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el modificar! ',
            'No se ha modificado el producto debido a un error con el servidor.');
        },
      );
    }
    this.activeModal.close();
  }

}
