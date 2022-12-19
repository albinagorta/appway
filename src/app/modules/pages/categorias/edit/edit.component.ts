import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Categoria } from 'src/app/modules/models/categoria.models';
import { CategoriasService } from 'src/app/modules/service/categorias.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editDataForm: Categoria = new Categoria();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;

  constructor(
            private toastr: ToastrService, 
            private route: ActivatedRoute, 
            private router: Router,
            private http: CategoriasService
            ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.Id = this.route.snapshot.params['id'];
    this.getDataDetailById();
  }

  getDataDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editDataForm.id = resultData.id;
          this.editDataForm.nombre = resultData.nombre;
          this.editDataForm.in_estado = resultData.in_estado;
        }
      }
    },
      (error: any) => { });
  }

  EditData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id,this.editDataForm).subscribe(async data => {
        if (data!=null) {
          this.toastr.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/categorias']);
              }, 500);
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, 500);
        });
    }
  }

}

