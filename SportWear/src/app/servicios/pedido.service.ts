import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = 'http://localhost/sport%20wear/backend/controlador/pedido.php';

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  consultarp(id:number){
    return this.http.get(`${this.url}?control=productos&id=${id}`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }

  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  /*editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }*/

  editar(id: number, datos: any) {
    return this.http.post(`http://localhost/api/controladorpedido.php?control=editar&id=${id}`, datos);
  }

  productos(id: number) {
    return this.http.get(`http://localhost/api/controladorpedido.php?control=productos&id=${id}`);
  }

  obtenerPorId(id: number) {
    return this.http.get(`${this.url}?control=obtener&id=${id}`);
  }
  
  
  

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`);
  }
}
