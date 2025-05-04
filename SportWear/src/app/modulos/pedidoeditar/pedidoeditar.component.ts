import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { FetchBackend } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pedidoeditar',
  templateUrl: './pedidoeditar.component.html',
  styleUrls: ['./pedidoeditar.component.scss']
})
export class PedidoeditarComponent {

  productos: any;
  cliente: any;
  ident_cliente = "";
  nombre_cliente = "";
  matriz_producto: any = [];
  arreglo_productos: any = [];
  total: any;
  modoEdicion = false;
  pedido = {
    id_venta:0,
    fecha: "",
    fo_cliente: 0,
    productos: [],
    subtotal: 0,
    total: 0,
    fo_vendedor: 0,
  }
  

  constructor(private router:Router,private route: ActivatedRoute, private sproductos: ProductoService, private scliente: ClienteService, private spedido:
  PedidoService){}

  consulta_productos(){
    this.sproductos.consultar().subscribe((result:any)=>{
      this.productos = result;
    })
  }

  ngOnInit(): void {
    this.consulta_productos();
  
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID recibido:', id);
      if (id) {
        this.modoEdicion = true;
        this.cargarPedido(id);
        this.cargarPedidoCompleto(id);
      }
    });
  }  

  consulta_cliente(){
    this.scliente.ccliente(this.ident_cliente).subscribe((result:any)=>{
      this.cliente=result;
      this.nombre_cliente = this.cliente[0].nombre;
      console.log(this.cliente);
    })
  }

  seleccionar(valores:any, id:number){
    let cantidad = Number(prompt("Ingrese la cantidad a llevar"));
    this.arreglo_productos = [valores.codigo, valores.nombre, Number(valores.precio_venta), cantidad, cantidad * Number 
    (valores.precio_venta)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total = this.total + this.matriz_producto[i][4];
    }
     console.log(this.matriz_producto);

  }

  cargarPedido(id: number) {
    this.spedido.productos(id).subscribe((data: any) => {
      this.matriz_producto = data;
      this.total = this.matriz_producto.reduce((acc: number, item: any[]) => acc + item[4], 0);
    });
  }
  
cargarPedidoCompleto(id: number) {
  this.spedido.obtenerPorId(id).subscribe((pedidoData: any) => {
    this.pedido = {
      id_venta: pedidoData.id_venta,
      fecha: pedidoData.fecha,
      fo_cliente: pedidoData.fo_cliente,
      productos: JSON.parse(pedidoData.productos),
      subtotal: pedidoData.subtotal,
      total: pedidoData.total,
      fo_vendedor: pedidoData.fo_vendedor
    };

    this.matriz_producto = this.pedido.productos;
    this.total = this.pedido.total;
  });
}


guardar() {
  if (!this.cliente || this.cliente.length === 0) {
    alert("Debe buscar un cliente válido antes de guardar.");
    return;
  }

  let fecha = new Date();
  this.pedido.fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
  this.pedido.fo_cliente = Number(this.cliente[0].id_cliente);
  this.pedido.productos = this.matriz_producto;
  this.pedido.subtotal = this.total;
  this.pedido.total = this.total;
  this.pedido.fo_vendedor = Number(sessionStorage.getItem('id'));

  const id = this.route.snapshot.params['id'];

  this.spedido.editar(id, this.pedido).subscribe((datos: any) => {
    if (datos['resultado'] == 'OK') {
      alert("Pedido actualizado correctamente.");
      this.router.navigate(['pedido']);
    } else {
      alert("Error al actualizar el pedido.");
    }
  });
}
}
