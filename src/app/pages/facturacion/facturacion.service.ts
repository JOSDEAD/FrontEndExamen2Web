import { Injectable } from '@angular/core';
import { Facturacion } from './facturacion';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  private api: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }

  //Obtiene los datos de los facturas.
  consultarFacturas(): Observable<Facturacion[]> {
    return this.http.get<Facturacion[]>(this.api.concat('obtenerFacturas'), { responseType: 'json' });
  }

  //Inserta una nueva factura.
  insertarFactura(facturacion: Facturacion): Observable<Facturacion> {
    return this.http.post<Facturacion>(this.api.concat('insertarFactura'), facturacion);
  }

  //Borra una factura existente.
  borrarFactura($id: number): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarFactura/' + $id))
  }

}
