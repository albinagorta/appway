import { Component, OnInit , Type} from '@angular/core';
import { Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

// COMPONENTES
import { ModalConfirmDelete } from 'src/app/modules/components/modaldelete/modalconfirmdelete.component';

// SERVICIOS
import { ClienteService } from 'src/app/modules/service/cliente.service';

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
  clienteList: any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private http : ClienteService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    this.http.getClientes().subscribe((data : any) => {
      console.log(data);
      if(data.ok){
      this.clienteList = data.body;
      }
      
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            this.clienteList = [];
          }
        }
      });
  }

  nuevo() {
    this.router.navigate(['/clientes/agregar']);
  }

  deleteDataConfirmation(data: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteData(data);
      },
        (reason) => {});
  }

  deleteData(data: any) {
    this.http.deleteClienteById(data.id).subscribe((data : any) => {
          this.toastr.success("Registro eliminado");
          this.getAllData();
    },
    (error : any) => {
      this.toastr.error(error.message);
    });
  }


}