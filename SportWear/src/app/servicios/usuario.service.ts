import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost/sport%20wear/backend/controlador/usuario.php';

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }

  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`);
  }

  /*ccliente(dato:any){
    return this.http.get(`${this.url}?control=ccliente&dato=${dato}`);
  }*/

}
