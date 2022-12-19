import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from 'src/app/modules/service/cliente.service';
import { WebApiService } from 'src/app/modules/service/webapi.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  
  clienteId: any;
  clienteDetail : any= [];
  
  constructor(
    public webApiService: WebApiService, 
    private route: ActivatedRoute, 
    private http : ClienteService
    ) { }
  
  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['id'];      
    this.getDetailById();
  }

  getDetailById() {       
    this.http.getClienteDetailById(this.clienteId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.clienteDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}
