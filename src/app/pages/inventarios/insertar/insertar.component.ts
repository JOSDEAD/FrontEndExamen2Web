import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventario } from '../inventario'
import { InventariosService } from '../inventarios.service';

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

  @Input() inventario: Inventario;
  @Input() datosInventario;

  private Inventarios;
  private titulo;
  private solicitudActual;

  config = configToasterManager;

  constructor(public activeModal: NgbActiveModal, private InventariosService: InventariosService,
    private toasterManagerService: ToasterManagerService) { }

  ngOnInit() {
    this.solicitudActual = new Inventario();
    this.InventariosService.consultarInventarios()
      .subscribe(res => this.Inventarios = res);
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

  guardarDatos() {
    //Si se inicia para insertar    
    if (this.inventario == null) {
      this.InventariosService.insertarInventario(this.solicitudActual).subscribe(
        inventario => {
          this.datosInventario.push(inventario["inventario"])
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
          this.inventario.identificadorProducto = inventario["inventario"].identificadorProducto;
          this.inventario.nombre = inventario["inventario"].nombre;
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
