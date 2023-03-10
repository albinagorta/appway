import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formlogin } from 'src/app/modules/interfaces/formlogin.interface';
import { UsuariosService } from 'src/app/modules/service/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addDataForm: formlogin =  {
    email: localStorage.getItem('email')||'',
    password: localStorage.getItem('password')||'',
    remember:false,
  };

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  
  constructor(private router: Router,
               private http: UsuariosService,
               private toastr: ToastrService) {
                  
                }

  ngOnInit(): void {
  }

  login(isValid: any) {
    
    this.isSubmitted = true;
    if (isValid) {     
      this.http.login()
        .subscribe(async data => {

          if ( this.dataForm.value.remember ){ 
            localStorage.setItem('email', this.dataForm.value.email);
            localStorage.setItem('password', this.dataForm.value.password);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }
          const user = data.body.find((a:any)=>{
            return a.email === this.dataForm.value.email && a.password === this.dataForm.value.password && a.in_estado === '1'
          });
          if(user){
            this.toastr.success('has iniciado sesión con éxito');
            this.dataForm.reset();
            localStorage.setItem('token',JSON.stringify(user));
            this.router.navigate(['/']);
          }else{
            this.toastr.error('Credenciales incorrectas');
            this.dataForm.reset();
            this.router.navigate(['login']);
          }
        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
        });
    }

  }

  
}


