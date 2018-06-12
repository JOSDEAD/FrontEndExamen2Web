import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Facturacion } from '../facturacion'
import { FacturacionService } from '../facturacion.service';

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

  @Input() facturacion: Facturacion;
  @Input() datosFacturacion;

  private Facturas;
  private titulo;
  private solicitudActual;

  config = configToasterManager;

  desabilitar: boolean;

  constructor(public activeModal: NgbActiveModal, private FacturacionService: FacturacionService,
    private toasterManagerService: ToasterManagerService) { }


  ngOnInit() {
    this.solicitudActual = new Facturacion();
    this.FacturacionService.consultarFacturas()
      .subscribe(res => this.Facturas = res);
    //Si se inicia para insertar    
    if (this.facturacion == null) {
      this.solicitudActual = new Facturacion();
      this.solicitudActual.productos = [{}];
      this.titulo = 'Insertar Factura';


    }
    //Si se inicia para ver los datos:
    else {
      this.desabilitar = true;
      this.titulo = 'Ver Factura';
      //Object.assign(this.solicitudActual, this.facturacion);
      this.solicitudActual = JSON.parse(JSON.stringify(this.facturacion));
    }

  }

  guardarDatos() {
    //Si se inicia para insertar    

    this.FacturacionService.insertarFactura(this.solicitudActual).subscribe(
      factura => {
        this.datosFacturacion.push(factura["facturas"])
        this.toasterManagerService.makeToast('success', 'Agregar', 'Factura agregada.');
      },
      error => {
        this.toasterManagerService.makeToast('error', '¡No se completo el agregar! ',
          'No se ha agregado la factura debido a un error con el servidor.');
      },
    );


    this.activeModal.close();
  }


  add() {
    this.solicitudActual.productos.push({});
  }

  delete() {
    this.solicitudActual.productos.pop();
  }

}
