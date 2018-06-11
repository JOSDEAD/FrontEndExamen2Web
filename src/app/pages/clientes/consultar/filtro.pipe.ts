import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(funcionarios: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return funcionarios;
    return funcionarios.filter(function (funcionarios) {
      if (adicional === 'Cedula'.toString()) {
        return funcionarios.cedula.toString().includes(buscar);
      }
      else if (adicional === 'Nombre'.toString()) {
        return funcionarios.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return funcionarios;
      }
    })
  }
}
