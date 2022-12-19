import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

// GLOBALES
import { ConfigDatatable } from 'src/app/global/funciones';

// COMPONENTES
import { ModalConfirmDelete } from 'src/app/modules/components/modaldelete/modalconfirmdelete.component';

// SERVICIOS
import { CategoriasService } from 'src/app/modules/service/categorias.service';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: ModalConfirmDelete,
};

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})

export class ListarComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router, 
    private modalService: NgbModal,
    private toastr: ToastrService, 
    private httpCat: CategoriasService
    ) {

  }

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement?: DataTableDirective;

  dataList: any = [];

  ngOnInit() {
    this.dtoptions = ConfigDatatable();
    this.getAllData(this.dtTrigger);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    console.log('ANGEL-ngOnDestroy');
  }



  async getAllData(dtTrigger: any = '') {
    this.httpCat.getAllData().subscribe((data: any) => {
      if (data.ok) {
        this.dataList = data.body;
        if (dtTrigger != '') {
          dtTrigger.next(null);
        }
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            this.dataList = [];
          }
        }
      });
  }


  nuevo() {
    this.router.navigate(['/categorias/agregar']);
  }

  deleteDataConfirmation(data: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deletedata(data);
      },
        (reason) => { });
  }

  deletedata(data: any) {
    this.httpCat.deleteDataById(data.id).subscribe((data: any) => {
      this.toastr.success("Registro eliminado");
      // this.dtTrigger.unsubscribe();
      this.getAllData();

    },
      (error: any) => { });
  }
}
