import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(cliente: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return cliente;
    return cliente.filter(function (clientes) {
      if (adicional === 'Cedula'.toString()) {
        return clientes.cedula.toString().includes(buscar);
      }
      else if (adicional === 'Nombre'.toString()) {
        return clientes.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return clientes;
      }
    })
  }
}
