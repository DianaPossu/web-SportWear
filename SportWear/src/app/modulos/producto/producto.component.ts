import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto: any;
  categoria: any;
  proveedor: any;
  id_producto: any;
  obj_producto = {
    codigo: "",
    nombre: "",
    fo_categoria: 0,
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    fo_proveedor: 0
  }
  validar_codigo=true;
  validar_nombre=true;
  validar_categoria=true;
  validar_pcompra=true;
  validar_pventa=true;
  validar_stock=true;
  validar_proveedor=true;
  mform=false;
  botones_form = false;


  constructor(private sproducto:ProductoService, private scate:CategoriaService, private sprov:ProveedorService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_pr();
  }

  consulta(){
    this.sproducto.consultar().subscribe((resultado:any) => {
      this.producto = resultado;
    })
  }

  consulta_c(){
    this.scate.consultar().subscribe((resultado:any) => {
      this.categoria = resultado;
    })
  } 

  consulta_pr(){
    this.sprov.consultar().subscribe((resultado:any) => {
      this.proveedor = resultado;
      console.log(this.proveedor);
    })
  }

  mostrar_form(dato: any){
    switch(dato){
      case "ver":
        this.mform = true;
      break;
      case "no ver":
        this.mform = false;
        this.botones_form = false;
      break;
    }
  }

  limpiar(){
    this.obj_producto = {
      codigo: "",
      nombre: "",
      fo_categoria: 0,
      precio_compra: 0,
      precio_venta: 0,
      stock: 0,
      fo_proveedor:0
    } 
  }

  validar(funcion: any){
    if(this.obj_producto.codigo == ""){
      this.validar_codigo=false;
    }else{
      this.validar_codigo=true;
    }

    if(this.obj_producto.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    
    if(this.obj_producto.fo_categoria == 0){
      this.validar_categoria=false;
    }else{
      this.validar_categoria=true;
    }

    if(this.obj_producto.precio_compra == 0){
      this.validar_pcompra=false;
    }else{
      this.validar_pcompra=true;
    }

    if(this.obj_producto.precio_venta == 0){
      this.validar_pventa=false;
    }else{
      this.validar_pventa=true;
    }

    if(this.obj_producto.stock == 0){
      this.validar_stock=false;
    }else{
      this.validar_stock=true;
    }
    
    if(this.obj_producto.fo_proveedor == 0){
      this.validar_proveedor=false;
    }else{
      this.validar_proveedor=true;
    }

    if(this.validar_codigo==true && this.validar_nombre==true && this.validar_categoria==true && this.validar_pcompra==true && this.
      validar_pventa==true && this.validar_stock==true && this.validar_proveedor==true && funcion == 'guardar'){
      this.guardar();
    }
    
    if(this.validar_codigo==true && this.validar_nombre==true && this.validar_categoria==true && this.validar_pcompra==true && this.
      validar_pventa==true && this.validar_stock==true && this.validar_proveedor==true && funcion == 'editar'){
      this.editar();
    }

  }

  guardar(){
    this.sproducto.insertar(this.obj_producto).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar()
    this.mostrar_form('no ver');
  }

  eliminar(id:number){

    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
      text: "El proceso no podra ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        ////////////////////
        this.sproducto.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        ////////////////////
        Swal.fire({
          title: "¡Producto eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });



  }

  cargar_datos(items: any, id: number){

    this.obj_producto = {
      codigo: items.codigo,
      nombre: items.nombre,
      fo_categoria: items.fo_categoria,
      precio_compra: items.precio_compra,
      precio_venta: items.precio_venta,
      stock: items.stock,
      fo_proveedor: this.proveedor.fo_proveedor,
    }

    this.botones_form = true;
    this.mostrar_form('ver');
  }

  editar(){
    this.sproducto.editar(this.id_producto, this.obj_producto).subscribe((datos:any) => {
      if(datos['resultado']=="OK") {
        this.consulta();

      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

}
