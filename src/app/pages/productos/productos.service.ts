import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private api: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }


  //Obtiene los datos de los producto.
  consultarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.api.concat('obtenerProductos'), { responseType: 'json' });
  }

  //Inserta un nuevo producto.
  insertarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.api.concat('insertarProducto'), producto);
  }

  //Borra un producto existente.
  borrarProducto($id: string): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarProducto/' + $id))
  }

  //Modificar un producto existente.
  modificarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.api.concat('modificarProducto/' + producto.id), producto, { responseType: 'json' })
  }

}
