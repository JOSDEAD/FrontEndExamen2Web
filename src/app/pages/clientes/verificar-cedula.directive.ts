import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service'

@Directive({
  selector: '[ngx-verificarC][formControlName],[verificarC][formControl],[verificarC][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VerificarCedulaDirective, multi: true }],
})
export class VerificarCedulaDirective implements Validator {
  Cliente: Cliente[];
  constructor(private clientesService: ClientesService) {
    this.Cliente = new Array<Cliente>();
    this.clientesService.consultarClientes()
      .subscribe(datosCliente => this.Cliente = datosCliente["clientes"]);
  }

  // función personalizada que valida que el valor ingresado
  validate(control: FormControl): { [key: string]: any; } {
    let u: string;
    u = control.value;
    let p: boolean;
    if (u !== null && u !== undefined) {
      u = u.toString().replace(' ', '')
      this.Cliente.forEach(cli => {
        if (cli.cedula === u) {
          p = true;
        }
      });
    }
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null 
    return (p === true) ? { 'verificarC': true } : null;
  }

} 