import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modules/models/usuario.models';
import { UsuariosService } from 'src/app/modules/service/usuarios.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addUsuarioForm: Usuario =  new Usuario();

  @ViewChild("usuarioForm")
  usuarioForm!: NgForm;

  isSubmitted: boolean = false;
  validain_estado:boolean = false;

  constructor(private router: Router, 
              private http: UsuariosService, 
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
  }

  AddData(isValid: any) {
    this.isSubmitted = true;
    if (isValid && this.validain_estado) {
      this.http.saveData( this.addUsuarioForm )
        .subscribe(async data => {
          this.toastr.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 500);
        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 500);
        });
    }
  }

  validarInStado(){
    this.validain_estado = true;
  }

}

