import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario: any[] = [];
  usuarioActual: any = { nombre: '', email: '' };
  esEdicion = false;
  modal: any;


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
  }
  
  cargarUsuarios() {
    this.usuarioService.consultar().subscribe((data: any) => {
      console.log('usuarios recibidos:', data); 
      this.usuario = data;
    }, (error: any) => {
      console.error('Error al cargar usuarios:', error);
    });
  }
  
  nuevoUsuario() {
    this.usuarioActual = { nombre: '', email: '' };
    this.esEdicion = false;
    this.modal.show();
  }

  editarUsuario(item: any) {
    this.usuarioActual = { ...item };
    this.esEdicion = true;
    this.modal.show();
  }

  guardarUsuario() {
    if (this.esEdicion) {
      this.usuarioService.editar(this.usuarioActual.id_usuario, this.usuarioActual).subscribe(() => {
        this.modal.hide();
        this.cargarUsuarios();
      });
    } else {
      this.usuarioService.insertar(this.usuarioActual).subscribe(() => {
        this.modal.hide();
        this.cargarUsuarios();
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.usuarioService.eliminar(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }
  
  cerrarModal() {
    this.modal.hide();
  }
  
}
