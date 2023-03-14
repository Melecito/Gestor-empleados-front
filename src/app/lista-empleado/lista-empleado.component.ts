//import  swal  from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';







@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styleUrls: ['./lista-empleado.component.css']
})
export class ListaEmpleadoComponent implements OnInit{

  empleados:Empleado[];
  


  constructor(private empleadoServicio:EmpleadoService,private router:Router) { }

  ngOnInit():void {
    this.obtenerEmpleados();
    
  }  

  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }  

  private obtenerEmpleados(){
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato =>{
      this.empleados = dato;
    });
  }

  // eliminarEmpleado(id:number){
  //   this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
  //     console.log(dato);
  //     this.obtenerEmpleados();
  //   });
  // }

  verDetallesDelEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);
  }

  eliminarEmpleado(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al empleado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
              console.log(dato);
              this.obtenerEmpleados();
        Swal.fire(
          'Empleado eliminado',
          'El empleado ha sido eliminado con exito',
          'success'
        )
      })
      }
    })
  }
}
