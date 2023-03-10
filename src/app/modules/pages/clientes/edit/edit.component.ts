import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente.models';
import { ClienteService } from '../../../service/cliente.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editClienteForm: Cliente = new Cliente();

  @ViewChild("clienteForm")
  clienteForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;

  constructor(
            private toastr: ToastrService, 
            private route: ActivatedRoute, 
            private router: Router,
            private http: ClienteService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.getClienteDetailById();
  }

  getClienteDetailById() {
    this.http.getClienteDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editClienteForm.id = resultData.id;
          this.editClienteForm.nombres = resultData.nombres;
          this.editClienteForm.apellidos = resultData.apellidos;
          this.editClienteForm.email = resultData.email;
          this.editClienteForm.direccion = resultData.direccion;
          this.editClienteForm.celular = resultData.celular;
        }
      }
    },
      (error: any) => { });
  }

  EditData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateCliente(this.Id,this.editClienteForm).subscribe(async data => {
        if (data!=null) {
          this.toastr.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/clientes']);
              }, 500);
        }
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

