import { Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ng-modal-confirm',
  templateUrl:'./modalconfirmdelete.component.html',
})

export class ModalConfirmDelete {
  constructor(public modal: NgbActiveModal) { }
}
