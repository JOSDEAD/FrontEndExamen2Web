import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(facturacion: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return facturacion;
    return facturacion.filter(function (facturacion) {
      if (adicional === 'Identificador'.toString()) {
        return facturacion.id.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Cedula'.toString()) {
        return facturacion.cedula.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return facturacion;
      }
    })
  }

}
