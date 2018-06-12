import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Inventario } from './inventario';
import { InventariosService } from './inventarios.service'

@Directive({
  selector: '[ngx-verificarC][formControlName],[verificarC][formControl],[verificarC][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VerificarIdentificadorDirective, multi: true }],
})
export class VerificarIdentificadorDirective implements Validator {
  Inventario: Inventario[];
  constructor(private inventariosService: InventariosService) {
    this.Inventario = new Array<Inventario>();
    this.inventariosService.consultarInventarios()
      .subscribe(datosInventario => this.Inventario = datosInventario["inventarios"]);
  }

  // función personalizada que valida que el valor ingresado
  validate(control: FormControl): { [key: string]: any; } {
    let u: string;
    u = control.value;
    let p: boolean;
    if (u !== null && u !== undefined) {
      this.Inventario.forEach(pro => {
        if (pro.identificador === u) {
          p = true;
        }
      });
    }
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null 
    return (p === true) ? { 'verificarC': true } : null;
  }

} 