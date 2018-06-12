import { Injectable } from '@angular/core';
import { Inventario } from './inventario';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  private api: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }


  //Obtiene los datos de los inventarios.
  consultarInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.api.concat('obtenerInventario'), { responseType: 'json' });
  }

  //Inserta un nuevo inventario.
  insertarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.api.concat('insertarInventario'), inventario);
  }

  //Borra un inventario existente.
  borrarInventario($id: number): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarInventario/' + $id))
  }

  //Modificar un inventario existente.
  modificarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(this.api.concat('modificarInventario/' + inventario.id), inventario, { responseType: 'json' })
  }
}
