import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../cliente'
import { ClientesService } from '../clientes.service';

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

  @Input() cliente: Cliente;
  @Input() datosCliente;

  private Clientes;
  private titulo;
  private solicitudActual;

  config = configToasterManager;

  constructor(public activeModal: NgbActiveModal, private ClientesService: ClientesService,
    private toasterManagerService: ToasterManagerService) { }

  ngOnInit() {
    this.solicitudActual = new Cliente();
    this.ClientesService.consultarClientes()
      .subscribe(res => this.Clientes = res);
    //Si se inicia para insertar    
    if (this.cliente == null) {
      this.solicitudActual = new Cliente();
      this.titulo = 'Insertar Cliente';
    }
    //Si se inicia para modificar o para ver los datos:
    else {
      this.titulo = 'Modificar Cliente';
      Object.assign(this.solicitudActual, this.cliente);
      //this.solicitudActual = JSON.parse(JSON.stringify(this.cliente));
    }

  }

  guardarDatos() {
    //Si se inicia para insertar    
    if (this.cliente == null) {
      this.ClientesService.insertarCliente(this.solicitudActual).subscribe(
        cliente => {
          this.datosCliente.push(cliente["cliente"])
          this.toasterManagerService.makeToast('success', 'Agregar', 'Cliente agregado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el agregar! ',
            'No se ha agregado el cliente debido a un error con el servidor.');
        },
      );
    }

    //Si se inicia para modificar    
    else {
      this.ClientesService.modificarCliente(this.solicitudActual).subscribe(
        cliente => {
          this.cliente.cedula = cliente["cliente"].cedula;
          this.cliente.nombreCompleto = cliente["cliente"].nombreCompleto;
          this.toasterManagerService.makeToast('success', 'Modificar', 'Cliente modificado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el modificar! ',
            'No se ha modificado el cliente debido a un error con el servidor.');
        },
      );
    }
    this.activeModal.close();
  }
}
