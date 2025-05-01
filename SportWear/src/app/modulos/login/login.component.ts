import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: any;
  clave: any;
  error = false;
  usuario: any;
  user= {
    ident: "",
    nombre: "",
    direccion: "",
    celular: "",
    email: "",
    rol: "",
    clave: ""
  }

  constructor(private slogin: LoginService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("rol", "");
  }

  consulta(tecla: any){
    if(tecla == 13 || tecla==""){
      this.slogin.consultar(this.email, this.clave).subscribe((resultado:any)=>{
        this.usuario = resultado;
        console.log(this.usuario);

        if(this.usuario[0].validar=="valida"){
          sessionStorage.setItem("id", this.usuario[0]['id_usuario']);
          sessionStorage.setItem("email", this.usuario[0]['email']);
          sessionStorage.setItem("nombre", this.usuario[0]['nombre']);
          sessionStorage.setItem("rol", this.usuario[0]['rol']);
          this.router.navigate(['dashboard']);
        }else{
          console.log("No entro");
          this.error = true;
        }

      })
    }
  }
  

}
