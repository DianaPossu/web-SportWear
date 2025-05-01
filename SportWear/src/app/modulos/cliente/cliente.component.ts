import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente: any[] = [];
  clienteActual: any = { nombre: '', email: '' };
  esEdicion = false;
  modal: any;
  http: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.modal = new bootstrap.Modal(document.getElementById('clienteModal'));
  }

  consultar() {
    return this.http.get('http://localhost/sport%20wear/backend/controlador/cliente.php?control=consulta');
  }  
  
  cargarClientes() {
    this.clienteService.consultar().subscribe((data: any) => {
      console.log('Clientes recibidos:', data);
      this.cliente = data;
    }, error => {
      console.error('Error al cargar clientes:', error);
    });
  }
  
  nuevoCliente() {
    this.clienteActual = { nombre: '', email: '' };
    this.esEdicion = false;
    this.modal.show();
  }

  editarCliente(item: any) {
    this.clienteActual = { ...item };
    this.esEdicion = true;
    this.modal.show();
  }

  guardarCliente() {
    if (this.esEdicion) {
      this.clienteService.editar(this.clienteActual.id_cliente, this.clienteActual).subscribe(() => {
        this.modal.hide();
        this.cargarClientes();
      });
    } else {
      this.clienteService.insertar(this.clienteActual).subscribe(() => {
        this.modal.hide();
        this.cargarClientes();
      });
    }
  }

  eliminarCliente(id: number) {
    if (confirm('¿Deseas eliminar este cliente?')) {
      this.clienteService.eliminar(id).subscribe(() => {
        this.cargarClientes();
      });
    }
  }
  
  cerrarModal() {
    this.modal.hide();
  }
  
}
