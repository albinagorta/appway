import { Component, OnInit , Type} from '@angular/core';
import { Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

// COMPONENTES
import { ModalConfirmDelete } from 'src/app/modules/components/modaldelete/modalconfirmdelete.component';

// SERVICIOS
import { CategoriasService } from 'src/app/modules/service/categorias.service';
import { ProductosService } from 'src/app/modules/service/productos.service';


const MODALS: { [name: string]: Type<any> } = {
  deleteModal: ModalConfirmDelete,
};

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})

export class ListarComponent implements OnInit {
  closeResult = '';
  dataList: any = [];
  constructor(
    private router: Router, 
    private modalService: NgbModal,
    private toastr: ToastrService, 
    private http : ProductosService,
    private httpCat : CategoriasService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    this.http.getAllData().subscribe((data : any) => {
      console.log(data)
      if(data.ok){
        for (let i = 0; i < data.body.length; i++) {
          this.httpCat.getDataDetailById(data.body[i].id_categoria).subscribe(data2 => { 
            data.body[i].categoria = data2.body
          });
        }
        
        this.dataList = data.body;
      }
    },
    (error : any)=> {
      console.log(error)
        if (error) {
          if (error.status == 404) {
            this.dataList = [];
          }
        }
      });
  }

  nuevo() {
    this.router.navigate(['/productos/agregar']);
  }

  deleteDataConfirmation(data: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deletedata(data);
      },
        (reason) => {});
  }

  deletedata(data: any) {
    this.http.deleteDataById(data.id).subscribe((data : any) => {
          this.toastr.success("Registro eliminado");
          this.getAllData();
    },
    (error : any) => {});
  }


}