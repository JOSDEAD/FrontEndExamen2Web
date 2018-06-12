import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(inventarios: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return inventarios;
    return inventarios.filter(function (inventarios) {
      if (adicional === 'Identificador'.toString()) {
        return inventarios.identificador.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Id.Producto'.toString()) {
        return inventarios.identificadorProducto.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Nom.Producto'.toString()) {
        return inventarios.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return inventarios;
      }
    })
  }

}