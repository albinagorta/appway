import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from 'src/app/modules/models/cliente.models';
import { ClienteService } from 'src/app/modules/service/cliente.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addClienteForm: Cliente =  {
    nombres: "",
    apellidos: "",
    email:  "",
    direccion: "",
    celular: "",
  };

  @ViewChild("clienteForm")
  clienteForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, 
              private http: ClienteService, 
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
  }

  AddData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.saveCliente( this.addClienteForm )
        .subscribe(async data => {
          this.toastr.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 500);
        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 500);
        });
    }
  }

}

