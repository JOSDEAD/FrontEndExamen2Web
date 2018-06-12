import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventario } from '../inventario'
import { InventariosService } from '../inventarios.service';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { ProductosService } from '../../productos/productos.service';
import { Producto } from '../../productos/producto';

@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {

  @Input() inventario: Inventario;
  @Input() datosInventario;

  private Inventarios;
  private titulo;
  private solicitudActual;
  private productos;
  config = configToasterManager;
  private producto;
  placeholder: string = 'Buscar producto...';
  notFoundText: string = 'Producto no encontrado.';
  clearAllText: string = 'Limpiar';
  private gravadoe:boolean=false;
  constructor(public activeModal: NgbActiveModal, private productosService: ProductosService,private InventariosService: InventariosService,
    private toasterManagerService: ToasterManagerService) { }

    observerProductos = {
      // primero se obtienen los datos de funcionarios
      next: res => { this.productos = res['productos']},
      // en caso de error
      error: err => error => {
        this.toasterManagerService.makeToast('error', 'No se puede obtener productos! ',
          'No se puede obtener productos debido a un error con el servidor.');
      },
      /* cuando se obtengan los funcionarios para el select, si es modificar, se selecciona el funcionario,
       al que pertenece el usuario en el select*/
      complete: () => {
        if (this.inventario !== null) {
          this.productos.forEach(pro => {
            if (pro.identificador === this.inventario.identificadorProducto) {
              this.producto = pro;
            }
          });
        }
      },
    };

  ngOnInit() {
    this.solicitudActual = new Inventario();
    this.InventariosService.consultarInventarios()
      .subscribe(res => this.Inventarios = res);
    this.productosService.consultarProductos()
      .subscribe(this.observerProductos);
    //Si se inicia para insertar    
    if (this.inventario == null) {
      this.solicitudActual = new Inventario();
      this.titulo = 'Insertar Inventario';
    }
    //Si se inicia para modificar o para ver los datos:
    else {
      this.titulo = 'Modificar Inventario';
      //Object.assign(this.solicitudActual, this.inventario);
      this.solicitudActual = JSON.parse(JSON.stringify(this.inventario));
    }

  }
  busquedaProductos(texto: string, item: Producto){
    texto = texto.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().includes(texto) || item.identificador.toString().toLocaleLowerCase().includes(texto);
  }
  guardarDatos() {
    this.solicitudActual.identificadorProducto = this.producto.identificador;
    this.solicitudActual.gravado = this.gravadoe;
    //Si se inicia para insertar    
    if (this.inventario == null) {
      this.InventariosService.insertarInventario(this.solicitudActual).subscribe(
        inventario => {
          this.datosInventario.push(inventario["inventario"]);
          this.toasterManagerService.makeToast('success', 'Agregar', 'Inventario agregado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el agregar! ',
            'No se ha agregado el inventario debido a un error con el servidor.');
        },
      );
    }

    //Si se inicia para modificar    
    else {
      this.InventariosService.modificarInventario(this.solicitudActual).subscribe(
        inventario => {
          this.inventario.identificador = inventario["inventario"].identificador;
          this.inventario.identificadorProducto = this.producto.identificador;
          this.inventario.nombre = this.producto.nombre;
          this.inventario.cantidad = inventario["inventario"].cantidad;
          this.inventario.cantidadMaxima = inventario["inventario"].cantidadMaxima;
          this.inventario.cantidadMinima = inventario["inventario"].cantidadMinima;
          this.inventario.gravado = inventario["inventario"].gravado;
          this.inventario.precio = inventario["inventario"].precio;
          this.inventario.impuesto = inventario["inventario"].impuesto;


          this.toasterManagerService.makeToast('success', 'Modificar', 'Inventario modificado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el modificar! ',
            'No se ha modificado el inventario debido a un error con el servidor.');
        },
      );
    }
    this.activeModal.close();
  }
}
