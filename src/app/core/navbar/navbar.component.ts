import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/modules/service/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private http:UsuariosService) {
    
   }

  ngOnInit(): void {
  }

  logout(){
    this.http.logout();
  }

}
