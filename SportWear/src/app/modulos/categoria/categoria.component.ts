import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  categoria: any;

  constructor(private scate:CategoriaService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.scate.consultar().subscribe((resultado:any) => {
      this.categoria = resultado;
    })
  }

}
