import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(productos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return productos;
    return productos.filter(function (productos) {
      if (adicional === 'Identificador'.toString()) {
        return productos.identificador.toString().includes(buscar);
      }
      else if (adicional === 'Nombre'.toString()) {
        return productos.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Impuesto'.toString()) {
        return productos.impuesto.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return productos;
      }
    })
  }

}
