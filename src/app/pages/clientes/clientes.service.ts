import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientesService {


  private api: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }


  //Obtiene los datos de los clientes.
  consultarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api.concat('obtenerClientes'), { responseType: 'json' });
  }

  //Inserta un nuevo cliente.
  insertarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api.concat('insertarCliente'), cliente);
  }

  //Borra un cliente existente.
  borrarCliente($id: number): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarCliente/' + $id))
  }

  //Modificar un cliente existente.
  modificarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.api.concat('modificarCliente/' + cliente.id), cliente, { responseType: 'json' })
  }




}
